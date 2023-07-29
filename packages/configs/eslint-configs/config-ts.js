/** @type {import('./mergeConfigs')} */
const mergeConfigs = require('./mergeConfigs.js')

const config = mergeConfigs(
	require('./config-rules.js'),
	{
		parser: '@typescript-eslint/parser',
		extends: [
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended'
		],
		env: {
			browser: false,
			es2022: true,
			node: true
		},
		overrides: [
			{
				files: ['**/*.{ts,js,cjs}'],
				parserOptions: {
					sourceType: 'script'
				}
			}
		],
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		plugins: ['@typescript-eslint']
	}
)

module.exports = config