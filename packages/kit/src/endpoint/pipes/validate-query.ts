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
		
		for (const key of Object.keys(query.shape)) {
			let value = searchParams.get(key) as string | null 

			const coerce = query.shape[key]._def.coerce as boolean

			try {
				if (isObject(value))
					value = JSON.parse(value)
				query.shape[key]._def.coerce = true

				q[key] = query.shape[key].parse(value === null ? undefined : value)

			} catch (error) {
				if (error instanceof z.ZodError)
					return BadRequest({ error: 'Invalid query', details: error.issues })
				throw error

			} finally {
				query.shape[key]._def.coerce = coerce

			}
		}
		e.query = q
	}
})