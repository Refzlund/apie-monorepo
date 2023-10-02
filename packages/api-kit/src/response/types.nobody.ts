import { KitResponse } from './kitresponse'



// *
// * -- 1xx Informational
// *

export type Continue = KitResponse<100, true, undefined, 'Continue'>
export type SwitchingProtocols = KitResponse<101, true, undefined, 'SwitchingProtocols'>
export type Processing = KitResponse<102, true, undefined, 'Processing'>
export type EarlyHints = KitResponse<103, true, undefined, 'EarlyHints'>




// *
// * -- 2xx Success
// *

export type OK = KitResponse<200, true, undefined, 'OK'>
export type Created = KitResponse<201, true, undefined, 'Created'>
export type Accepted = KitResponse<202, true, undefined, 'Accepted'>
export type NonAuthoritativeInformation = KitResponse<203, true, undefined, 'NonAuthoritativeInformation'>
export type NoContent = KitResponse<204, false, undefined, 'NoContent'>
export type ResetContent = KitResponse<205, true, undefined, 'ResetContent'>
export type PartialContent = KitResponse<206, true, undefined, 'PartialContent'>
export type MultiStatus = KitResponse<207, true, undefined, 'MultiStatus'>
export type AlreadyReported = KitResponse<208, true, undefined, 'AlreadyReported'>
export type IMUsed = KitResponse<226, true, undefined, 'IMUsed'>





// *
// * -- 3xx Redirection
// *

export type MultipleChoices = KitResponse<300, true, undefined, 'MultipleChoices'>
export type MovedPermanently = KitResponse<301, true, undefined, 'MovedPermanently'>
export type Found = KitResponse<302, true, undefined, 'Found'>
export type SeeOther = KitResponse<303, true, undefined, 'SeeOther'>
export type NotModified = KitResponse<304, false, undefined, 'NotModified'>
export type TemporaryRedirect = KitResponse<307, true, undefined, 'TemporaryRedirect'>
export type PermanentRedirect = KitResponse<308, true, undefined, 'PermanentRedirect'>




// *
// * -- 4xx Client Error
// *

export type BadRequest = KitResponse<400, false, undefined, 'BadRequest'>
export type Unauthorized = KitResponse<401, false, undefined, 'Unauthorized'>
export type PaymentRequired = KitResponse<402, false, undefined, 'PaymentRequired'>
export type Forbidden = KitResponse<403, false, undefined, 'Forbidden'>
export type NotFound = KitResponse<404, false, undefined, 'NotFound'>
export type MethodNotAllowed = KitResponse<405, false, undefined, 'MethodNotAllowed'>
export type NotAcceptable = KitResponse<406, false, undefined, 'NotAcceptable'>
export type ProxyAuthenticationRequired = KitResponse<407, false, undefined, 'ProxyAuthenticationRequired'>
export type RequestTimeout = KitResponse<408, false, undefined, 'RequestTimeout'>
export type Conflict = KitResponse<409, false, undefined, 'Conflict'>
export type Gone = KitResponse<410, false, undefined, 'Gone'>
export type LengthRequired = KitResponse<411, false, undefined, 'LengthRequired'>
export type PreconditionFailed = KitResponse<412, false, undefined, 'PreconditionFailed'>
export type PayloadTooLarge = KitResponse<413, false, undefined, 'PayloadTooLarge'>
export type URITooLong = KitResponse<414, false, undefined, 'URITooLong'>
export type UnsupportedMediaType = KitResponse<415, false, undefined, 'UnsupportedMediaType'>
export type RangeNotSatisfiable = KitResponse<416, false, undefined, 'RangeNotSatisfiable'>
export type ExpectationFailed = KitResponse<417, false, undefined, 'ExpectationFailed'>
export type ImATeapot = KitResponse<418, false, undefined, 'ImATeapot'>
export type MisdirectedRequest = KitResponse<421, false, undefined, 'MisdirectedRequest'>
export type UnprocessableEntity = KitResponse<422, false, undefined, 'UnprocessableEntity'>
export type Locked = KitResponse<423, false, undefined, 'Locked'>
export type FailedDependency = KitResponse<424, false, undefined, 'FailedDependency'>
export type TooEarly = KitResponse<425, false, undefined, 'TooEarly'>
export type UpgradeRequired = KitResponse<426, false, undefined, 'UpgradeRequired'>
export type PreconditionRequired = KitResponse<428, false, undefined, 'PreconditionRequired'>
export type TooManyRequests = KitResponse<429, false, undefined, 'TooManyRequests'>
export type RequestHeaderFieldsTooLarge = KitResponse<431, false, undefined, 'RequestHeaderFieldsTooLarge'>
export type UnavailableForLegalReasons = KitResponse<451, false, undefined, 'UnavailableForLegalReasons'>





// *
// * 5xx Server Error
// *

export type InternalServerError = KitResponse<500, false, undefined, 'InternalServerError'>
export type NotImplemented = KitResponse<501, false, undefined, 'NotImplemented'>
export type BadGateway = KitResponse<502, false, undefined, 'BadGateway'>
export type ServiceUnavailable = KitResponse<503, false, undefined, 'ServiceUnavailable'>
export type GatewayTimeout = KitResponse<504, false, undefined, 'GatewayTimeout'>
export type HTTPVersionNotSupported = KitResponse<505, false, undefined, 'HTTPVersionNotSupported'>
export type VariantAlsoNegotiates = KitResponse<506, false, undefined, 'VariantAlsoNegotiates'>
export type InsufficientStorage = KitResponse<507, false, undefined, 'InsufficientStorage'>
export type LoopDetected = KitResponse<508, false, undefined, 'LoopDetected'>
export type NotExtended = KitResponse<510, false, undefined, 'NotExtended'>
export type NetworkAuthenticationRequired = KitResponse<511, false, undefined, 'NetworkAuthenticationRequired'>