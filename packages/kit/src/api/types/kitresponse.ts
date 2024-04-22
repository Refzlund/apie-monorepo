import { APIResponse } from '@apie/responses'
import { UnknownRecord } from '@apie/utility/types'

const brand: unique symbol = Symbol('KitResponse')

export type ResponseBody<Body> = {
	text(): Promise<string>
} & (
	& (Body extends UnknownRecord | unknown[] ? { body: Body } : {
		/** 
		 * Access body via `text()`, `formData()`, `blob()` or `arrayBuffer()`
		 * 
		 * Or alternatively, access the raw body via `getBody(res)`
		*/
		body: unknown
	})
	& (Body extends FormData ? { formData(): Promise<FormData> } : {})
	& (Body extends Blob ? {
		blob(): Promise<Blob>
		arrayBuffer(): Promise<ArrayBuffer>
	} : {})
	& (Body extends UnknownRecord | unknown[] | FormData | Blob ? {} : {
		blob(): Promise<Blob>
		arrayBuffer(): Promise<ArrayBuffer>
		json(): Promise<unknown>
	})
)

export type KitResponse<
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
	[brand]: Fn
} & ResponseBody<Body>

export type ToKitResponse<T extends APIResponse | KitResponse> =
	T extends APIResponse<infer A, infer B, infer C, infer D>
	? KitResponse<A, B, C, D>
	: T