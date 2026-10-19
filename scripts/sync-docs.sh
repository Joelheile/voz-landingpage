#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
curl -fsSL https://raw.githubusercontent.com/Joelheile/voz/main/EXTENSIONS.md -o content/extensions.md
