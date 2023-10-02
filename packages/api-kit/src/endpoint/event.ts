import { ToJSON } from '$/types/json'
import { Simplify, UnknownRecord, brand } from '$/types/utility'
import { RequestEvent } from '@sveltejs/kit'

export type Locals<L extends UnknownRecord = {}> = { locals: L }

export interface KitRequestInput {
	query?: UnknownRecord
	body?: UnknownRecord | unknown[]
}

/** KitEvent simplifies the _KitEvent by hiding the intenral type for intellisense */
type _KitEvent<Input extends KitRequestInput> = Omit<RequestEvent, 'request'> & {
	[brand]: Input
	request: {
		json: () => Promise<ToJSON<Input['body']>>
	} & Omit<RequestEvent['request'], 'json'>
	url: {
		searchParams: {
			get: <T extends keyof Input['query']>(s: T) => string | null,
			getAll: <T extends keyof Input['query']>(s: T) => Array<string>,
			has: <T extends keyof Input['query']>(s: T) => boolean
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KitEvent<Input extends KitRequestInput = any> = {
	[Key in keyof _KitEvent<Input>]: _KitEvent<Input>[Key]
}

export type InferKitEvent<
	T extends KitEvent,
	JSON extends boolean = true,
	Local extends boolean = true
> = T extends KitEvent<infer K> ?
	(JSON extends true
		? ToJSON<NonNullable<K>>
		: NonNullable<K>
	) & (Local extends true ? { locals: Simplify<T['locals']> } : {}) : never