export async function getEndpointMethods(path: string) {
	const content = await Bun.file(path).text()
	const regex =
		/export[\s]*(const|let|function)[\s]+(GET|HEAD|POST|PUT|DELETE|PATCH|OPTIONS)[\s]*(=|\()/g
	let result = null as RegExpExecArray | null
	const exports = [] as string[]
	while (result = regex.exec(content))
		exports.push(result[2]!)
	return exports
}