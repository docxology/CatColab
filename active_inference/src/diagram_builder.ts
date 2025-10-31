/**
 * Diagram Builder for Active Inference
 * 
 * Uses real CatColab document structures to build diagram instances
 * of models.
 */

import type { Document, Link } from "catlog-wasm";
import type { Uuid } from "catlog-wasm";
import * as uuid from "uuid";
import { ActiveInferenceClient } from "./catcolab_client";

/**
 * Build a CatColab diagram document structure
 * 
 * Diagrams are instances that populate a model
 */
export class DiagramBuilder {
    private name: string;
    private modelRef: Link;
    private notebook: {
        cellContents: Record<string, any>;
        cellOrder: string[];
    };

    constructor(name: string, modelRef: Link) {
        this.name = name;
        this.modelRef = modelRef;
        this.notebook = {
            cellContents: {},
            cellOrder: [],
        };
    }

    /**
     * Add an object instance to the diagram
     * Uses real CatColab diagram cell structure
     */
    addObjectInstance(params: {
        name: string;
        obType: string;
        over?: string; // parent object id
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
                ...(params.over && {
                    over: {
                        tag: "Basic",
                        content: params.over,
                    },
                }),
            },
        };

        this.notebook.cellContents[cellId] = cell;
        this.notebook.cellOrder.push(cellId);

        return id;
    }

    /**
     * Add a morphism instance to the diagram
     * Uses real CatColab diagram cell structure
     */
    addMorphismInstance(params: {
        name: string;
        dom: string;
        cod: string;
        morType: string;
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

        this.notebook.cellContents[cellId] = cell;
        this.notebook.cellOrder.push(cellId);

        return id;
    }

    /**
     * Add rich text to the diagram
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
     */
    build(): Document {
        return {
            name: this.name,
            type: "diagram",
            version: "1",
            model: this.modelRef,
            notebook: this.notebook,
        } as Document;
    }

    /**
     * Create the diagram in CatColab
     */
    async create(client: ActiveInferenceClient): Promise<Uuid> {
        const doc = this.build();
        return await client.createDiagram(doc);
    }
}

