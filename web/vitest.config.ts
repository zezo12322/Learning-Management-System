import path from 'node:path'
import { defineConfig } from 'vitest/config'

// Unit tests only (pure functions). Node environment — no jsdom needed since the
// covered modules (API mappers) have no DOM dependencies.
export default defineConfig({
  // Vite does not read tsconfig `paths`, so mirror the `@/*` alias here or any
  // runtime import through `@/` fails to resolve while tsc/eslint stay green.
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    globals: false,
  },
})
