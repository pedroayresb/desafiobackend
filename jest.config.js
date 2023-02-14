module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/App.ts',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'babel',
}