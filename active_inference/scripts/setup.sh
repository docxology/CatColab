#!/bin/bash
# Setup script for active_inference project
# Ensures CatColab dependencies are properly configured

set -e

echo "Setting up Active Inference - CatColab Integration"
echo "=================================================="

# Check if we're in the CatColab monorepo
if [ ! -f "pnpm-workspace.yaml" ]; then
    echo "Error: Must run from CatColab monorepo root"
    exit 1
fi

echo ""
echo "1. Installing dependencies..."
pnpm install

echo ""
echo "2. Building CatColab packages..."
cd packages/notebook-types
pnpm run build:node
cd ../..

cd packages/catlog-wasm
pnpm run build:browser
cd ../..

echo ""
echo "3. Checking CatColab backend..."
if [ ! -f "packages/backend/.env" ]; then
    echo "   Warning: Backend .env not found"
    echo "   Create packages/backend/.env from .env.development"
fi

echo ""
echo "4. Setup complete!"
echo ""
echo "Next steps:"
echo "  - Start CatColab backend: cd packages/backend && cargo run"
echo "  - Start Automerge server: cd packages/automerge-doc-server && pnpm run main"
echo "  - Run tests: pnpm test (from active_inference directory)"
echo ""

