# Active Inference - CatColab Integration Summary

## Project Overview

A comprehensive implementation for building active inference models using **real CatColab APIs only**. All code uses actual CatColab methods - no mocks.

## Structure

```
active_inference/
├── src/                          # Source code using real CatColab APIs
│   ├── catcolab_client.ts        # Wrapper around CatColab Api class
│   ├── model_builder.ts          # Build models with real CatColab structures
│   ├── diagram_builder.ts        # Build diagrams with real CatColab structures
│   ├── active_inference_example.ts # Example implementations
│   └── index.ts                  # Main exports
│
├── tests/                        # Test suite
│   ├── catcolab_client.test.ts   # API client tests
│   ├── model_builder.test.ts     # Model building tests
│   └── diagram_builder.test.ts   # Diagram building tests
│
├── docs/                         # Comprehensive documentation
│   ├── API_REFERENCE.md          # API documentation
│   ├── USAGE_EXAMPLES.md         # Usage examples
│   ├── CATCOLAB_INTEGRATION.md   # Integration guide
│   └── SUMMARY.md                # This file
│
├── scripts/                      # Utility scripts
│   ├── setup.sh                  # Setup script
│   └── create_example_model.ts   # Example script
│
├── .cursorrules                  # Development rules (real APIs only)
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Main documentation
```

## Real CatColab APIs Used

### Frontend API (`packages/frontend/src/api`)

- `Api.createDoc()` - Create documents
- `Api.getLiveDoc()` - Get reactive documents
- `Api.duplicateDoc()` - Duplicate documents
- `Api.getPermissions()` - Check permissions
- `Api.makeUnversionedRef()` - Create references
- `Api.rpc.*` - RPC client methods

### Backend RPC (`packages/backend/src/rpc.rs`)

- `new_ref` - Create document reference
- `get_doc` - Get document
- `search_ref_stubs` - Search documents
- `get_ref_children_stubs` - Get children

### Types (`catlog-wasm`)

- `Document` - Document type
- `Uuid`, `Link`, `StableRef` - Reference types
- Real cell structures for formal and rich text cells

## Key Features

1. **Real API Integration** - All methods use actual CatColab APIs
2. **Type Safety** - Uses real CatColab types
3. **Model Building** - Programmatic model creation
4. **Diagram Creation** - Build diagram instances
5. **Document Management** - Full CRUD operations
6. **No Mocks** - All code works with real CatColab backend

## Quick Start

1. **Setup:**
   ```bash
   cd active_inference
   bash scripts/setup.sh
   ```

2. **Create a Model:**
   ```typescript
   import { Api } from "../packages/frontend/src/api";
   import { ActiveInferenceClient, ModelBuilder } from "./src";
   
   const api = new Api({ serverUrl, repoUrl, firebaseApp });
   const client = new ActiveInferenceClient(api);
   
   const builder = new ModelBuilder("My Model", "simple-schema");
   const modelId = await builder.create(client);
   ```

3. **Run Tests:**
   ```bash
   pnpm test
   ```

4. **Run Example:**
   ```bash
   pnpm example
   ```

## Documentation

- **README.md** - Main documentation and overview
- **docs/API_REFERENCE.md** - Complete API reference
- **docs/USAGE_EXAMPLES.md** - Usage examples
- **docs/CATCOLAB_INTEGRATION.md** - Integration details
- **.cursorrules** - Development guidelines

## CatColab Methods Reference

All methods documented in this project use real CatColab implementations:

| Method | Real CatColab API | Location |
|--------|------------------|----------|
| `createModel()` | `Api.createDoc()` | `packages/frontend/src/api/types.ts` |
| `getModel()` | `Api.getLiveDoc()` | `packages/frontend/src/api/types.ts` |
| `searchRefs()` | `api.rpc.search_ref_stubs.query()` | `packages/backend/src/rpc.rs` |
| `getChildren()` | `api.rpc.get_ref_children_stubs.query()` | `packages/backend/src/rpc.rs` |

## Testing

- Uses real CatColab Document structures
- Unit tests verify structure correctness
- Integration tests require real CatColab backend
- No mocks - all types from real packages

## Philosophy

**Real Data Only**: This project demonstrates that comprehensive functionality can be built using only real CatColab APIs. Every method, type, and structure comes from actual CatColab implementations.

