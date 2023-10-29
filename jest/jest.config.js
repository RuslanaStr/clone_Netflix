  
  
  module.exports = {
    preset: 'jest',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setupTests.js'],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    moduleNameMapper: {
      'node-fetch': 'jest-fetch-mock',
    },
  };
  

  
  
  