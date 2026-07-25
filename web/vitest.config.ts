import { defineConfig } from 'vitest/config'

// Unit tests only (pure functions). Node environment — no jsdom needed since the
// covered modules (API mappers) have no DOM dependencies.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    globals: false,
  },
})
