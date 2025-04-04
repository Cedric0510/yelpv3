/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node", // Utilise l'environnement Node.js pour les tests
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }], // Transforme les fichiers TypeScript avec ts-jest
  },
  extensionsToTreatAsEsm: [".ts"], // Traite les fichiers .ts comme des modules ES
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Extensions reconnues
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Correspond aux fichiers de test
  moduleNameMapper: {
    // Permet de mapper les imports .js pour TypeScript
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"], // Ignore les transformations dans node_modules
};