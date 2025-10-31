/**
 * Tests for Diagram Builder
 * 
 * Tests diagram building using real CatColab structures
 */

import { describe, test, expect } from "vitest";
import { DiagramBuilder } from "../src/diagram_builder";
import type { Document, Link } from "catlog-wasm";

describe("DiagramBuilder", () => {
    const mockModelRef: Link = {
        _id: "00000000-0000-0000-0000-000000000000",
        _version: null,
        _server: "localhost",
    };

    test("should create a diagram builder with name and model reference", () => {
        const builder = new DiagramBuilder("Test Diagram", mockModelRef);
        expect(builder).toBeDefined();
    });

    test("should build a valid CatColab Document structure", () => {
        const builder = new DiagramBuilder("Test Diagram", mockModelRef);
        const doc = builder.build();

        expect(doc.name).toBe("Test Diagram");
        expect(doc.type).toBe("diagram");
        expect(doc.version).toBe("1");
        expect(doc.model).toEqual(mockModelRef);
        expect(doc.notebook).toBeDefined();
    });

    test("should add object instances to the diagram", () => {
        const builder = new DiagramBuilder("Test Diagram", mockModelRef);
        const instId = builder.addObjectInstance({
            name: "Instance1",
            obType: "Entity",
        });

        const doc = builder.build();
        expect(instId).toBeDefined();
        expect(Object.keys(doc.notebook.cellContents).length).toBeGreaterThan(0);
    });

    test("should add morphism instances to the diagram", () => {
        const builder = new DiagramBuilder("Test Diagram", mockModelRef);
        const obj1Id = builder.addObjectInstance({
            name: "Inst1",
            obType: "Entity",
        });
        const obj2Id = builder.addObjectInstance({
            name: "Inst2",
            obType: "Entity",
        });

        const morId = builder.addMorphismInstance({
            name: "relation",
            dom: obj1Id,
            cod: obj2Id,
            morType: "Hom",
        });

        const doc = builder.build();
        expect(morId).toBeDefined();
        expect(doc.notebook.cellOrder.length).toBeGreaterThan(2);
    });

    test("should support parent objects in instances", () => {
        const builder = new DiagramBuilder("Test Diagram", mockModelRef);
        const parentId = "parent-entity-id";
        const instId = builder.addObjectInstance({
            name: "Child Instance",
            obType: "Entity",
            over: parentId,
        });

        const doc = builder.build();
        expect(instId).toBeDefined();
        const cell = doc.notebook.cellContents[doc.notebook.cellOrder[0]];
        expect(cell.content.over).toBeDefined();
    });
});

