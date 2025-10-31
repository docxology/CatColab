/**
 * Model Builder for Active Inference
 * 
 * Uses real CatColab document structures and catlog-wasm types
 * to build models programmatically.
 */

import type { Document } from "catlog-wasm";
import type { Uuid } from "catlog-wasm";
import * as uuid from "uuid";
import { ActiveInferenceClient } from "./catcolab_client";

/**
 * Build a CatColab model document structure
 * 
 * Creates model documents compatible with CatColab's real Document type
 */
export class ModelBuilder {
    private name: string;
    private theory: string;
    private notebook: {
        cellContents: Record<string, any>;
        cellOrder: string[];
    };

    constructor(name: string, theory: string) {
        this.name = name;
        this.theory = theory;
        this.notebook = {
            cellContents: {},
            cellOrder: [],
        };
    }

    /**
     * Add an object cell to the model
     * Uses real CatColab cell structure
     */
    addObject(params: {
        name: string;
        obType: string;
        description?: string;
    }): string {
        const id = uuid.v4();
        const cellId = uuid.v4();
        
        const cell = {
            tag: "formal",
            id: cellId,
            content: {
                tag: "object",
                id,
                name: params.name,
                obType: {
                    tag: "Basic",
                    content: params.obType,
                },
            },
        };

        if (params.description) {
            // Add rich text cell for description
            const descId = uuid.v4();
            const descCell = {
                tag: "rich_text",
                id: descId,
                content: {
                    tag: "rich_text",
                    content: params.description,
                },
            };
            this.notebook.cellContents[descId] = descCell;
            this.notebook.cellOrder.push(descId);
        }

        this.notebook.cellContents[cellId] = cell;
        this.notebook.cellOrder.push(cellId);

        return id;
    }

    /**
     * Add a morphism cell to the model
     * Uses real CatColab cell structure
     */
    addMorphism(params: {
        name: string;
        dom: string; // object id
        cod: string; // object id
        morType: string;
        description?: string;
    }): string {
        const id = uuid.v4();
        const cellId = uuid.v4();

        const cell = {
            tag: "formal",
            id: cellId,
            content: {
                tag: "morphism",
                id,
                name: params.name,
                morType: {
                    tag: "Basic",
                    content: params.morType,
                },
                dom: {
                    tag: "Basic",
                    content: params.dom,
                },
                cod: {
                    tag: "Basic",
                    content: params.cod,
                },
            },
        };

        if (params.description) {
            const descId = uuid.v4();
            const descCell = {
                tag: "rich_text",
                id: descId,
                content: {
                    tag: "rich_text",
                    content: params.description,
                },
            };
            this.notebook.cellContents[descId] = descCell;
            this.notebook.cellOrder.push(descId);
        }

        this.notebook.cellContents[cellId] = cell;
        this.notebook.cellOrder.push(cellId);

        return id;
    }

    /**
     * Add rich text content to the model
     */
    addText(content: string): string {
        const cellId = uuid.v4();
        const cell = {
            tag: "rich_text",
            id: cellId,
            content: {
                tag: "rich_text",
                content,
            },
        };
        this.notebook.cellContents[cellId] = cell;
        this.notebook.cellOrder.push(cellId);
        return cellId;
    }

    /**
     * Build the final CatColab Document
     * Returns a Document compatible with CatColab's real API
     */
    build(): Document {
        return {
            name: this.name,
            type: "model",
            version: "1",
            theory: this.theory,
            notebook: this.notebook,
        } as Document;
    }

    /**
     * Create the model in CatColab
     */
    async create(client: ActiveInferenceClient): Promise<Uuid> {
        const doc = this.build();
        return await client.createModel(doc);
    }
}

