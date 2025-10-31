import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["tests/**/*.test.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.example.ts", "tests/**"],
        },
    },
    resolve: {
        alias: {
            // Ensure we can resolve CatColab packages
            "catlog-wasm": "../catlog-wasm/dist/pkg-browser",
            "catcolab-api": "../backend/pkg",
        },
    },
});

