import { Dirent } from 'fs'
import { variablize } from './variablize'
import { readdir } from 'fs/promises'
import { getEndpointMethods } from './get-endpoint-methods'

interface Typer {
	name?: string
	content?: Typer[]
	toString(): string | undefined
}

const defaultDirectory = (name?: string, indent: string = '') => ({
	name,
	content: [],
	toString() {
		let str = ''
		if (this.name) str += `\n${indent}'${this.name}': `
		str += `{ ${stringContent(this)} \n${indent}}`
		return str
	}
} as Typer)

const stringContent = (type: Typer) =>
	type.content!.map(v => v.toString()).filter(v => v !== undefined).join(', ')

export async function createGeneratedType(rootDir: string) {
	const imports = [] as string[]

	const handleType = async (
		type: Typer,
		[directory, endpoint]: [Dirent | null, Dirent | null],
		indent: string = ''
	) => {
		const dir = directory?.name
		if (dir && /\[.*\]/g.test(dir)) {
			const [name] = dir.replaceAll(/\[|\]/g, '').split('=') as [string]
			const slug = variablize(name)
			type.toString = function (this: Typer) {
				return `\n${indent}'${slug}$': ((${slug}: string) => { ${stringContent(this)} \n${indent}})`
			}
		}
		if (endpoint) {
			const methods = await getEndpointMethods(endpoint.path)
			if (methods.length === 0)
				return
			const i = `i${imports.length}` as const
			imports.push(`import * as ${i} from '${endpoint.path.replace(/\.ts$/, '')}'`)
			type.toString = function (this: Typer) {
				return methods.map(m => `\n${indent}'${m}': A<typeof ${i}['${m}'], '${m}'>`).join(', ')
			}
		}
	}

	const generated = defaultDirectory()

	async function readFiles(dir: string, type: Typer, indent = '') {
		indent += '\t'

		const files = await readdir(dir, { withFileTypes: true })
		for (const file of files) {
			file.path = dir + '/' + file.name
			if (file.isDirectory()) {
				const t = defaultDirectory(file.name, indent)
				type.content!.push(t)
				await handleType(t, [file, null], indent)
				await readFiles(file.path, t, indent)
				continue
			}
			if (!file.name.startsWith('+server'))
				continue
			const t = { toString() { return undefined } } as Typer
			type.content!.push(t)
			await handleType(t, [null, file], indent)
		}
	}

	await readFiles(rootDir, generated)
	return `/* eslint-disable */

// * This file is generative. Edits will be overwritten.

import type { APIEKit as A } from '@apie/kit/api' 
${imports.join(';\n')}

export type GeneratedAPI = ${generated.toString()}`
}