import z from 'zod'
import { BadRequest, isResponse } from '@apie/responses'
import { kitPipe, Validator } from '../endpoint-fn'
import { invalidJSONFormat } from './e-json'

export const validateJSON = (validator: Validator) => kitPipe(async e => {
	const { body } = validator
	if (body === undefined) return

	if (body) {
		const content = await e.json()
		if (isResponse(content))
			return content as typeof invalidJSONFormat

		try {
			e['setJSON'](body.parse(content))
		} catch (error) {
			if (error instanceof z.ZodError)
				return BadRequest({ error: 'Invalid JSON', details: error.issues })
			throw error
		}
	}
})