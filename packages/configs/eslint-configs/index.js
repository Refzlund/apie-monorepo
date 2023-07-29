module.exports = {
	config: {
		rules: require('./config-rules.js'),
		ts: require('./config-ts.js'),
		// svelte: require('./config-svelte'), // pnpm add -D eslint-plugin-svelte3
	},
	mergeConfigs: require('./mergeConfigs.js'),
}