# Getting Started

Quick start guide for Active Inference with CatColab.

## Prerequisites

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

3. **Dependencies Installed**
   ```bash
   # From CatColab root
   pnpm install
   
   # Build required packages
   cd packages/notebook-types && pnpm run build:node && cd ../..
   cd packages/catlog-wasm && pnpm run build:browser && cd ../..
   ```

## Installation

From the `active_inference` directory:

```bash
# Run setup script
bash scripts/setup.sh

# Or manually
pnpm install
```

## Basic Usage

### 1. Initialize CatColab API

```typescript
import { initializeApp } from "firebase/app";
import { Api } from "../packages/frontend/src/api";
import { ActiveInferenceClient } from "./src";

const firebaseApp = initializeApp({
    // Your Firebase config
});

const api = new Api({
    serverUrl: "http://localhost:8000",
    repoUrl: "ws://localhost:3000",
    firebaseApp,
});

const client = new ActiveInferenceClient(api);
```

### 2. Create a Model

```typescript
import { ModelBuilder } from "./src";

const builder = new ModelBuilder("My Model", "simple-schema");

builder.addObject({
    name: "Agent",
    obType: "Entity",
});

const modelId = await builder.create(client);
```

### 3. Get and Modify a Model

```typescript
const liveDoc = await client.getModel(modelId);

liveDoc.changeDoc((doc) => {
    doc.name = "Updated Name";
    // Changes sync automatically via Automerge
});
```

### 4. Create a Diagram

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

## Running Examples

```bash
# Run example script
pnpm example

# Or with tsx directly
tsx scripts/create_example_model.ts
```

## Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch
```

## Available Theories

CatColab provides several theories you can use:

- `simple-schema` - Basic entity-relationship schemas
- `simple-olog` - Ontology logics
- `primitive-stock-flow` - Stock and flow diagrams
- `signed-category` - Signed categories for causal loops

## Next Steps

- Read [API Reference](./API_REFERENCE.md) for detailed API docs
- Check [Usage Examples](./USAGE_EXAMPLES.md) for more examples
- See [CatColab Integration](./CATCOLAB_INTEGRATION.md) for integration details

## Troubleshooting

### Backend Not Running

If you see connection errors, ensure:
1. Backend is running on `http://localhost:8000`
2. Automerge server is running on `ws://localhost:3000`
3. Database is configured in `packages/backend/.env`

### Import Errors

Ensure all CatColab packages are built:
```bash
cd packages/notebook-types && pnpm run build:node
cd ../catlog-wasm && pnpm run build:browser
```

### Type Errors

This project uses real CatColab types. Ensure:
- TypeScript can resolve `catlog-wasm` types
- TypeScript can resolve `catcolab-api` types
- All imports use correct paths

## Support

- CatColab Documentation: https://next.catcolab.org/dev
- CatColab Zulip: https://catcolab.zulipchat.com

