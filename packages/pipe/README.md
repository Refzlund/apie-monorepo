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

<br/>
<br/>

### `createEventPipe<T>` options
| Option | Description | Type |
| ---- | ---- | ---- |
| before? | Functions that will be run before the pipeline | MaybeArray<(event: T) => unknown> |
| after? | Functions that will be run before the pipeline<br>(does not run if an exception is thrown) | MaybeArray<(event: T, result: unknown) => unknown> |
| finally? | Functions that will be run before the pipeline | MaybeArray<(event: T, result?: unknown, error?: unknown) => unknown> |
| catch? | A function that returns a response in relation to an error being thrown<br>(default: ` InternalServerError()`) | catch?(event: T, error: unknown): APIResponse |

<br/>
<br/>


## Pipes and pipelines

A pipe a function that accepts an array functions. These functions may look like

`(state: T, input: any) => any`

The state/event defines requirements. An example of such a state/event is SvelteKit's [RequestEvent](https://kit.svelte.dev/docs/types#public-types-requestevent)
We define the state upon creating the pipe:

```ts
import { createEventPipe } from '@apie/pipe'

type State = {
	value: number
}

const pipe = createEventPipe<State>()
```

Now each function inside the pipe will have access to `State`:

```ts
const pipeline = pipe(
	(state) => {
		console.log(state.value)
		return state.value * 2
	},
	(state, input) => {
		console.log(input)
		return input * 2
	}
)

const result = pipeline({ value: 2 })
// result: 2 * 2 * 2 = 8
```


<br/>
<br/>


### A pipeline requiring an input

For consistency, you can create functions by using your pipe with just one function

```ts
const double = pipe((state) => state.value * 2)
double({ value: 2 }) // 4
```

If we want to multiple it by an arbitrary number, we can define the input:

```ts
const multiply = pipe((state, input: number) => state.value * input)
multiply({ value: 5 }, 2) // 10
```

<br/>
<br/>

### Returning Early

Our pipelines are designed around HTTP Responses. That means, if you **EVER** return an HTTP Response using `@apie/responses`, then the pipeline will exit early, resulting in that response.

```ts
import { OK } from '@apie/responses'

const fn = pipe(
	() => {
		return OK('Hi mom')
	},
	() => {
		// This will never run
		while(true) {}
	}
)

const result = fn({ value: 2 }) // OK<'Hi mom'>
```

<br/>
<br/>

### Nested Pipes

Sometimes we might want to re-use variables across multiple operations within our pipe.

In this example we use `(e,v) => pipe.nested(...)` to access the variable `v`, within our pipe function.

```ts
const Input = z.object({...})
const $bulkWriter = createBulkWriter(...)

const pipeline = pipe( 
	zodValidator(Input), 
	(e, v) => arrayChanges(
		v.existingDocuments, 
		v.updatedDocuments, 
		t => t._id?.toString()
	),
	(e, v) => pipe.nested(
		v.newEntries,
		$bulkWriter.insertMultiple,
		
		v.removedEntries.map(v => v._id),
		$bulkWriter.updateMany(
			v => ({ 
				filter: { _id: { $in: v } }, 
				update: { _status: 'archived' } 
			})
		),
		
		v.persistedEntries,
		$bulkWriter.updateMultiple(
			v => ({ 
				filter: { _id: v._id }, 
				update: { name: v.name } 
			})
		)
	),
	$bulkWriter.execute()
)

```

<br/>
<br/>

### Re-using a result of a function

Okay, let's say you want to re-use a result, but … we can't really declare variables here, can we?

Introducing… `saveResult`

```ts
import { saveResult } from '@apie/pipe'

const multiply = pipe((state, input: number) => state.value * input)

const [$multiply, get$multiply] = saveResult(multiply)

const pipeline = pipe(
	2,
	$multiply,
	(state, input: number) => {
		// ...
	},
	// ... Functions later
	(state) => OK(get$multiply(state))
)

const result = pipeline({ value: 3 }) // OK<number> -> body: 6

```

The result is saved within the `state`, so by referencing the state later, we can get access to the value.