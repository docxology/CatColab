/**
 * Tests for utility functions
 */

import { describe, test, expect } from "vitest";
import {
    validateDocument,
    getObjectIds,
    getMorphismIds,
    findObjectByName,
    findMorphismByName,
} from "../src/utils";
import type { Document } from "catlog-wasm";

describe("Utils", () => {
    const validModel: Document = {
        name: "Test Model",
        type: "model",
        version: "1",
        theory: "simple-schema",
        notebook: {
            cellContents: {},
            cellOrder: [],
        },
    } as Document;

    test("validateDocument should validate correct documents", () => {
        expect(validateDocument(validModel)).toBe(true);
    });

    test("validateDocument should reject invalid documents", () => {
        expect(
            validateDocument({ ...validModel, name: "" } as Document)
        ).toBe(false);
        expect(
            validateDocument({ ...validModel, type: "invalid" } as Document)
        ).toBe(false);
        expect(
            validateDocument({ ...validModel, version: "2" } as Document)
        ).toBe(false);
    });

    test("getObjectIds should extract object IDs", () => {
        const doc: Document = {
            ...validModel,
            notebook: {
                cellContents: {
                    cell1: {
                        tag: "formal",
                        id: "cell1",
                        content: {
                            tag: "object",
                            id: "obj1",
                            name: "Entity1",
                            obType: { tag: "Basic", content: "Entity" },
                        },
                    },
                },
                cellOrder: ["cell1"],
            },
        } as Document;

        expect(getObjectIds(doc)).toEqual(["obj1"]);
    });

    test("getMorphismIds should extract morphism IDs", () => {
        const doc: Document = {
            ...validModel,
            notebook: {
                cellContents: {
                    cell1: {
                        tag: "formal",
                        id: "cell1",
                        content: {
                            tag: "morphism",
                            id: "mor1",
                            name: "relation",
                            morType: { tag: "Basic", content: "Hom" },
                            dom: { tag: "Basic", content: "obj1" },
                            cod: { tag: "Basic", content: "obj2" },
                        },
                    },
                },
                cellOrder: ["cell1"],
            },
        } as Document;

        expect(getMorphismIds(doc)).toEqual(["mor1"]);
    });

    test("findObjectByName should find objects by name", () => {
        const doc: Document = {
            ...validModel,
            notebook: {
                cellContents: {
                    cell1: {
                        tag: "formal",
                        id: "cell1",
                        content: {
                            tag: "object",
                            id: "obj1",
                            name: "Entity1",
                            obType: { tag: "Basic", content: "Entity" },
                        },
                    },
                },
                cellOrder: ["cell1"],
            },
        } as Document;

        expect(findObjectByName(doc, "Entity1")).toBe("obj1");
        expect(findObjectByName(doc, "NotFound")).toBe(null);
    });

    test("findMorphismByName should find morphisms by name", () => {
        const doc: Document = {
            ...validModel,
            notebook: {
                cellContents: {
                    cell1: {
                        tag: "formal",
                        id: "cell1",
                        content: {
                            tag: "morphism",
                            id: "mor1",
                            name: "relation",
                            morType: { tag: "Basic", content: "Hom" },
                            dom: { tag: "Basic", content: "obj1" },
                            cod: { tag: "Basic", content: "obj2" },
                        },
                    },
                },
                cellOrder: ["cell1"],
            },
        } as Document;

        expect(findMorphismByName(doc, "relation")).toBe("mor1");
        expect(findMorphismByName(doc, "NotFound")).toBe(null);
    });
});

