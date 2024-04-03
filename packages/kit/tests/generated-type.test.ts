import { createGeneratedType } from '$/api-typegeneration/create-generated-type'
import { test } from 'bun:test'
import { resolve } from 'path'

export type { APIEKit } from '$'

test('Generated Type', async () => {
	const type = await createGeneratedType(
		resolve(import.meta.path, '../~routes')
	)
	Bun.write(
		resolve(import.meta.path, '../~routes', 'generated-type.ts'),
		type.replace('@apie/kit', '$')
	)
})