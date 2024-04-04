const invalidCharacters = ['[', '/', '\\', ']', '-', ':', '.', '+', '(', ')', ' ']

const regex = new RegExp(invalidCharacters.map(m => '\\' + m).join('|'), 'g')

export const variablize = (name: string) => name.replaceAll(regex, '_')
