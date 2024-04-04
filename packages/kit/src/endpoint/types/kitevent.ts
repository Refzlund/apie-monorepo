import { UnknownRecord } from '@apie/utility/types'
import { RequestEvent } from '@sveltejs/kit'
import { RequestOptions } from './callback'
import { IsUnknown } from '@apie/utility/types'
import { brand } from '$/types/utility'

export type Locals<L extends UnknownRecord = {}> = { locals: L }

export interface KitRequestInput extends RequestOptions {
	body?: unknown | undefined
}

type GetQuery<I extends KitRequestInput> = I extends { query: infer Q } ? Q : {}

/** KitEvent simplifies the _KitEvent by hiding the intenral type for intellisense */
type _KitEvent<
	Input extends KitRequestInput,
> = Omit<RequestEvent, 'request'> & {
	[brand]: Input
	request: {
		json: () => Promise<
			IsUnknown<Input['body']> extends true
			? UnknownRecord | unknown[]
			: Input['body']
		>
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
			json: () => Promise<
				IsUnknown<Input['body']> extends true
				? UnknownRecord | unknown[]
				: Input['body']
			>
		} : {}
	) & (
		true extends
		| IsUnknown<Input['query']>
		| (UnknownRecord extends Input['query'] ? true : false)
		| (Input['query'] extends UnknownRecord ? true : false)
		? [keyof NonNullable<Input['query']>] extends [never] ? {} : {
			/** Retrieve and validate URLParams, or retrieve cached URLParams */
			query: NonNullable<Input['query']>
		} : {}
	)
// 

export type KitEvent<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Input extends KitRequestInput = any
> = {
	[Key in keyof _KitEvent<Input>]: _KitEvent<Input>[Key]
}