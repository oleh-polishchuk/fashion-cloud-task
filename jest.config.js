module.exports = {
  moduleFileExtensions: ['js', 'json'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.js$',
  collectCoverageFrom: ['**/*.js'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/app.js',
    'src/index.js',
    'tests',
  ],
  testEnvironment: 'node',
};
