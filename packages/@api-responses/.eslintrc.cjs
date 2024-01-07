// @ts-check
/* eslint @typescript-eslint/no-var-requires: 0 */
const { mergeConfigs, config } = require('eslint-configs')

module.exports = mergeConfigs(config.ts, {
})