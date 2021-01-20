module.exports = {
    collectCoverage: true,
    coverageDirectory: "build/coverage",
    testEnvironment: "node",
    reporters: ["default", ["jest-junit", { suiteName: "P16 Modern MW", outputName: "TEST-integration.xml", outputDirectory: "build/test-results" }]]
};
