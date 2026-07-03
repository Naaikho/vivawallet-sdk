import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    include: ['tests/**/*.test.ts'],
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportsDirectory: 'coverage',
      include: ['index.ts', 'src/**/*.ts'],
      exclude: [
        'dist/**',
        'node_modules/**',
        'tests/**',
        'src/types/**',
        'src/vivabases/VivaEndpoints.class.ts',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
      },
    },
  },
});
