<h1 align='center' vertical-align='baseline' >
@apie/kit
<small>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAQAAACR313BAAAAEUlEQVR42mNkwAsYR6WHmDQAEFkAEMvRoosAAAAASUVORK5CYII=" />
<a href='https://www.npmjs.com/package/@apie/kit' vertical-align='bottom' >
	<img src='https://img.shields.io/npm/v/%40apie%2Fkit?style=for-the-badge&logo=npm&label=%20' alt='NPM Package'/>
</a>
</small>
</h1>
<h3 align="center">

![Linting & Tests](https://github.com/refzlund/api-kit/actions/workflows/main.yml/badge.svg)
[![SemVer.org](https://img.shields.io/badge/Semantic_Versioning-v2-orange)](https://semver.org/)
[![PaypalMe](https://img.shields.io/badge/Donate-%40Refzlund-green?logo=paypal)](https://www.paypal.com/paypalme/refzlund)

</h3>

### What is @apie and @apie/kit?

An eco-system for infrastructure around REST API. `@apie/kit` is made for  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png' width=14> [SvelteKit](https://github.com/sveltejs/kit)  as a ***typed bridge*** between the frontend and your backend REST API.

- Endpoints that validate JSON and URLSearchParams (query) via Zod
- Easy to read Responses
- Accessible frontend API with generated types

<br>
<br>

### Get started

> [!NOTE]  
> Documentation incomplete.

`bun add -D @apie/responses @apie/kit`

<br>

#### Add the plugin that generates your API type

`vite.config.ts`
```ts
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { watchAPI } from '@apie/kit'

export default defineConfig({
	plugins: [sveltekit(), watchAPI()]
})
```

<br>

#### Add a shortcut to the api

`svelte.config.js`
```ts
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			api: './src/api.ts',
```

<br>

#### Define your endpoint

`src/routes/api/users`
```ts
import z from 'zod'
import { OK, BadRequest } from '@apie/responses'
import { endpoint } from '@apie/kit'

import getUsers from '...'

const query = z.object({
	limit: z.number()
})

export const GET = endpoint({ /* body, */ query }, pipe => pipe(
	async e => {
		const users = await getUsers({ limit: e.query.limit })
		if(!users) {
			return BadRequest({
				error: 'Too many users!... :D'
			})
		}
		
		return OK({ users })
	}
))
```

<br>

#### Use your API in your svelte file!

`src/routes/+page.svelte`
```svelte
<script>
	import api from '$api'

	const result = api.users.GET({ query: { limit: 5 } })
		.any(res => console.log(res))
		.$ // return the output of the following functions in order:
		.OK(res => res.json()) // result = [this, ...]
		.BadRequest(async res => (await res.json()).error) // result = [..., this]

</script>

{#await result}
	loading users...
{:then [userList, error]}
	...
{/await}

```

<br>
<br>

### `@apie/pipe`

Make your life easier, and learn how to utilize [`@apie/pipe`](https://www.npmjs.com/package/@apie/pipe). 
This enables code-splitting patterns, inspired by the functional programming paradigm.

This is optional, but a powerful one at that.

<br>
<br>
<br>
<br>
<br>
<br>