/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/functionTests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true,
};
