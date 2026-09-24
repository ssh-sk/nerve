import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { buildNerveEnhancePrompt as render } from "./enhance-renderer.mjs";
import { versions, functionAnchor, currentRenderer, inspectBundles, patchBundles } from "./apply-target-aware-enhance.mjs";

const GROK = /Goal, Context, Scope and exclusions/;
const OPUS = /descriptive XML tags/;
const NEUTRAL = /provider-neutral/;

test("GLM stays the enhancer; Grok 4.7 is the worker route", () => {
  const config = JSON.parse(fs.readFileSync(new URL("../kilo.jsonc", import.meta.url), "utf8"));
  assert.equal(config.small_model, "openrouter/z-ai/glm-5.3-flash");
  assert.equal(config.subagent_model, "xai/grok-4.7");
  assert.equal(config.provider?.xai, undefined, "Model tuning must not auto-connect xAI through provider config");
  assert.equal(config.default_agent, "generic-coder");
});

test("Grok worker modes render for Grok whether detected by model or by mode", () => {
  assert.match(render("task", "xai", "grok-4.7", "grok-worker-xhigh"), GROK);
  assert.match(render("task", null, null, "grok-worker-high"), /Target: Grok 4\.7/);
  const result = render("Keep Foo_Bar unchanged", "xai", "grok-4.7", "generic-coder");
  assert.match(result, /Target: xai\/grok-4\.7/);
  assert.ok(result.endsWith("SOURCE PROMPT\nKeep Foo_Bar unchanged"));
  assert.match(result, /Do not invent requirements, use tools, refer to conversation history/);
});

test("Opus Planner renders for Opus 5.5 even though its pinned model is GLM", () => {
  const result = render("plan it", "openrouter", "z-ai/glm-5.3-flash", "opus-planner");
  assert.match(result, /Target: Claude Opus 5\.5/);
  assert.match(result, OPUS);
  assert.match(result, /<pasted_content>/);
});

test("prefix overrides every selection and is stripped only at the beginning", () => {
  const result = render("model Grok 4.7: Fix model Opus: handling", "openrouter", "z-ai/glm-5.3-flash", "opus-planner");
  assert.match(result, /Target: Grok 4\.7/);
  assert.ok(result.endsWith("SOURCE PROMPT\nFix model Opus: handling"));
  assert.match(render("model Opus 5.5: task", "xai", "grok-4.7", "grok-worker-high"), OPUS);
});

test("Generic Coder follows the selected model and falls back to neutral", () => {
  assert.match(render("task", "google", "gemini-3.8-flash", "generic-coder"), /context first/);
  assert.match(render("task", "anthropic", "claude-opus-5-5", "generic-coder"), OPUS);
  assert.match(render("task", "openrouter", "z-ai/glm-5.3-flash", "generic-coder"), NEUTRAL);
  assert.match(render("task", null, null, "generic-coder"), NEUTRAL);
  assert.match(render(null), /Target: unspecified/);
});

for (const [version, a] of Object.entries(versions)) {
  test(`${version}: install, renderer upgrade and re-run are exact and idempotent`, () => {
    const original = { webview: a.webviewBefore, extension: a.extensionBefore + ";" + functionAnchor + "{}" };
    assert.equal(inspectBundles(original.webview, original.extension, version).compatible, true);
    const patched = patchBundles(original.webview, original.extension, version);
    assert.equal(inspectBundles(patched.webview, patched.extension, version).patched, true);
    assert.deepEqual(patchBundles(patched.webview, patched.extension, version), patched);
    const older = { webview: a.webviewAfter, extension: a.extensionAfter + ";function buildNerveEnhancePrompt(){return 'old'}" + functionAnchor + "{}" };
    assert.equal(inspectBundles(older.webview, older.extension, version).upgradeable, true);
    assert.deepEqual(patchBundles(older.webview, older.extension, version), patched);
  });

  test(`${version}: duplicate, missing, unknown and partial anchors are rejected`, () => {
    const ext = a.extensionBefore + functionAnchor;
    for (const [webview, extension] of [
      [a.webviewBefore.repeat(2), ext],
      [a.webviewBefore, a.extensionBefore],
      [a.webviewAfter, ext],
      [a.webviewBefore, ext + functionAnchor],
      [a.webviewAfter, a.extensionAfter + functionAnchor + "function buildNerveEnhancePrompt(){}"]
    ]) assert.throws(() => patchBundles(webview, extension, version), /no files changed/);
  });
}

test("unknown Kilo versions are never patched", () => {
  const a = versions["7.7.9"];
  assert.throws(() => patchBundles(a.webviewBefore, a.extensionBefore + functionAnchor, "9.9.9"), /no files changed/);
});

test("embedded renderer has no module dependencies", () => {
  const embedded = new Function("return (" + currentRenderer + ")")();
  assert.equal(embedded("task", "xai", "grok-4.7", "opus-planner"), render("task", "xai", "grok-4.7", "opus-planner"));
});
