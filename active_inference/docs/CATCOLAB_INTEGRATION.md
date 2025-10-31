# CatColab Integration Guide

How this project integrates with real CatColab methods and APIs.

## Architecture

This project is built entirely on top of CatColab's real APIs:

```
Active Inference Library
    ↓
CatColab Frontend API (packages/frontend/src/api)
    ↓
CatColab Backend RPC (packages/backend/src/rpc.rs)
    ↓
CatColab Database & Automerge
```

## Real CatColab Components Used

### 1. Frontend API (`packages/frontend/src/api`)

**Api Class:**
- `createDoc()` - Creates documents in CatColab backend
- `getLiveDoc()` - Gets reactive Automerge document handles
- `duplicateDoc()` - Duplicates existing documents
- `getPermissions()` - Checks document permissions

**Document Management:**
- `LiveDoc` - Reactive document wrapper
- `makeLiveDoc()` - Creates reactive document from handle
- `findAndMigrate()` - Gets and migrates documents

### 2. Backend RPC (`packages/backend/src/rpc.rs`)

**RPC Handlers:**
- `new_ref` - Create document reference
- `get_doc` - Get document metadata
- `search_ref_stubs` - Search documents
- `get_ref_children_stubs` - Get child documents
- `get_permissions` - Get permissions
- `set_permissions` - Set permissions

### 3. Types (`catlog-wasm`)

**Document Types:**
- `Document` - Main document type
- `Uuid` - UUID type
- `Link` - Document link
- `StableRef` - Stable reference

**Cell Types:**
- Formal cells: `{ tag: "formal", content: {...} }`
- Rich text cells: `{ tag: "rich_text", content: {...} }`

### 4. Automerge Integration

Uses real Automerge repo from `@automerge/automerge-repo`:
- `Repo` - Automerge repository
- `DocHandle` - Document handle
- `BrowserWebSocketClientAdapter` - Network sync
- `IndexedDBStorageAdapter` - Local storage

## Document Structure

All documents follow CatColab's real structure:

```typescript
Document {
    name: string;
    type: "model" | "diagram";
    version: "1";
    theory: string;  // e.g., "simple-schema"
    notebook: {
        cellContents: Record<string, Cell>;
        cellOrder: string[];
    };
    model?: Link;  // For diagrams
}
```

## Cell Structure

**Formal Cell (Object):**
```typescript
{
    tag: "formal",
    id: string,
    content: {
        tag: "object",
        id: string,
        name: string,
        obType: { tag: "Basic", content: string }
    }
}
```

**Formal Cell (Morphism):**
```typescript
{
    tag: "formal",
    id: string,
    content: {
        tag: "morphism",
        id: string,
        name: string,
        morType: { tag: "Basic", content: string },
        dom: { tag: "Basic", content: string },
        cod: { tag: "Basic", content: string }
    }
}
```

## Available Theories

From CatColab's stdlib:

- `simple-schema` - Basic entity-relationship schemas
- `simple-olog` - Ontology logics
- `primitive-stock-flow` - Stock and flow diagrams
- `signed-category` - Signed categories for causal loops
- `delayable-signed-category` - With time delays

## Authentication

Uses real Firebase authentication:

```typescript
// Initialize Firebase
const firebaseApp = initializeApp(config);

// Pass to CatColab API
const api = new Api({
    serverUrl: "...",
    repoUrl: "...",
    firebaseApp,  // Required for authenticated requests
});
```

## Real Data Flow

1. **Create Document:**
   ```
   ModelBuilder.build() → Document
   → Api.createDoc()
   → Backend RPC new_ref
   → Database insert
   → Automerge doc creation
   → Return UUID
   ```

2. **Get Document:**
   ```
   Api.getLiveDoc(UUID)
   → Backend RPC get_doc
   → Check permissions
   → Return Automerge doc ID
   → Connect to Automerge repo
   → Return LiveDoc handle
   ```

3. **Modify Document:**
   ```
   LiveDoc.changeDoc(fn)
   → Automerge doc.change()
   → Sync via WebSocket
   → Backend receives changes
   → Broadcast to other clients
   ```

## No Mocking Policy

This project **never uses mocks**:

- ✅ Real CatColab API calls
- ✅ Real document structures
- ✅ Real type definitions
- ✅ Real Automerge sync

For testing:
- Unit tests verify structure correctness
- Integration tests require real backend
- All types come from real CatColab packages

## References

- CatColab API: `packages/frontend/src/api`
- Backend RPC: `packages/backend/src/rpc.rs`
- Type Definitions: `packages/catlog-wasm/src`
- Automerge Docs: https://automerge.org/

