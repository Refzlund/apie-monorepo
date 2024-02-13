import type { MaybeArray, UnknownRecord } from '@apie/utility/types'
import { type APIResponse } from '@apie/responses/types'
import { InternalServerError, isResponse } from '@apie/responses'
import { ArbitraryType } from './types/helper'
import { Pipe, PipeFn } from './types/pipe'

interface Options<T extends UnknownRecord> {
	/** Functions to run before every pipeline */
	before?: MaybeArray<((event: T) => unknown)>

	/** Functions to run after every pipeline (except if it trows) */
	after?: MaybeArray<((event: T, result: unknown) => unknown)>

	/** Functions to always run after every pipeline */
	finally?: MaybeArray<((event: T, result?: unknown, error?: unknown) => unknown)>

	catch?(event: T, error: unknown): APIResponse
}

export const pipe: unique symbol = Symbol()

export function createEventPipe<T extends UnknownRecord = {}>(
	options: Options<T> = {}
) {
	function errored(event: T, error: unknown) {
		console.error(error)
		try {
			if (Array.isArray(options?.finally))
				options?.finally?.forEach(fn => fn(event, undefined, error))
			else
				options?.finally?.(event, undefined, error)
		} catch (err) {
			error = err
		}
		try {
			return options?.catch?.(event, error) || InternalServerError()
		} catch (error) {
			console.error(error)
			return InternalServerError({ message: 'Pipeline: "catch"-stage has thrown an error.' })
		}

	}

	function before(event: T) {
		try {
			if (Array.isArray(options?.before))
				options?.before?.forEach(fn => fn(event))
			else
				options?.before?.(event)
		} catch (error) {
			return errored(event, error)
		}
	}

	function after(event: T, result: unknown) {
		try {
			if (Array.isArray(options?.after))
				options?.after?.forEach(fn => fn(event, result))
			else
				options?.after?.(event, result)

			if (Array.isArray(options?.finally))
				options?.finally?.forEach(fn => fn(event, result, undefined))
			else
				options?.finally?.(event, result, undefined)

		} catch (error) {
			return errored(event, error)
		}
	}

	const pipeFactory = <Nested extends boolean>(nested: Nested) => {

		const pipeFn = ((
			...params: Array<ArbitraryType | PipeFn<T, unknown, ArbitraryType>>
		) => {
			async function pipedFunction(event: T, input: unknown = undefined) {
				let previousResult = input

				let result = before(event)
				if (result !== undefined) return result

				for (const param of params) {
					if (typeof param !== 'function') {
						previousResult = param
						continue
					}

					if (isResponse(param)) {
						previousResult = param
						break
					}

					try {
						const cachePreviousResult = previousResult
						previousResult = await param(event, cachePreviousResult)

						while (typeof previousResult === 'function' && previousResult[pipe] === true) {
							previousResult = await previousResult(event, cachePreviousResult)
						}
					} catch (error) {
						return errored(event, error)
					}

					if (previousResult instanceof Response) {
						const result = after(event, previousResult)
						if (result !== undefined) return result
						return previousResult
					}
				}

				result = after(event, previousResult)
				if (result !== undefined) return result
				return previousResult
			}
			
			if (nested) {
				pipedFunction[pipe] = true
			}
			
			return pipedFunction
		}) as Nested extends true ? Pipe<T, { [pipe]: true }> : Pipe<T>

		return pipeFn 
	}

	const pipeFn = pipeFactory(false)
	pipeFn.nested = pipeFactory(true)
	

	return pipeFn
}