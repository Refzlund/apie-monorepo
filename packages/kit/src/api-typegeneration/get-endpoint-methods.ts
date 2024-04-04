import { methods } from '$/api/methods'

export async function getEndpointMethods(path: string) {
	const content = await Bun.file(path).text()
	const regex = new RegExp(
		`export[\\s]*(const|let|function)[\\s]+(${methods.join('|')})[\\s]*(=|\\()`, 'g'
	)
	let result = null as RegExpExecArray | null
	const exports = [] as string[]
	while (result = regex.exec(content))
		exports.push(result[2]!)
	return exports
}