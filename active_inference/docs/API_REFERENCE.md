# API Reference

## ActiveInferenceClient

Wrapper around CatColab's `Api` class with active inference specific utilities.

### Methods

#### `createModel(modelInit: Document): Promise<Uuid>`

Creates a new model document using CatColab's real `Api.createDoc()` method.

**Parameters:**
- `modelInit`: CatColab `Document` with `type: "model"`

**Returns:** UUID of the created document

**Example:**
```typescript
const modelId = await client.createModel({
    name: "My Model",
    type: "model",
    version: "1",
    theory: "simple-schema",
    notebook: { cellContents: {}, cellOrder: [] }
});
```

#### `getModel(refId: Uuid): Promise<LiveDoc<Document>>`

Gets a live model document using CatColab's real `Api.getLiveDoc()` method.

**Parameters:**
- `refId`: Document reference UUID

**Returns:** Live document handle with reactive updates

#### `createDiagram(diagramInit: Document): Promise<Uuid>`

Creates a new diagram document using CatColab's real `Api.createDoc()` method.

#### `getDiagram(refId: Uuid): Promise<LiveDoc<Document>>`

Gets a live diagram document using CatColab's real `Api.getLiveDoc()` method.

#### `searchRefs(query): Promise<Paginated<RefStub>>`

Searches for documents using CatColab's real RPC method `search_ref_stubs`.

**Uses:** `api.rpc.search_ref_stubs.query()`

#### `getChildren(refId: Uuid): Promise<RefStub[]>`

Gets child documents using CatColab's real RPC method `get_ref_children_stubs`.

**Uses:** `api.rpc.get_ref_children_stubs.query()`

## ModelBuilder

Builds CatColab model documents programmatically using real structures.

### Methods

#### `addObject(params): string`

Adds an object cell to the model using real CatColab cell structure.

**Creates cells with:**
- `tag: "formal"`
- `content.tag: "object"`
- Proper `obType` structure: `{ tag: "Basic", content: string }`

#### `addMorphism(params): string`

Adds a morphism cell using real CatColab cell structure.

**Creates cells with:**
- `tag: "formal"`
- `content.tag: "morphism"`
- Proper `dom` and `cod` references

#### `build(): Document`

Returns a complete CatColab `Document` ready for `Api.createDoc()`.

## DiagramBuilder

Builds CatColab diagram documents (instances) using real structures.

### Methods

#### `addObjectInstance(params): string`

Adds an object instance using real CatColab diagram cell structure.

#### `addMorphismInstance(params): string`

Adds a morphism instance using real CatColab diagram cell structure.

## Real CatColab Methods Used

All methods in this library use real CatColab APIs:

### From `packages/frontend/src/api`:

- `Api.createDoc()` - Document creation
- `Api.getLiveDoc()` - Get reactive documents
- `Api.duplicateDoc()` - Document duplication
- `Api.getPermissions()` - Permission checking
- `Api.makeUnversionedRef()` - Create stable references

### From `packages/frontend/src/api/rpc.ts`:

- `createRpcClient()` - RPC client creation
- `api.rpc.new_ref.mutate()` - Create ref
- `api.rpc.get_doc.query()` - Get document
- `api.rpc.search_ref_stubs.query()` - Search
- `api.rpc.get_ref_children_stubs.query()` - Get children

### Types from `catlog-wasm`:

- `Document` - Document type
- `Uuid` - UUID type
- `Link` - Document link type
- `StableRef` - Stable reference type

