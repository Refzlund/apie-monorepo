import { UnknownRecord, brand } from '../types/utility'

type AsyncStream = ReadableStream<Uint8Array> & {
	[Symbol.asyncIterator]: () => AsyncGenerator<Uint8Array, void, unknown>
}

export type ResponseBody<Body> = {
	body: [Body] extends [undefined | void | null]
		? undefined
		: [Extract<Body, void | undefined | null>] extends [never]
		? AsyncStream
		: (AsyncStream | undefined)
	text(): Promise<string>
} & (Body extends UnknownRecord | unknown[] ? {
	json(): Promise<Body>
} : Body extends FormData ? {
	formData(): Promise<FormData>
} : Body extends Blob ? {
	blob(): Promise<Blob>
	arrayBuffer(): Promise<ArrayBuffer>
} : {})

export type KitResponse<
	Status extends number = number,
	Ok extends boolean = boolean,
	Body = unknown,
	Fn extends string = string
> = {
	status: Status
	ok: Ok
	statusText: string
	redirected: boolean
	headers: Headers
	type: ResponseType
	url: string
	[brand]: Fn
} & ResponseBody<Body>

// * -- Infer

export type InferKitResposneStatus<T extends KitResponse> = 
	T extends KitResponse<infer S> ? S : never

export type ExtractKitResponse<T extends KitResponse, Fn extends string> =
	Extract<T, KitResponse<number, boolean, unknown, Fn>>

export type InferKitResposneFn<T extends KitResponse> = 
	T extends KitResponse<number, boolean, unknown, infer Fn> ? Fn : never

export interface KitResponseOptions {
	headers?: UnknownRecord,
	/** 
	 * `content-type`, default value: If body is an
	 * object "application/json", otherwise "text/plain;charset=UTF-8"
	*/
	contentType?: string
}




export function kitResponse(
	body: unknown, opts: KitResponseOptions & { status: number, statusText: string }
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
		body as BodyInit, {
			headers: headers as HeadersInit,
			status: opts.status,
			statusText: opts.statusText
		}
	) as unknown as KitResponse<number, boolean>
	
	return res
}