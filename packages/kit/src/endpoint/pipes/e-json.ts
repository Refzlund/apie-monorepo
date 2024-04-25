import { UnknownRecord } from '@apie/utility/types'
import { kitPipe } from '..'
import { BadRequest } from '@apie/responses'
import { anyPipe } from '@apie/pipe'

export const invalidJSONFormat = BadRequest({ code: 'not_json', error: 'Invalid JSON format' })

export const eJSON = kitPipe(e => {
	type JSON = UnknownRecord | unknown[]
	let json = null as JSON | null

	// @ts-expect-error setJSON does not exist
	e.setJSON = (v: UnknownRecord) => json = v

	e.json = anyPipe(async () => {
		try {
			json = json || await e.request.json()
		} catch (error) {
			return invalidJSONFormat
		}
		return json as JSON
	})
})