import { createAPI } from '$/api'
import { test } from 'bun:test'

// * Note: will be generated on `packages/kit#   bun test`
import { GeneratedAPI } from './~routes/~generated-type'

test.skip('API types', async () => {

	const { api } = createAPI<GeneratedAPI>()

	api.content.POST([{ name: 'Giraffe' }, { name: 'Shiba' }])
		.OK(async e => console.log(e.body))

	// @ts-expect-error Age is missing
	api.users.POST({ name: 'shiba' })

	const [ok] = await api.users.POST({ name: 'giraffe', age: 5 })
		.BadRequest(async res => {
			const json = res.body
			json.error = 'Invalid JSON format'
			json.error = 'Invalid JSON content'

			// @ts-expect-error There are no queries on this POST
			json.error = 'Invalid query'
		})
		.$.OK(async e => e.body)

	// @ts-expect-error ok is possibly undefined
	ok.name

	// @ts-expect-error number not assignable to string
	ok!.name = 123

	// @ts-expect-error GET should not have a body
	api.pages.GET(null, {})

	api.pages.POST({ name: 'Shiba' })
	api.pages.POST([{ name: 'Giraffe' }])
	
	// @ts-expect-error order should be a string array
	api.pages.pagination$('25').GET({ query: { order: 123 } })

	// @ts-expect-error requires a query
	api.pages.pagination$('25').GET()

	const [qok] = await api.pages.pagination$('25').GET({ query: { order: ['name ASC', 'publishedAt DESC'] } })
		.$.OK(async e => e.body)
	
	if(qok) {
		// @ts-expect-error order is a string array
		qok.yourQuery.order = [123]
	}
})