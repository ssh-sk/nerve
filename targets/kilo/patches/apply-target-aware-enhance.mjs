#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildNerveEnhancePrompt } from "./enhance-renderer.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

// MECHANISM: the machine-local Kilo runtime root is never committed. It comes
// from the NERVE_KILO_ROOT environment variable or from local/env.sh (see
// local/env.example.sh); `~` and $HOME are expanded so the env file stays portable.
function readLocalEnv(root) {
  const envPath = path.join(root, "local", "env.sh");
  if (!fs.existsSync(envPath)) return {};
  const out = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    const value = m[2].trim().replace(/^["']|["']$/g, "")
      .replace(/^~(?=\/|$)/, os.homedir())
      .replace(/\$HOME/g, os.homedir());
    if (value) out[m[1]] = value;
  }
  return out;
}

const defaultRoot = process.env.NERVE_KILO_ROOT || readLocalEnv(repoRoot).NERVE_KILO_ROOT;
const apply = process.argv.includes("--apply");

// COMPATIBILITY: exact minified anchors per Kilo release. Add a release only after
// confirming each anchor occurs once and the selection accessors (t, g, f) are in scope.
export const versions = {
  "7.6.2": {
    webviewBefore: 'p.postMessage({type:"enhancePrompt",text:Je,requestId:`enhance-${M()}-${Fe}`})',
    webviewAfter: '(()=>{let jt=t.selected(g());p.postMessage({type:"enhancePrompt",text:Je,requestId:`enhance-${M()}-${Fe}`,targetProviderID:jt?.providerID,targetModelID:jt?.modelID,targetAgent:f()})})()',
    extensionBefore: 'sdkClient.enhancePrompt.enhance({text:message5.text},{throwOnError:!0})',
    extensionAfter: 'sdkClient.enhancePrompt.enhance({text:buildNerveEnhancePrompt(message5.text,message5.targetProviderID,message5.targetModelID,message5.targetAgent)},{throwOnError:!0})'
  },
  "7.7.9": {
    webviewBefore: 'p.postMessage({type:"enhancePrompt",text:$e,requestId:`enhance-${T()}-${Oe}`})',
    webviewAfter: '(()=>{let jt=t.selected(g());p.postMessage({type:"enhancePrompt",text:$e,requestId:`enhance-${T()}-${Oe}`,targetProviderID:jt?.providerID,targetModelID:jt?.modelID,targetAgent:f()})})()',
    extensionBefore: 'sdkClient.enhancePrompt.enhance({text:message6.text},{throwOnError:!0})',
    extensionAfter: 'sdkClient.enhancePrompt.enhance({text:buildNerveEnhancePrompt(message6.text,message6.targetProviderID,message6.targetModelID,message6.targetAgent)},{throwOnError:!0})'
  }
};

export const functionAnchor = "function normalizeEnhancePromptErrorMessage(raw2)";
const declaration = "function buildNerveEnhancePrompt(";
export const currentRenderer = buildNerveEnhancePrompt.toString();

const count = (content, value) => content.split(value).length - 1;

function replaceExactlyOnce(content, before, after, label) {
  if (count(content, before) !== 1) throw new Error(`${label}: expected one anchor, found ${count(content, before)}; no files changed.`);
  return content.replace(before, after);
}

// MECHANISM: the renderer is always inserted immediately before functionAnchor, so an
// installed renderer (current or any earlier NERVE version) is the exact span between them.
function installedRenderer(extension) {
  if (count(extension, declaration) !== 1 || count(extension, functionAnchor) !== 1) return null;
  const start = extension.indexOf(declaration);
  const end = extension.indexOf(functionAnchor);
  return start < end ? extension.slice(start, end) : null;
}

export function inspectBundles(webview, extension, version) {
  const a = versions[version];
  const none = { version, compatible: false, patched: false, upgradeable: false };
  if (!a || count(extension, functionAnchor) !== 1) return none;
  const original = count(webview, a.webviewBefore) === 1 && count(webview, a.webviewAfter) === 0
    && count(extension, a.extensionBefore) === 1 && count(extension, a.extensionAfter) === 0
    && count(extension, declaration) === 0;
  const requestPatched = count(webview, a.webviewBefore) === 0 && count(webview, a.webviewAfter) === 1
    && count(extension, a.extensionBefore) === 0 && count(extension, a.extensionAfter) === 1;
  const renderer = requestPatched ? installedRenderer(extension) : null;
  const patched = renderer === currentRenderer;
  const upgradeable = renderer !== null && !patched;
  return { version, compatible: original || upgradeable, patched, upgradeable };
}

export function patchBundles(webview, extension, version) {
  const a = versions[version];
  const state = inspectBundles(webview, extension, version);
  if (state.patched) return { webview, extension };
  if (!state.compatible) throw new Error(`Unrecognized Kilo ${version} bundles; no files changed.`);
  if (state.upgradeable) return {
    webview,
    extension: replaceExactlyOnce(extension, installedRenderer(extension), currentRenderer, "renderer upgrade")
  };
  return {
    webview: replaceExactlyOnce(webview, a.webviewBefore, a.webviewAfter, "webview request"),
    extension: replaceExactlyOnce(
      replaceExactlyOnce(extension, a.extensionBefore, a.extensionAfter, "extension request"),
      functionAnchor, currentRenderer + functionAnchor, "renderer insertion")
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if (!defaultRoot) {
    console.error("No Kilo runtime root: set NERVE_KILO_ROOT or add it to local/env.sh (see local/env.example.sh).");
    process.exit(1);
  }
  const root = defaultRoot;
  const version = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version;
  const webviewPath = path.join(root, "dist", "webview.js");
  const extensionPath = path.join(root, "dist", "extension.js");
  const webview = fs.readFileSync(webviewPath, "utf8");
  const extension = fs.readFileSync(extensionPath, "utf8");
  const state = inspectBundles(webview, extension, version);
  if (!apply) {
    console.log(JSON.stringify({ mode: "check", root, ...state }, null, 2));
    process.exitCode = state.compatible || state.patched ? 0 : 1;
  } else {
    // FAILURE: both buffers are validated before any write; an I/O failure still needs the external backups.
    const next = patchBundles(webview, extension, version);
    if (next.webview !== webview) fs.writeFileSync(webviewPath, next.webview);
    if (next.extension !== extension) fs.writeFileSync(extensionPath, next.extension);
    console.log(state.patched ? `NERVE Enhance patch already applied to Kilo ${version}.` : `Applied NERVE Enhance patch to Kilo ${version}.`);
  }
}
