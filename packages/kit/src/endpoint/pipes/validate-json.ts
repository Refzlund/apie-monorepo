import z from 'zod'
import { BadRequest, isResponse } from '@apie/responses'
import { Validator } from '../endpoint-fn'
import { invalidJSONFormat } from './e-json'
import { kitPipe } from '..'

export const validateJSON = (validator: Validator) => kitPipe(async e => {
	const { body } = validator
	if (body === undefined || body === Buffer) return

	if (body) {
		const content = await e.json()
		if (isResponse(content))
			return content as typeof invalidJSONFormat
		
		try {
			e['setJSON']((<Exclude<typeof body, typeof Buffer>>body).parse(content))
		} catch (error) {
			if (error instanceof z.ZodError)
				return BadRequest({ code: 'invalid_json_content', error: 'Invalid JSON content', details: error.issues })
			throw error
		}
	}
})