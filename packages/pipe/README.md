<h1 align='center' vertical-align='baseline' >
@apie/pipe
<small>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAQAAACR313BAAAAEUlEQVR42mNkwAsYR6WHmDQAEFkAEMvRoosAAAAASUVORK5CYII=" />
<a href='https://www.npmjs.com/package/@apie/pipe' vertical-align='bottom' >
	<img src='https://img.shields.io/npm/v/%40apie%2Fpipe?style=for-the-badge&logo=npm&label=%20' alt='NPM Package'/>
</a>
</small>
</h1>
<h3 align="center">

<a href='https://github.com/refzlund/apie-monorepo/actions/workflows/main.yml/badge.svg'>
	<img src='https://github.com/refzlund/apie-monorepo/actions/workflows/main.yml/badge.svg' alt='Linting & Tests'/>
</a>

<a href='https://semver.org'>
	<img src='https://img.shields.io/badge/Semantic_Versioning-v2-orange' alt='Semantic Versioning V2'/>
</a>

<a href='https://www.paypal.com/paypalme/refzlund'>
	<img src='https://img.shields.io/badge/Donate-%40Refzlund-green?logo=paypal' alt='Donation Link'/>
</a>

<br/>

</h3>

### What is @apie and @apie/pipe?

An eco-system for infrastructure around REST API. It's worth noting that it is designed so that it can be used in all applications besides a REST API.

`@apie/pipe` provides a way to create a pipe-function that has an event input. An event is considered a stateful object, that is passed through all functions, inspired by [SvelteKits `RequestEvent`](https://kit.svelte.dev/docs/types#public-types-requestevent). This provides dependency injection and access to important information for each eventful trigger.

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
import { createEventPipe } from '@apie/pipe'
import { OK } from '@apie/responses'
import { getBody, isResponse } from '@apie/responses'

import { authGuard } from '$pipeline'

interface State {
    value: number
}

const valuePipe = createEventPipe<State>({ /* options */ })

const isValueAboveStateValue = valuePipe((event, input: number) => {
    if(event.value > input)
        return OK('Above 200')
	
    return 'Less than or equal to 200'
})

const pipeline200 = valuePipe(
	(event) => {
		console.log(`Inline function. Event: ${event}`)
	}
    200,
    isValueAboveStateValue
)

const result1 = pipeline200({ value: 345 }) // => APIResponse: OK('Above 200')
const result2 = pipeline200({ value: 123 }) // => string: 'Less than or equal to 200'

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