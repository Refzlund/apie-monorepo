import z from 'zod'
import { UnknownRecord } from '@apie/utility/types'
import { Validator } from '../endpoint-fn'
import { BadRequest } from '@apie/responses'
import { kitPipe } from '..'

function isObject(str: string | null): str is string {
	if(typeof str !== 'string') return false
	return (str.startsWith('{') && str.endsWith('}')) || (str.startsWith('[') && str.endsWith(']'))
}

export const validateQuery = (validator: Validator) => kitPipe(e => {
	const { query } = validator
	if (query === undefined) return

	if (query) {
		const { searchParams } = e.url
		const q = {} as UnknownRecord

		const issues = [] as z.ZodIssue[]

		for (const key of Object.keys(query.shape)) {
			let value = searchParams.get(key) as string | null 

			const queryParam = query.shape[key] as
				z.ZodType & { _def: { coerce?: boolean, typeName: string } }
			
			const coerce = queryParam._def.coerce as boolean

			try {
				if (isObject(value))
					value = JSON.parse(value)

				const unwrapped = 'unwrap' in queryParam ? (<{ unwrap(): z.ZodType }>queryParam).unwrap() : queryParam
				const isBoolean = unwrapped instanceof z.ZodBoolean
				if (!isBoolean)
					queryParam._def.coerce = true

				q[key] = queryParam.parse(
					isBoolean ? (value == 'true' ? true : value == 'false' ? false : value)
						: value === null ? undefined : value			
				)

			} catch (error) {
				if (error instanceof z.ZodError) {
					for(const issue of error.issues)
						issue.path = [key]
					issues.push(...error.issues)
				}
				else
					throw error
			} finally {
				query.shape[key]._def.coerce = coerce
			}
		}

		if (issues.length > 0)
			return BadRequest({
				code: 'invalid_query',
				error: 'Invalid query',
				details: issues
			})

		e.query = q
	}
})