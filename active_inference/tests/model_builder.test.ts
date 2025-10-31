/**
 * Tests for Model Builder
 * 
 * Tests the model building functionality using real CatColab structures
 */

import { describe, test, expect } from "vitest";
import { ModelBuilder } from "../src/model_builder";
import type { Document } from "catlog-wasm";

describe("ModelBuilder", () => {
    test("should create a model builder with name and theory", () => {
        const builder = new ModelBuilder("Test Model", "simple-schema");
        expect(builder).toBeDefined();
    });

    test("should build a valid CatColab Document structure", () => {
        const builder = new ModelBuilder("Test Model", "simple-schema");
        const doc = builder.build();

        expect(doc.name).toBe("Test Model");
        expect(doc.type).toBe("model");
        expect(doc.version).toBe("1");
        expect(doc.theory).toBe("simple-schema");
        expect(doc.notebook).toBeDefined();
        expect(doc.notebook.cellContents).toBeDefined();
        expect(doc.notebook.cellOrder).toBeDefined();
    });

    test("should add objects to the model", () => {
        const builder = new ModelBuilder("Test Model", "simple-schema");
        const objId = builder.addObject({
            name: "Entity1",
            obType: "Entity",
        });

        const doc = builder.build();
        expect(objId).toBeDefined();
        expect(Object.keys(doc.notebook.cellContents).length).toBeGreaterThan(0);
    });

    test("should add morphisms to the model", () => {
        const builder = new ModelBuilder("Test Model", "simple-schema");
        const obj1Id = builder.addObject({
            name: "Entity1",
            obType: "Entity",
        });
        const obj2Id = builder.addObject({
            name: "Entity2",
            obType: "Entity",
        });

        const morId = builder.addMorphism({
            name: "relation",
            dom: obj1Id,
            cod: obj2Id,
            morType: "Hom",
        });

        const doc = builder.build();
        expect(morId).toBeDefined();
        expect(doc.notebook.cellOrder.length).toBeGreaterThan(2);
    });

    test("should include descriptions when provided", () => {
        const builder = new ModelBuilder("Test Model", "simple-schema");
        builder.addObject({
            name: "Entity1",
            obType: "Entity",
            description: "A test entity",
        });

        const doc = builder.build();
        // Description should add a rich_text cell
        expect(doc.notebook.cellOrder.length).toBeGreaterThan(1);
    });

    test("should maintain cell order", () => {
        const builder = new ModelBuilder("Test Model", "simple-schema");
        builder.addObject({ name: "E1", obType: "Entity" });
        builder.addObject({ name: "E2", obType: "Entity" });
        builder.addText("Some text");

        const doc = builder.build();
        expect(doc.notebook.cellOrder.length).toBe(3);
    });
});

