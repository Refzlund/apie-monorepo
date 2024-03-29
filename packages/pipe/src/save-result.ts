import { APIResponse } from '@apie/responses'
import { PipeFn } from './types/pipe'

const pipeResults = Symbol('pipeResults')

export function saveResult<T extends PipeFn>(fn: T) {
	
	type P =
		T extends PipeFn<infer State, infer Input, infer Result>
		? { state: State, input: Input, result: Result } : never

	const unique = Symbol()
	
	const $fn = async (state: P['state'], input: P['input']) => {
		state[pipeResults] ??= new Map()
		const map: Map<symbol, unknown> = state[pipeResults]
		const existing = map.get(unique)
		if (existing)
			return existing
		const result = await fn(state, input)
		map.set(unique, result)
		return result
	}
	
	const get$fn = (state: P['state']) => {
		state[pipeResults] ??= new Map()
		const map: Map<symbol, unknown> = state[pipeResults]
		return map.get(unique) as Exclude<P['result'], APIResponse>
	}

	return [$fn as T, get$fn] as const
}