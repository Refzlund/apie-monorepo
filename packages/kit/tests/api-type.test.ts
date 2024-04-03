import { createAPI } from '$'
import { test } from 'bun:test'

// * Note: will be generated on `packages/kit#   bun test`
import { GeneratedAPI } from './~routes/generated-type'

test.skip('API types', async () => {

	const { api } = createAPI<GeneratedAPI>()

	// @ts-expect-error Age is missing
	api.users.POST({ name: 'shiba' })

	const [ok] = await api.users.POST({ name: 'giraffe', age: 5 })
		.$.OK(async e => await e.json())

	// @ts-expect-error ok is possibly undefined
	ok.name

	// @ts-expect-error number not assignable to string
	ok!.name = 123

})