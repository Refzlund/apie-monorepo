import { ToJSON } from '$/types/json'
import { Simplify, UnknownRecord } from '@apie/utility/types'
import { RequestEvent } from '@sveltejs/kit'
import { RequestOptions } from './callback'
import { IsUnknown } from '@apie/utility/types'
import { brand } from '$/types/utility'

export type Locals<L extends UnknownRecord = {}> = { locals: L }

export interface KitRequestInput extends RequestOptions {
	body?: unknown | undefined
	query?: UnknownRecord | undefined
}

type GetQuery<I extends KitRequestInput> = I extends { query: infer Q } ? Q : {}

/** KitEvent simplifies the _KitEvent by hiding the intenral type for intellisense */
type _KitEvent<
	Input extends KitRequestInput, 
> = Omit<RequestEvent, 'request'> & {
	[brand]: Input
	request: {
		json: () => Promise<Input['body']>
	} & Omit<RequestEvent['request'], 'json'>
	url: {
		searchParams: {
			get: <T extends keyof GetQuery<Input>>(s: T) => string | null,
			getAll: <T extends keyof GetQuery<Input>>(s: T) => Array<string>,
			has: <T extends keyof GetQuery<Input>>(s: T) => boolean
		}
	}
} & (
	true extends
		| IsUnknown<Input['body']>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		| (Input['body'] extends Record<PropertyKey, any> ? true : false)
	? {
		/** Retrieve and validate request JSON or retrieve the cached JSON */
		json: () => Promise<Input['body']>
	} : {}
) & (
	true extends
		| IsUnknown<Input['query']>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		| (Record<PropertyKey, any> extends Input['query'] ? true : false)
	? {
		/** Retrieve and validate URLParams, or retrieve cached URLParams */
		query: NonNullable<Input['query']>
	} : {}
)

export type KitEvent<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Input extends KitRequestInput = any
> = {
	[Key in keyof _KitEvent<Input>]: _KitEvent<Input>[Key]
}

export function asKitEvent<T>(value: T) {
	return value as unknown as
		(T extends KitEvent ? T : KitEvent) & { Type: InferKitEvent<T> }
}

export type InferKitEvent<
	T,
	JSON extends boolean = true,
	Local extends boolean = true
> = T extends KitEvent<infer K> ?
	(JSON extends true
		? ToJSON<NonNullable<K>>
		: NonNullable<K>
	) & (Local extends true ? { locals: Simplify<T['locals']> } : {}) : never