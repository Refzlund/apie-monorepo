import { PipeFn } from './pipe'

const pipeResults = Symbol('pipeResults')

export function saveResult<T extends PipeFn>(fn: T) {
	
	type P =
		T extends PipeFn<infer State, infer Input, infer Result>
		? { state: State, input: Input, result: Result } : never

	const unique = Symbol()
	
	const $fn = async (state: P['state'], input: P['input']) => {
		state[pipeResults] ??= new Map()
		const map: Map<symbol, unknown> = state[pipeResults]
		const result = await fn(state, input)
		map.set(unique, result)
		return result
	}
	
	const get$fn = (state: P['state']) => {
		state[pipeResults] ??= new Map()
		const map: Map<symbol, unknown> = state[pipeResults]
		return map.get(unique) as P['result']
	}

	return [$fn as T, get$fn] as const
}