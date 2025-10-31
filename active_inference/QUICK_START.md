# Quick Start - Active Inference Library

## ✅ Everything is Set Up and Working!

### Test Results
```bash
$ pnpm test
✓ tests/catcolab_client.test.ts (3 tests)
✓ tests/diagram_builder.test.ts (5 tests)
✓ tests/utils.test.ts (6 tests)
✓ tests/model_builder.test.ts (6 tests)

Test Files: 4 passed (4)
Tests: 20 passed (20) ✅
```

## What You Can Do Now

### 1. Run Tests
```bash
cd active_inference
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:ui           # Interactive UI
```

### 2. Use the Library

```typescript
import { ModelBuilder, ActiveInferenceClient } from "./src";

// Build a model
const builder = new ModelBuilder("My Model", "simple-schema");

builder.addObject({
    name: "Agent",
    obType: "Entity",
    description: "An active inference agent"
});

builder.addObject({
    name: "Environment",
    obType: "Entity"
});

// Get the document structure
const doc = builder.create();
```

### 3. View Documentation

- [README.md](./README.md) - Main documentation
- [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Quick start guide
- [docs/API_REFERENCE.md](./docs/API_REFERENCE.md) - API documentation
- [docs/USAGE_EXAMPLES.md](./docs/USAGE_EXAMPLES.md) - Code examples

## Important Notes

### This is a Library, Not a UI

**What this provides:**
- ✅ TypeScript library for building models programmatically
- ✅ API wrapper for CatColab backend
- ✅ Type-safe document builders
- ✅ Utilities for working with CatColab documents

**What this is NOT:**
- ❌ Not a visualization tool
- ❌ Not an interactive UI
- ❌ Not a graphical editor

**For visualization:** Use the main CatColab frontend at `http://localhost:8000`

### Requirements for Full Integration

To connect to CatColab backend and create actual documents:

1. **CatColab Backend Running**
   ```bash
   cd packages/backend
   cargo run
   ```

2. **Automerge Server Running**
   ```bash
   cd packages/automerge-doc-server
   pnpm run main
   ```

3. **Firebase Configuration**
   - Set up Firebase app
   - Configure authentication

## Available Scripts

| Command | What it does |
|---------|--------------|
| `pnpm test` | Run all tests (currently passing ✅) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:ui` | Run tests with Vitest UI |
| `pnpm lint` | Type check code |
| `pnpm example` | Run example script (needs backend) |

## Everything Works! ✅

- ✅ Dependencies installed
- ✅ All tests passing (20/20)
- ✅ Type definitions available
- ✅ Documentation complete
- ✅ Examples ready to run
- ✅ Integration with CatColab backend ready (when backend is running)

## Questions?

See [TESTING_VERIFICATION.md](./TESTING_VERIFICATION.md) for detailed test results and verification.

