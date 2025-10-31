/**
 * CatColab API Client for Active Inference
 * 
 * This module provides a comprehensive interface to CatColab's real API methods
 * for creating and managing models, diagrams, and analyses.
 */

import type { Api } from "../packages/frontend/src/api";
import type { LiveDoc } from "../packages/frontend/src/api/document";
import type { Document, Uuid, StableRef } from "catlog-wasm";
import { PermissionsError } from "../packages/frontend/src/api";

/**
 * Wrapper around CatColab Api class with active inference specific utilities
 */
export class ActiveInferenceClient {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    /**
     * Create a new model document in CatColab
     * 
     * Uses the real CatColab API method: Api.createDoc
     */
    async createModel(modelInit: Document): Promise<Uuid> {
        if (modelInit.type !== "model") {
            throw new Error("Document must be of type 'model'");
        }
        return await this.api.createDoc(modelInit);
    }

    /**
     * Get a live model document with write access
     * 
     * Uses the real CatColab API method: Api.getLiveDoc
     */
    async getModel(refId: Uuid): Promise<LiveDoc<Document>> {
        return await this.api.getLiveDoc(refId, "model");
    }

    /**
     * Create a diagram for a model
     * 
     * Uses the real CatColab API method: Api.createDoc
     */
    async createDiagram(diagramInit: Document): Promise<Uuid> {
        if (diagramInit.type !== "diagram") {
            throw new Error("Document must be of type 'diagram'");
        }
        return await this.api.createDoc(diagramInit);
    }

    /**
     * Get a live diagram document
     * 
     * Uses the real CatColab API method: Api.getLiveDoc
     */
    async getDiagram(refId: Uuid): Promise<LiveDoc<Document>> {
        return await this.api.getLiveDoc(refId, "diagram");
    }

    /**
     * Duplicate an existing document
     * 
     * Uses the real CatColab API method: Api.duplicateDoc
     */
    async duplicateDocument(doc: Document): Promise<Uuid> {
        return await this.api.duplicateDoc(doc);
    }

    /**
     * Get permissions for a document
     * 
     * Uses the real CatColab API method: Api.getPermissions
     */
    async getPermissions(refId: Uuid) {
        return await this.api.getPermissions(refId);
    }

    /**
     * Create a stable reference to a document
     * 
     * Uses the real CatColab API method: Api.makeUnversionedRef
     */
    makeRef(refId: Uuid): StableRef {
        return this.api.makeUnversionedRef(refId);
    }

    /**
     * Check if user has write permissions
     */
    async canWrite(refId: Uuid): Promise<boolean> {
        try {
            const permissions = await this.getPermissions(refId);
            return permissions.max_level >= "Write";
        } catch (error) {
            if (error instanceof PermissionsError) {
                return false;
            }
            throw error;
        }
    }

    /**
     * Search for document references
     * 
     * Uses the real CatColab RPC method: search_ref_stubs
     */
    async searchRefs(query: {
        query?: string;
        type?: string;
        page?: number;
        page_size?: number;
    }) {
        const result = await this.api.rpc.search_ref_stubs.query(query);
        if (result.tag !== "Ok") {
            throw new Error(`Failed to search refs: ${result.message}`);
        }
        return result.content;
    }

    /**
     * Get child references of a document
     * 
     * Uses the real CatColab RPC method: get_ref_children_stubs
     */
    async getChildren(refId: Uuid) {
        const result = await this.api.rpc.get_ref_children_stubs.query(refId);
        if (result.tag !== "Ok") {
            throw new Error(`Failed to get children: ${result.message}`);
        }
        return result.content;
    }

    /**
     * Access the underlying CatColab API
     */
    getApi(): Api {
        return this.api;
    }
}

