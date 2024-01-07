/** @type {import('./mergeConfigs')} */
const mergeConfigs = require('./mergeConfigs.js')

const config = mergeConfigs({
	rules: {
		'semi': ['error', 'never'],
		'indent': ['error', 'tab'],
		'no-extra-boolean-cast': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { args: 'none', vars: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'quotes': [
			'error', 'single',
			{ 'allowTemplateLiterals': true }
		],
		'max-len': [
			'warn',
			{
				'code': 85,
				'ignoreUrls': true,
				'ignoreStrings': true,
				'tabWidth': 0,
				'ignoreTemplateLiterals': true,
				'ignoreRegExpLiterals': true
			}
		]
	}
})

module.exports = config