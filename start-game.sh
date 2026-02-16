#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT_DIR"

echo "Starting Flappy Bird server from: $ROOT_DIR"
echo "URL: http://localhost:${PORT}/index.html"
echo "Press Ctrl+C to stop."

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 is required but not found in PATH." >&2
  exit 1
fi

python3 -m http.server "$PORT"
