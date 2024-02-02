<h1 align='center' vertical-align='baseline' >
@api/pipe
<small>
<a href='https://www.npmjs.com/package/@api/pipe' vertical-align='bottom' >
	<img src='https://img.shields.io/github/v/release/refzlund/api-monorepo?style=social&label=RELEASE&labelColor=8a0000&color=FF0000' alt='NPM Package'/>
</a>
</small>
</h1>
<h3 align="center">

<a href='https://github.com/refzlund/api-monorepo/actions/workflows/main.yml/badge.svg'>
	<img src='https://github.com/refzlund/api-monorepo/actions/workflows/main.yml/badge.svg' alt='Linting & Tests'/>
</a>

<a href='https://semver.org'>
	<img src='https://img.shields.io/badge/Semantic_Versioning-v2-orange' alt='Semantic Versioning V2'/>
</a>

<a href='https://www.paypal.com/paypalme/refzlund'>
	<img src='https://img.shields.io/badge/Donate-%40Refzlund-green?logo=paypal' alt='Donation Link'/>
</a>

<br/>

</h3>

### What is @api and @api/pipe?

An eco-system for infrastructure around REST API. It's worth noting that it is designed so that it can be used in all applications besides a REST API.

`@api/pipe` provides a way to create a pipe-function that has an event input. An event is considered a stateful object, that is passed through all functions, inspired by [SvelteKits `RequestEvent`](https://kit.svelte.dev/docs/types#public-types-requestevent). This provides dependency injection and access to important information for each eventful trigger.

That means, this is useful for any serverless-functions, such as AWS lambdas etc.

### `createEventPipe<T>` options
| Option | Description | Type |
| ---- | ---- | ---- |
| before? | Functions that will be run before the pipeline | MaybeArray<(event: T) => unknown> |
| after? | Functions that will be run before the pipeline<br>(does not run if an exception is thrown) | MaybeArray<(event: T, result: unknown) => unknown> |
| finally? | Functions that will be run before the pipeline | MaybeArray<(event: T, result?: unknown, error?: unknown) => unknown> |
| catch? | A function that returns a response in relation to an error being thrown<br>(default: ` InternalServerError()`) | catch?(event: T, error: unknown): APIResponse |

## Pipelines
The pipeline (result of using a pipe), will return early if the function returns an `APIResponse`.
### Example

```ts
import { createEventPipe } from '@api/pipe'
import { OK } from '@api/responses'
import { getBody, isResponse } from '@api/responses'

import { authGuard } from '$pipeline'

interface State {
	value: number
}

const helloPipe = createEventPipe<State>({ /* options */ })

const myPipeline = helloPipe(
    authGuard(), // Make sure user is logged in
    
    (event) => {
        return 200
    },

    (event, input: number) => {
        if(event.value > input)
            return OK('Above 200')
		
		return 'Less or equal than 200'
    }
)

const result1 = myPipeline({ value: 345 }) // => APIResponse: OK('Above 200')
const result2 = myPipeline({ value: 123 }) // => string: 'Less or equal than 200'

if(isResponse(result1)) {
	/*
		Note: `getBody` gets the raw body of the response.
		This only works on the backend, as a RAW value of the body
		is stored as `response._body`, which means you don't need
		to retrieve the body using something like `await response.json()`
	*/
    const body = getBody(result1) // 'Above 200'
}

```