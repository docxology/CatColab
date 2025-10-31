# Contributing to Active Inference

## Development Guidelines

### Real APIs Only

This project uses **only real CatColab APIs**. Never use mocks:

- ✅ Use `Api` class from `packages/frontend/src/api`
- ✅ Use real `Document` types from `catlog-wasm`
- ✅ Use real RPC methods from backend
- ❌ No mock implementations
- ❌ No fake data

### Code Style

- Use TypeScript with strict mode
- Follow CatColab's existing code patterns
- Document which CatColab methods are being used
- Use real types from `catlog-wasm` and `catcolab-api`

### Testing

1. **Unit Tests**: Test structure correctness using real CatColab types
2. **Integration Tests**: Require real CatColab backend running
3. **Examples**: Use real API calls - no mocks

Run tests:
```bash
pnpm test
```

### Adding New Features

1. Use real CatColab APIs only
2. Document which CatColab methods are used
3. Add tests using real structures
4. Update documentation

### Import Paths

- CatColab packages: `../packages/[package-name]`
- Types: Import from actual CatColab packages
- No relative paths to `../../packages` - use `../packages` from active_inference root

### CatColab Methods Reference

Document which real CatColab methods you're using:

```typescript
/**
 * Creates a model using CatColab's real Api.createDoc() method
 * 
 * Uses: Api.createDoc() from packages/frontend/src/api/types.ts
 */
```

## Questions?

- See `.cursorrules` for development guidelines
- Check `docs/CATCOLAB_INTEGRATION.md` for integration details
- Reference CatColab docs: https://next.catcolab.org/dev

