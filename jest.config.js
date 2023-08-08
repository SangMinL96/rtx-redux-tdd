const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const config = {
  verbose: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["./setupTests.js"],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

module.exports = config;
