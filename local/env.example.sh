# Template for local/env.sh (gitignored). Copy to local/env.sh and edit per machine.
# Absolute paths live only here, never in tracked files; installers expand the
# __NERVE_ROOT__ placeholder in tracked configs into these values.

# Absolute path of the canonical NERVE repository on this machine.
export NERVE_ROOT="$HOME/Documents/git-repos/nerve"

# Kilo server extension runtime the Enhance patch operates on
# (for example: ~/.vscode-server/extensions/kilocode.kilo-code-7.8.8-linux-x64).
export NERVE_KILO_ROOT="$HOME/.vscode-server/extensions/kilocode.kilo-code-7.8.8-linux-x64"
