module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/jest-setup.ts"],
  
  transform: {
    "^.+\\.jsx?$": "babel-jest", // For JS/JSX
    "^.+\\.ts?$": "ts-jest",     // For TS (if using TypeScript)
    "^.+\\.vue$": "@vue/vue3-jest" // For Vue 3 (if using Vue)
  },
  moduleFileExtensions: ["js", "json", "vue", "ts"],
};
