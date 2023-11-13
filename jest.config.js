/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleNameMapper: {
    obsidian: 'mocks/obsidian.ts',
  },
};
