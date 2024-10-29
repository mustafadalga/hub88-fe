import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ react() ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './jest-dom.setup.ts',
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        exclude: [
            '**/node_modules/**',
            '**/e2e/**/*'
        ]
    },
})