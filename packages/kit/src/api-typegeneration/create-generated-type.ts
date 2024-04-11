import { Dirent } from 'fs'
import { variablize } from './variablize'
import { readdirSync } from 'fs'

interface Typer {
	name?: string
	file?: Typer
	content?: Typer[]
	toString(): string | undefined
}

const defaultDirectory = (name?: string, indent: string = '') => ({
	name,
	content: [],
	toString() {
		let str = ''
		if (this.name) str += `\n${indent}'${this.name}': `
		str += `${this.file ? this.file.toString() : ''}{ ${stringContent(this)} \n${indent}}`
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
				return `\n${indent}'${slug}$': ((${slug}: string) => ${this.file ? this.file.toString() : ''}{ ${stringContent(this)} \n${indent}})`
			}
		}
		if (endpoint) {
			const i = `i${imports.length}` as const
			imports.push(`import * as ${i} from '${endpoint.path.replace(/\.ts$/, '')}'`)
			type.toString = function (this: Typer) {
				return `A<typeof ${i}> & `
			}
		}
	}

	const generated = defaultDirectory()

	async function readFiles(dir: string, type: Typer, indent = '') {
		indent += '\t'

		const files = readdirSync(dir, { withFileTypes: true })
		for (const file of files) {
			file.path = dir + '/' + file.name
			if (file.isDirectory()) {
				if (file.name.startsWith('(') && file.name.endsWith(')')) {
					await readFiles(file.path, type, indent.replace('\t', ''))
					continue
				}
					
				const t = defaultDirectory(file.name, indent)
				type.content!.push(t)
				await handleType(t, [file, null], indent)
				await readFiles(file.path, t, indent)
				continue
			}
			if (!file.name.startsWith('+server'))
				continue
			const t = { toString() { } } as Typer
			type.file = t
			await handleType(t, [null, file], indent)
		}
	}

	await readFiles(rootDir, generated)
	return `/* eslint-disable */

// * This file is generative. Edits will be overwritten.

import type { ServerAPIEKit as A } from '@apie/kit/api'
${imports.join('\n')}

export type GeneratedAPI = ${generated.toString()}`
}