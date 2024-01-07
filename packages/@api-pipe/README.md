<h1 align='center'>@api/pipe</h1>
<h3 align="center">

<a href='https://github.com/refzlund/api-kit/actions/workflows/main.yml/badge.svg'>
	<img src='https://github.com/refzlund/api-kit/actions/workflows/main.yml/badge.svg' alt='Linting & Tests'/>
</a>

<a href='https://semver.org'>
	<img src='https://img.shields.io/badge/Semantic_Versioning-v2-orange' alt='Semantic Versioning V2'/>
</a>

<a href='https://www.paypal.com/paypalme/refzlund'>
	<img src='https://img.shields.io/badge/Donate-%40Refzlund-green?logo=paypal' alt='Donation Link'/>
</a>

<br/>

<a href='https://www.npmjs.com/package/@api/pipe'>
	<img src='https://img.shields.io/github/v/release/refzlund/api-kit?style=for-the-badge&label=PRE-RELEASE&labelColor=8a0000&color=FF0000' alt='NPM Package'/>
</a>

</h3>

> [!WARNING]  
> Work in progress. **Your house might catch on fire.**

### What is @api and @api/pipe?

An eco-system for infrastructure around REST API. It's worth noting that it is designed so that it can be used in all applications besides a REST API.

`@api/pipe` provides a way to create a pipe-function that has an event input. An event is considered a stateful object, that is passed through all functions, inspired by [SvelteKits `RequestEvent`](https://kit.svelte.dev/docs/types#public-types-requestevent). This provides dependency injection and access to important information for each eventful trigger.

That means, this is useful for any serverless-functions, such as AWS lambdas etc.

### `createEventPipe<T>` options
| Option | Description | Type |
| ---- | ---- | ---- |
| before? | Functions that will be run before the pipeline | Array<(event: T) => unknown> |
| after? | Functions that will be run before the pipeline<br>(does not run if an exception is thrown) | Array<(event: T, result: unknown) => unknown> |
| finally? | Functions that will be run before the pipeline | Array<(event: T, result?: unknown, error?: unknown) => unknown> |
| catch? | A function that returns a response in relation to an error being thrown<br>(default: ` InternalServerError()`) | catch?(event: T, error: unknown): APIResponse |

## Pipelines
The pipeline (result of using a pipe), will return early if the function returns an `APIResponse`.
### Example

```ts

type SomeInput = { hello: 'world' | 'there' }
const helloPipe = createEventPipe<SomeInput>({...})


const myPipeline = helloPipe(
    authGuard(), // Make sure user is logged in
    
    (e, v: undefined) => {
        return {
            pipeValue: e.hello
        }
    },

    (e, v) => {
        if(v.pipeValue === 'there')
            return OK({ message: 'General Kenobi' })

        return v.pipeValue + e.hello
    }
)



// Returns<string> which is `worldworld`
const result1 = myPipeline({ hello: 'world' })

// Returns<APIResponse>
const result2 = myPipeline({ hello: 'there' })
if(isResponse(result2)) {

    const body = getBody(result2) // { message: 'General Kenobi' }
    result2.body // string
}

const secondPipeline(
	myPipeline, // Use
	...,
	OK({ message: 'Everything went as expected' }) // 200, JSON
)

```