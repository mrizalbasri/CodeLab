import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov", "clover"],
      reportsDirectory: "./coverage",
      include: ["lib/**/*.{ts,tsx}", "app/actions/**/*.{ts,tsx}"],
      exclude: ["lib/types.ts", "lib/__tests__/**", "**/*.d.ts"],
      thresholds: {
        statements: 50,
        lines: 50,
        functions: 65,
        branches: 65,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
