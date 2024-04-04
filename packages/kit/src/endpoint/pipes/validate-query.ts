import z from 'zod'
import { UnknownRecord } from '@apie/utility/types'
import { kitPipe, Validator } from '../endpoint-fn'
import { BadRequest } from '@apie/responses'

function isObject(str: string) {
	return (str.startsWith('{') && str.endsWith('}')) || (str.startsWith('[') && str.endsWith(']'))
}

export const validateQuery = (validator: Validator) => kitPipe(e => {
	const { query } = validator
	if (query === undefined) return

	if (query) {
		const { searchParams } = e.url
		const q = {} as UnknownRecord
		
		for (const key of Object.keys(query.shape)) {
			let value = searchParams.get(key)
			if (value === null) continue

			const coerce = query.shape[key]._def.coerce as boolean

			try {
				if (isObject(value))
					value = JSON.parse(value)
				query.shape[key]._def.coerce = true

				q[key] = query.shape[key].parse(value)

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