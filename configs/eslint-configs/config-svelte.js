/** @type {import('./mergeConfigs')} */
const mergeConfigs = require('./mergeConfigs.js')

// * Install package before using config:
// pnpm add -D eslint-plugin-svelte3

const config = mergeConfigs(
	require('./config-ts.js'),
	{
		plugins: ['svelte3'],
		overrides: [{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}],
		settings: {
			'svelte3/typescript': () => require('typescript')
		},
		parserOptions: {
			sourceType: 'module',
			ecmaVersion: 2020,
		},
		env: {
			browser: true,
			es2017: true,
			node: true
		}
	}
)

module.exports = config