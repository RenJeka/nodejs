// import { Config } from 'jest';
//
// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'node'
// };
//
// export default config;


/**
 * to configure with ES Modules see:
 * @see https://jestjs.io/docs/ecmascript-modules
 * @see https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
 * package.json (scripts)
 * "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js "
 */

export default {
  // preset: 'ts-jest/presets/default-esm',
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {},
  // extensionsToTreatAsEsm: ['.ts'],
};