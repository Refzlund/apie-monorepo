import { createGeneratedType } from '$/api-typegeneration/create-generated-type'
import { test } from 'bun:test'
import { resolve } from 'path'

test('Generated Type', async () => {
	const type = await createGeneratedType(
		resolve(import.meta.path, '../~routes')
	)
	await Bun.write(
		resolve(import.meta.path, '../~routes', '~generated-type.ts'),
		type.replace('@apie/kit', '$')
	)
})