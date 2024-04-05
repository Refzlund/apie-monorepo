const exitSymbol: unique symbol = Symbol('Exit')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Exit<T = any> = {
	value: T,
	[exitSymbol]: true
}

export function isExit(value: unknown): value is Exit {
	return value !== null && typeof value === 'object' && value[exitSymbol] === true
}

export function exit<T>(value?: T) {
	return {
		value,
		[exitSymbol]: true
	} as Exit<T>
}

