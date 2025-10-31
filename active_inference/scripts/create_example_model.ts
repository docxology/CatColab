/**
 * Example script demonstrating real CatColab usage
 * 
 * Creates an active inference model using real CatColab APIs
 */

import { initializeApp, type FirebaseApp } from "firebase/app";
import { Api } from "../../packages/frontend/src/api";
import { ActiveInferenceClient } from "../src/catcolab_client";
import { ModelBuilder } from "../src/model_builder";
import { DiagramBuilder } from "../src/diagram_builder";

/**
 * Initialize CatColab API with real configuration
 */
function initializeCatColabApi(firebaseApp?: FirebaseApp): Api {
    const serverUrl = process.env.CATCOLAB_SERVER_URL || "http://localhost:8000";
    const repoUrl = process.env.CATCOLAB_REPO_URL || "ws://localhost:3000";

    if (!firebaseApp) {
        throw new Error("Firebase app is required. Initialize Firebase before calling this function.");
    }

    return new Api({
        serverUrl,
        repoUrl,
        firebaseApp,
    });
}

/**
 * Create an example active inference model
 * Uses real CatColab API methods
 */
async function createExampleModel() {
    console.log("Initializing CatColab API...");
    
    // Initialize with real CatColab API
    const api = initializeCatColabApi();
    const client = new ActiveInferenceClient(api);

    console.log("Building active inference model...");

    // Build model using real CatColab structures
    const builder = new ModelBuilder(
        "Active Inference Example",
        "simple-schema"
    );

    // Add objects using real CatColab cell structure
    builder.addText("# Active Inference Model\n\nThis model represents an active inference agent.");

    const agentId = builder.addObject({
        name: "Agent",
        obType: "Entity",
        description: "An active inference agent",
    });

    const environmentId = builder.addObject({
        name: "Environment",
        obType: "Entity",
        description: "The environment the agent interacts with",
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

    console.log("Creating model in CatColab...");
    const modelId = await builder.create(client);

    console.log(`✅ Created model: ${modelId}`);
    console.log(`   View at: http://localhost:8000/model/${modelId}`);

    // Create a diagram instance
    console.log("\nCreating diagram instance...");
    const modelRef = client.makeRef(modelId);
    const diagramBuilder = new DiagramBuilder(
        "Example Instance",
        modelRef
    );

    diagramBuilder.addObjectInstance({
        name: "Robot",
        obType: "Entity",
    });

    diagramBuilder.addObjectInstance({
        name: "Workspace",
        obType: "Entity",
    });

    const diagramId = await diagramBuilder.create(client);
    console.log(`✅ Created diagram: ${diagramId}`);

    return { modelId, diagramId };
}

// Run if executed directly
if (require.main === module) {
    createExampleModel()
        .then(({ modelId, diagramId }) => {
            console.log("\n✅ Example creation complete!");
            console.log(`   Model ID: ${modelId}`);
            console.log(`   Diagram ID: ${diagramId}`);
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Error:", error);
            process.exit(1);
        });
}

export { createExampleModel, initializeCatColabApi };

