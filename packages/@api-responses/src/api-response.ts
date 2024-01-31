import type { UnknownRecord } from '@api/utility/types'

export const apiBrand = Symbol('APIResponse')

export type ResponseBody<Body> = {
	/** 
	 * Access body via `text()`, `json()`, `formData()`, `blob()` or `arrayBuffer()`
	 * 
	 * Or alternatively, access the raw body via `getBody(res)`
	*/
	body: unknown
	text(): Promise<string>
} & (
		& (Body extends UnknownRecord | unknown[] ? { json(): Promise<Body> } : {})
		& (Body extends FormData ? { formData(): Promise<FormData> } : {})
		& (Body extends Blob ? {
			blob(): Promise<Blob>
			arrayBuffer(): Promise<ArrayBuffer>
		} : {})
	)

export type APIResponse<
	/* eslint-disable @typescript-eslint/no-explicit-any */
	Status extends number = any,
	Ok extends boolean = any,
	Body = any,
	Fn extends string = any
	/* eslint-enable @typescript-eslint/no-explicit-any */
> = {
	status: Status
	ok: Ok
	statusText: string
	redirected: boolean
	headers: Headers
	type: ResponseType
	url: string
	[apiBrand]: Fn
} & ResponseBody<Body>

export interface APIResponseOptions {
	headers?: UnknownRecord,
	/** 
	 * `content-type`, default value: If body is an
	 * object "application/json", otherwise "text/plain;charset=UTF-8"
	*/
	contentType?: string
}

export function isResponse(res: unknown): res is APIResponse {
	return res instanceof Response
}

/** Returns the raw body of a response (ergo not a stringified body) */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function getBody<B>(res: APIResponse<any, any, B, any>) {
	// @ts-expect-error missing property
	return res._body as B
}

export function createAPIResponse<T>(
	rawBody: unknown, opts: APIResponseOptions & { status: number, statusText: string }
) {
	let { headers } = opts
	let body = rawBody

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
		body as BodyInit, {
			headers: headers as HeadersInit,
			status: opts.status,
			statusText: opts.statusText
		}
	) as unknown as APIResponse<number, boolean>

	res[apiBrand] = opts.statusText

	// @ts-expect-error missing property
	res._body = rawBody

	return res as unknown as T
}