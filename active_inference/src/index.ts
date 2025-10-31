/**
 * Active Inference - CatColab Integration
 * 
 * Main export file providing access to all CatColab-based
 * active inference functionality.
 */

export { ActiveInferenceClient } from "./catcolab_client";
export { ModelBuilder } from "./model_builder";
export { DiagramBuilder } from "./diagram_builder";
export {
    createActiveInferenceModel,
    createActiveInferenceDiagram,
    activeInferenceWorkflow,
} from "./active_inference_example";

// Export utilities
export * from "./utils";

// Re-export CatColab types for convenience
export type { Api } from "../packages/frontend/src/api";
export type { Document, Uuid, Link, StableRef } from "catlog-wasm";
export type { LiveDoc } from "../packages/frontend/src/api/document";

