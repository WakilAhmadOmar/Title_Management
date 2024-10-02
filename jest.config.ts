// jest.config.ts

// export default {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//     // process `*.tsx` files with `ts-jest`
//   },
//   rootDir: "src",
//   moduleNameMapper: {
//     "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
//     "^@app/(.*)$": "<rootDir>/$1",
//   },
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json", // Use this custom tsconfig for Jest
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
