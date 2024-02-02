/** Where the content is presented as: `data: {...}` */
function streamToJSON(chunk: Uint8Array) {
	const text = new TextDecoder().decode(chunk)
	const data = text.split('data: ').filter(v => v[0] === '{').map(v => JSON.parse(v))
	return data as Record<string | number, unknown>[]
}

(async () => {
	const response = new Response()
	console.log(response)

	if (!response.body || response.status != 200)
		return
	const body = response.body as ReadableStream<Uint8Array>
		& { [Symbol.asyncIterator]: () => AsyncGenerator<Uint8Array, void, unknown> }
	
	body[Symbol.asyncIterator] = async function* () {
		const reader = this.getReader()
		try {
			while (true) {
				const { done, value } = await reader.read()
				if (done) return
				yield value
			}
		}
		finally {
			reader.releaseLock()
		}
	}

	for await (const chunk of body) {
		for (const json of streamToJSON(chunk)) {
			console.log(json)
		}
	}
})()

