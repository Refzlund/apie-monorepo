declare const NilSymbol: unique symbol
export type Nil = { [NilSymbol]: null }

export type FilterNil<P> = [Nil] extends [P] ? never : P