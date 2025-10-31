# Usage Examples

Complete examples using real CatColab APIs.

## Setup

```typescript
import { Api } from "../../packages/frontend/src/api";
import { initializeApp } from "firebase/app";
import { ActiveInferenceClient } from "../src/catcolab_client";

// Initialize Firebase (required for CatColab auth)
const firebaseConfig = {
    // Your Firebase config
};
const firebaseApp = initializeApp(firebaseConfig);

// Create CatColab API instance (real API, no mocks)
const api = new Api({
    serverUrl: "http://localhost:8000",  // CatColab backend
    repoUrl: "ws://localhost:3000",      // Automerge server
    firebaseApp,
});

const client = new ActiveInferenceClient(api);
```

## Creating a Simple Model

```typescript
import { ModelBuilder } from "../src/model_builder";

const builder = new ModelBuilder("Active Inference Agent", "simple-schema");

// Add objects using real CatColab structure
const agentId = builder.addObject({
    name: "Agent",
    obType: "Entity",
    description: "An active inference agent",
});

const envId = builder.addObject({
    name: "Environment",
    obType: "Entity",
});

// Add morphisms using real CatColab structure
builder.addMorphism({
    name: "observes",
    dom: agentId,
    cod: envId,
    morType: "Hom",
});

// Create using real CatColab API
const modelId = await builder.create(client);
console.log("Created model:", modelId);
```

## Getting and Modifying a Model

```typescript
// Get live document (uses real Api.getLiveDoc)
const liveDoc = await client.getModel(modelId);

// Access document data (reactive)
console.log(liveDoc.doc.name);

// Modify using real CatColab change function
liveDoc.changeDoc((doc) => {
    // Changes propagate via Automerge
    doc.name = "Updated Name";
});

// Document automatically syncs to backend and other clients
```

## Creating a Diagram Instance

```typescript
import { DiagramBuilder } from "../src/diagram_builder";

// Get model reference
const modelRef = client.makeRef(modelId);

// Build diagram
const diagramBuilder = new DiagramBuilder("Robot Instance", modelRef);

// Add instances using real CatColab structure
const robotId = diagramBuilder.addObjectInstance({
    name: "Robot",
    obType: "Entity",
});

const workspaceId = diagramBuilder.addObjectInstance({
    name: "Workspace",
    obType: "Entity",
});

diagramBuilder.addMorphismInstance({
    name: "operates_in",
    dom: robotId,
    cod: workspaceId,
    morType: "Hom",
});

// Create using real CatColab API
const diagramId = await diagramBuilder.create(client);
```

## Searching Documents

```typescript
// Search using real CatColab RPC method
const results = await client.searchRefs({
    query: "active inference",
    type: "model",
    page: 1,
    page_size: 10,
});

// Results use real CatColab RefStub type
results.items.forEach((ref) => {
    console.log(ref.name, ref._id);
});
```

## Checking Permissions

```typescript
// Get permissions using real CatColab API
const permissions = await client.getPermissions(modelId);

// Check write access
if (await client.canWrite(modelId)) {
    // User can modify document
    const liveDoc = await client.getModel(modelId);
    liveDoc.changeDoc((doc) => {
        // Make changes
    });
} else {
    console.log("Read-only access");
}
```

## Complete Workflow Example

```typescript
import {
    createActiveInferenceModel,
    createActiveInferenceDiagram,
    activeInferenceWorkflow,
} from "../src/active_inference_example";

// Full workflow using real CatColab methods
const { modelId, diagramId } = await activeInferenceWorkflow(api);

console.log("Created model:", modelId);
console.log("Created diagram:", diagramId);
```

## Error Handling

```typescript
import { PermissionsError } from "../../packages/frontend/src/api/types";

try {
    const doc = await client.getModel(modelId);
} catch (error) {
    if (error instanceof PermissionsError) {
        console.log("Insufficient permissions");
    } else {
        throw error;
    }
}
```

## Real CatColab RPC Methods

Direct access to CatColab backend RPC:

```typescript
// Using real CatColab RPC
const result = await api.rpc.get_doc.query(modelId);

if (result.tag === "Ok") {
    const refDoc = result.content;
    // refDoc is real CatColab RefDoc type
} else {
    console.error("Error:", result.message);
}
```

All examples use **real CatColab APIs** - no mocks or fake data.

