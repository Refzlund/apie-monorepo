<h1 align="center">API Kit</h1>
<h3 align="center">

![Linting & Tests](https://github.com/refzlund/api-kit/actions/workflows/main.yml/badge.svg)
[![SemVer.org](https://img.shields.io/badge/Semantic_Versioning-v2-orange)](https://semver.org/)
[![PaypalMe](https://img.shields.io/badge/Donate-%40Refzlund-green?logo=paypal)](https://www.paypal.com/paypalme/refzlund)

</h3>

<div align="center">

[![Release Version](https://img.shields.io/github/v/release/refzlund/api-kit?style=for-the-badge&label=PRE-RELEASE&labelColor=8a0000&color=FF0000)](https://www.npmjs.com/package/giraffe)

</div>

<blockquote align="center">

[!WARNING]<br>
This is a pre-release version. Any update may be breaking.<br>
See [CHANGELOG](./CHANGELOG.md) if your house is on fire.

</blockquote>



```ts

// * Server
import { sequence } from '...'
import { kitApi } from 'kitapi'

export const hooks = sequence(
	kitApi(
		defaults: {
			404: () => NotFound({ 
				error: { 
					type: 'not-found', 
					message: 'Resource not found.'
				}
			}),
			500: () => InternalServerError({
				error: { 
					type: 'internal-error',
					message: 'Unexpected error on the server.'
				}
			})
		}
	),
	(event) => {
		...
	}
)




// T extends (event: ...) ? ReturnType<T>

const pipeFn = (event: KitEvent<{ }> & In<{  }>) => {

	if(...) {
		return BadRequest({
			error: {
				type: 'some-error',
				message: 'My message',
				/** @example 123 */
				arbitaryValue: someVal
			}
		})
	}
	
	// Returning a response
	return Ok({
		/** @example 'This is an example message' */
		message: someStr
	})

	// Forwarding locals
	return {
		someLocalValue: 123
	}
}


const nestedPipeline = (event: ...) => {
	return pipeline(
		...
	)
}

// Using Typia
interface Post {
	body: {
		/** @min 3 */
		name: string
	},
	query: {...}
}

export const POST = endpoint<Post>(
	...
)


// * Browser

// Response
const response = await api.some.route.POST({ body: { ... } })
	 
// Return value
const [error, success, ...] = await api.some.route.POST({ body: { ... } }).$
	.Error(({ body }) => body.error)
	.Success(({ body }) => body.documents)
	...

// Stream example
await api.some.route.POST({ eventSource: true, query: { ... } })


```

