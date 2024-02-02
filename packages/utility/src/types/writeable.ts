/* eslint-disable @typescript-eslint/no-explicit-any */

export type Writable<T> =
    T extends ((...args: any[]) => any) | Date | RegExp
        ? T
        : T extends ReadonlyMap<infer K, infer V> // maps
            ? Map<Writable<K>, Writable<V>> // make key and values writable
            : T extends ReadonlySet<infer U> // sets
                ? Set<Writable<U>> // make elements writable
                : T extends ReadonlyArray<unknown> // is an array or tuple?
                    ? `${bigint}` extends `${keyof T & any}` // is tuple
                        ? { -readonly [K in keyof T]: Writable<T[K]> }
                        : Writable<T[number]>[] // is regular array
                    : T extends object // is regular object
                        ? { -readonly [K in keyof T]: Writable<T[K]> }
                        : T; // is primitive or literal value