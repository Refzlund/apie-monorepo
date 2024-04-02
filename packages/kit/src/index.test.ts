import fn from '$'

import { describe, it, expect } from 'vitest'

describe('index', () => {
	it('should be a string', () => {
		expect(typeof fn()).toBe('string')
	})

	const s = 'Giraffe\'s are quite intruiging creatures.'
	it(`it should be "${s}"`, () => {
		expect(fn()).toBe(s)
	})
})