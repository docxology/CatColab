/**
 * Utility functions for Active Inference
 * 
 * Helper functions for working with CatColab structures
 */

import type { Document } from "catlog-wasm";

/**
 * Validate that a document has the required CatColab structure
 */
export function validateDocument(doc: Document): boolean {
    if (!doc.name || typeof doc.name !== "string") {
        return false;
    }

    if (doc.type !== "model" && doc.type !== "diagram") {
        return false;
    }

    if (doc.version !== "1") {
        return false;
    }

    if (!doc.notebook || !doc.notebook.cellContents || !doc.notebook.cellOrder) {
        return false;
    }

    if (doc.type === "diagram" && !doc.model) {
        return false;
    }

    return true;
}

/**
 * Get all object IDs from a document
 */
export function getObjectIds(doc: Document): string[] {
    const objectIds: string[] = [];

    for (const cellId of doc.notebook.cellOrder) {
        const cell = doc.notebook.cellContents[cellId];
        if (cell?.tag === "formal" && cell.content?.tag === "object") {
            objectIds.push(cell.content.id);
        }
    }

    return objectIds;
}

/**
 * Get all morphism IDs from a document
 */
export function getMorphismIds(doc: Document): string[] {
    const morphismIds: string[] = [];

    for (const cellId of doc.notebook.cellOrder) {
        const cell = doc.notebook.cellContents[cellId];
        if (cell?.tag === "formal" && cell.content?.tag === "morphism") {
            morphismIds.push(cell.content.id);
        }
    }

    return morphismIds;
}

/**
 * Find an object by name in a document
 */
export function findObjectByName(doc: Document, name: string): string | null {
    for (const cellId of doc.notebook.cellOrder) {
        const cell = doc.notebook.cellContents[cellId];
        if (
            cell?.tag === "formal" &&
            cell.content?.tag === "object" &&
            cell.content.name === name
        ) {
            return cell.content.id;
        }
    }
    return null;
}

/**
 * Find a morphism by name in a document
 */
export function findMorphismByName(doc: Document, name: string): string | null {
    for (const cellId of doc.notebook.cellOrder) {
        const cell = doc.notebook.cellContents[cellId];
        if (
            cell?.tag === "formal" &&
            cell.content?.tag === "morphism" &&
            cell.content.name === name
        ) {
            return cell.content.id;
        }
    }
    return null;
}

