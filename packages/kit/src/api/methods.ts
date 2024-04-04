export const methods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'TRACE'] as const
export type Method = typeof methods[number]
export const nobodyMethods = ['GET', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE'] as const
export type NobodyMethod = typeof nobodyMethods[number]