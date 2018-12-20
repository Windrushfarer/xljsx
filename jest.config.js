module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'lib'
  ],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.jest.json',
    },
  },
}
