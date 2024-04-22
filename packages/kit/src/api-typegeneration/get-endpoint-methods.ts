import { methods } from '$/api/methods'
import { readFileSync } from 'fs'

export async function getEndpointMethods(path: string) {
	const content = readFileSync(path, 'utf-8')
	const regex = new RegExp(
		`export[\\s]*(const|let|function)[\\s]+(${methods.join('|')})[\\s]*(=|\\()`, 'g'
	)
	let result = null as RegExpExecArray | null
	const exports = [] as string[]
	while (result = regex.exec(content))
		exports.push(result[2]!)
	return exports
}