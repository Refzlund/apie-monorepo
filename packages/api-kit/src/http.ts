import { UnknownRecord } from '$types/utility'

export const kitResponseSymbol = Symbol('kitresponse')

export interface KitResponse<
	Status extends number = number,
	Ok extends boolean = boolean,
	Body = unknown
> {
	status: Status
	ok: Ok,
	body: Body
	kitResponseSymbol: typeof kitResponseSymbol
}

export interface KitResponseOptions {
	headers?: UnknownRecord,
	/** 
	 * `content-type`, default value: If body is an
	 * object "application/json", otherwise "text/plain;charset=UTF-8"
	*/
	contentType?: string
}

export function response(
	body: unknown, opts: KitResponseOptions & { status: number }
) {
	let { headers } = opts

	headers ??= {}

	if (body) {
		const contentType = headers['content-type'] as string | undefined

		const isJSON =
			(contentType === undefined || contentType.includes('application/json'))
			&& typeof body === 'object'

		if (isJSON) {
			headers['content-type'] = 'application/json'
			body = JSON.stringify(body)
		}
	}

	const res = new Response(
		body as BodyInit,
		{ headers: headers as HeadersInit, status: opts.status }
	) as unknown as KitResponse<number, boolean>

	res.kitResponseSymbol = kitResponseSymbol
	
	return res
}