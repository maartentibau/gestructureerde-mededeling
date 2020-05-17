module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['json'],
  passWithNoTests: true
};
