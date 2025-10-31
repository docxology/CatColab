/**
 * Active Inference Example Implementation
 * 
 * Demonstrates real usage of CatColab APIs for building
 * active inference models and diagrams.
 */

import type { Api } from "../packages/frontend/src/api";
import { ActiveInferenceClient } from "./catcolab_client";
import { ModelBuilder } from "./model_builder";
import { DiagramBuilder } from "./diagram_builder";
import type { Document, Link, Uuid } from "catlog-wasm";

/**
 * Create an active inference model in CatColab
 * 
 * This creates a real model using CatColab's API methods
 */
export async function createActiveInferenceModel(api: Api): Promise<Uuid> {
    const client = new ActiveInferenceClient(api);

    // Build a simple active inference model using real CatColab structures
    const builder = new ModelBuilder(
        "Active Inference Model",
        "simple-schema" // Using real CatColab theory
    );

    // Add objects using real CatColab cell structure
    const agentId = builder.addObject({
        name: "Agent",
        obType: "Entity",
        description: "An active inference agent that interacts with its environment",
    });

    const environmentId = builder.addObject({
        name: "Environment",
        obType: "Entity",
        description: "The environment that the agent observes and acts upon",
    });

    const observationId = builder.addObject({
        name: "Observation",
        obType: "Entity",
        description: "Observations made by the agent",
    });

    const actionId = builder.addObject({
        name: "Action",
        obType: "Entity",
        description: "Actions taken by the agent",
    });

    // Add morphisms using real CatColab cell structure
    builder.addMorphism({
        name: "observes",
        dom: agentId,
        cod: observationId,
        morType: "Hom",
        description: "Agent observes the environment",
    });

    builder.addMorphism({
        name: "acts_on",
        dom: agentId,
        cod: environmentId,
        morType: "Hom",
        description: "Agent acts on the environment",
    });

    builder.addMorphism({
        name: "generates",
        dom: environmentId,
        cod: observationId,
        morType: "Hom",
        description: "Environment generates observations",
    });

    // Add explanatory text
    builder.addText(
        "This model represents the basic structure of an active inference system."
    );

    // Create the model using real CatColab API
    const refId = await builder.create(client);
    return refId;
}

/**
 * Create a diagram instance of an active inference model
 */
export async function createActiveInferenceDiagram(
    api: Api,
    modelRef: Link
): Promise<Uuid> {
    const client = new ActiveInferenceClient(api);

    const builder = new DiagramBuilder(
        "Active Inference Instance",
        modelRef
    );

    // Add instances using real CatColab diagram structure
    const agentInstId = builder.addObjectInstance({
        name: "Robot",
        obType: "Entity",
    });

    const envInstId = builder.addObjectInstance({
        name: "Workspace",
        obType: "Entity",
    });

    const obsInstId = builder.addObjectInstance({
        name: "Camera Feed",
        obType: "Entity",
    });

    builder.addMorphismInstance({
        name: "sees",
        dom: agentInstId,
        cod: obsInstId,
        morType: "Hom",
    });

    builder.addMorphismInstance({
        name: "moves",
        dom: agentInstId,
        cod: envInstId,
        morType: "Hom",
    });

    // Create the diagram using real CatColab API
    const refId = await builder.create(client);
    return refId;
}

/**
 * Example workflow demonstrating real CatColab usage
 */
export async function activeInferenceWorkflow(api: Api): Promise<{
    modelId: Uuid;
    diagramId: Uuid;
}> {
    // Create model using real API
    const modelId = await createActiveInferenceModel(api);

    // Get the model to create a reference
    const modelDoc = await api.getLiveDoc(modelId, "model");
    const modelRef: Link = {
        _id: modelId,
        _version: null,
        _server: api.serverHost,
    };

    // Create diagram using real API
    const diagramId = await createActiveInferenceDiagram(api, modelRef);

    return { modelId, diagramId };
}

