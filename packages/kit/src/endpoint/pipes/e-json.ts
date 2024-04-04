import { UnknownRecord } from '@apie/utility/types'
import { kitPipe } from '../endpoint-fn'
import { BadRequest } from '@apie/responses'

export const invalidJSONFormat = BadRequest({ error: 'Invalid JSON format' })

export const eJSON = kitPipe(e => {
	type JSON = UnknownRecord | unknown[]
	let json = null as JSON | null

	// @ts-expect-error setJSON does not exist
	e.setJSON = (v: UnknownRecord) => json = v

	e.json = async () => {
		try {
			json = json || await e.request.json()
		} catch (error) {
			return invalidJSONFormat
		}
		return json as JSON
	}
})