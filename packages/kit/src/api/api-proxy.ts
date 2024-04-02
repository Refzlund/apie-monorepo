import responseMap from './response-map'

async function callback(
	v: Response,
	[status, cb]: [number, (response: Response) => unknown]
) {
	if (status === 0) return await cb(v)
	if (status < 100) {
		const floor = Math.floor(v.status / 100)
		if (floor === status || (status === 45 && floor >= 4))
			return await cb(v)
	}
	if (v.status === status)
		return await cb(v)
	return undefined
}

export function apiProxy(response: Promise<Response>) {
	let resolve: (value: unknown) => void
	const promise = new Promise(res => resolve = res)

	const callbacks = [] as [number, (res: Response) => Promise<void>][]
	const returnables = [] as [number, (res: Response) => Promise<unknown>][]

	let $ = false

	response.then(res => {
		setTimeout(async () => {
			for (const item of callbacks) {
				await callback(res, item)
			}
			if ($) {
				const results = [] as unknown[]
				for (const item of returnables) {
					results.push(await callback(res, item))
				}	
				return resolve(results)
			}
			return resolve(res)
		}, 0)
	})

	const proxy = new Proxy(callbacks, {
		get(target, prop: string) {
			if (prop === 'then')
				return promise.then.bind(promise)
			if (prop === 'catch')
				return promise.catch.bind(promise)
			if (prop === 'finally')
				return promise.finally.bind(promise)
			
			if (prop === '_')
				return proxy

			if (prop === '$') {
				$ = true
				return proxy
			}

			const status = responseMap[prop]
			if (typeof status === 'number') {
				return (cb: (res: Response) => Promise<void>) => {
					if ($)
						returnables.push([status, cb])
					else
						callbacks.push([status, cb])
					return proxy
				}
			}
			
			return proxy
		}
	})

	return proxy
}