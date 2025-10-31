# Active Inference - CatColab Integration

A comprehensive implementation for building active inference models using real CatColab APIs and methods.

## Overview

This project provides tools and utilities for creating active inference models in CatColab. All implementations use **real CatColab methods only** - no mocks or fake data.

## Features

- **Real CatColab API Integration**: Uses actual `Api` class from CatColab frontend
- **Model Building**: Programmatically create CatColab models with proper structure
- **Diagram Creation**: Build diagram instances of models
- **Type Safety**: Uses real CatColab types from `catlog-wasm`
- **Document Management**: Full CRUD operations using CatColab's real APIs

## Installation

This project is part of the CatColab monorepo. Ensure you have:

1. CatColab backend running locally (see `packages/backend/README.md`)
2. CatColab frontend dependencies installed (`pnpm install`)
3. TypeScript configured for the workspace

## Usage

### Basic Model Creation

```typescript
import { Api } from "../packages/frontend/src/api";
import { ActiveInferenceClient, ModelBuilder } from "./src";

// Initialize with real CatColab API
const api = new Api({
    serverUrl: "http://localhost:8000",
    repoUrl: "ws://localhost:3000",
    firebaseApp: firebaseApp, // Your Firebase instance
});

const client = new ActiveInferenceClient(api);

// Build a model
const builder = new ModelBuilder("Active Inference Model", "simple-schema");
builder.addObject({
    name: "Agent",
    obType: "Entity",
    description: "An active inference agent",
});

builder.addObject({
    name: "Environment",
    obType: "Entity",
});

builder.addMorphism({
    name: "observes",
    dom: agentId,
    cod: observationId,
    morType: "Hom",
});

// Create in CatColab using real API
const modelId = await builder.create(client);
```

### Getting and Modifying Documents

```typescript
// Get a live document with write access
const liveDoc = await client.getModel(modelId);

// Make changes using real CatColab API
liveDoc.changeDoc((doc) => {
    // Modify document structure
    // Changes propagate via Automerge
});
```

### Creating Diagrams

```typescript
import { DiagramBuilder } from "./src";

const modelRef = client.makeRef(modelId);
const diagramBuilder = new DiagramBuilder("Instance", modelRef);

diagramBuilder.addObjectInstance({
    name: "Robot",
    obType: "Entity",
});

const diagramId = await diagramBuilder.create(client);
```

## CatColab API Methods Used

This project uses the following real CatColab methods:

### Document Operations
- `Api.createDoc()` - Create new documents
- `Api.getLiveDoc()` - Get reactive document handles
- `Api.duplicateDoc()` - Duplicate documents
- `Api.getPermissions()` - Check permissions

### RPC Operations
- `api.rpc.new_ref.mutate()` - Create document references
- `api.rpc.get_doc.query()` - Get document metadata
- `api.rpc.search_ref_stubs.query()` - Search documents
- `api.rpc.get_ref_children_stubs.query()` - Get child documents

### Document Types

All documents use real CatColab `Document` type from `catlog-wasm`:
- `type: "model"` - Model documents
- `type: "diagram"` - Diagram documents
- Proper notebook cell structures with `tag: "formal"` and `tag: "rich_text"`

## Project Structure

```
active_inference/
├── src/
│   ├── catcolab_client.ts      # Wrapper around CatColab Api
│   ├── model_builder.ts         # Model building utilities
│   ├── diagram_builder.ts       # Diagram building utilities
│   ├── active_inference_example.ts  # Example implementations
│   └── index.ts                 # Main exports
├── tests/                       # Test suite
├── docs/                        # Documentation
├── scripts/                     # Utility scripts
├── .cursorrules                 # Development rules
└── README.md                    # This file
```

## Available CatColab Theories

- `simple-schema` - Basic schema theory
- `simple-olog` - Ontology logics
- `primitive-stock-flow` - Stock and flow diagrams
- `signed-category` - Signed categories for causal diagrams

## Testing

Run tests with:

```bash
pnpm test
```

Tests use real CatColab structures. Integration tests require a running CatColab backend.

## Documentation

See `docs/` directory for:
- API reference
- Usage examples
- CatColab integration guide

## Real Data Only

This project **never uses mocks**. All code:
- Uses actual CatColab API methods
- Works with real document structures
- Requires real backend for full functionality
- Uses types from `catlog-wasm` and `catcolab-api`

## References

- CatColab Documentation: https://next.catcolab.org/dev
- CatColab Rust Docs: https://next.catcolab.org/dev/rust
- CatColab API Reference: See `packages/frontend/src/api`

