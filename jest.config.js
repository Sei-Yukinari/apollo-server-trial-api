/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/(spec|test).+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: '@quramy/jest-prisma/environment',
  testEnvironmentOptions: {
    verboseQuery: true,
  },
}
