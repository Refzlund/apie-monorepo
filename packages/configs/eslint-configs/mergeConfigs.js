/**
 * Simple object check.
 * @param {any} item
 * @returns {boolean}
 */
function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * @typedef {import('eslint-define-config').ESLintConfig} ESLintConfig
 * @param {ESLintConfig} source
 * @param {ESLintConfig[]} overrides
 * @returns {ESLintConfig}
*/
function mergeConfigs(source, ...overrides) {
	return mergeObjects(source, ...overrides)
}

/**
 * @param {Record<string, any>} source
 * @param {Record<string, any>[]} overrides
 * @returns {Record<string, any>}
*/
function mergeObjects(source, ...overrides) {
	overrides ??= []
	if (!overrides.length)
		return source
	
	const override = overrides.shift()

	if (source && override && isObject(source) && isObject(override)) {
		for (const key in override) {

			/** @type {Record<any, any> | any[]} */
			const overrideItem = override[key]
			
			if (Array.isArray(overrideItem)) {
				if (!source.hasOwnProperty(key))
					source[key] = []
				
				for (const item of overrideItem) {
					if (source[key].includes(item))
						continue
					source[key].push(item)
				}  
				
				continue
			}

			if (isObject(overrideItem)) {
				if (!source.hasOwnProperty(key))
					source[key] = {}
				mergeObjects(source[key], overrideItem)

				continue
			}
			
			source[key] = overrideItem
		}
	}

	return mergeObjects(source, ...overrides)
}

module.exports = mergeConfigs