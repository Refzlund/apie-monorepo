import { KitResponse } from './kitresponse'



// *
// * -- 1xx Informational
// *

type Informational = 'informational' | 'any'

export type Continue<Body = undefined> = KitResponse<100, true, Body, Informational | 'Continue'>
export type SwitchingProtocols<Body = undefined> = KitResponse<101, true, Body, Informational | 'SwitchingProtocols'>
export type Processing<Body = undefined> = KitResponse<102, true, Body, Informational | 'Processing'>
export type EarlyHints<Body = undefined> = KitResponse<103, true, Body, Informational | 'EarlyHints'>




// *
// * -- 2xx Success
// *

type Success = 'success' | 'any'

export type OK<Body = undefined> = KitResponse<200, true, Body, Success | 'OK'>
export type Created<Body = undefined> = KitResponse<201, true, Body, Success | 'Created'>
export type Accepted<Body = undefined> = KitResponse<202, true, Body, Success | 'Accepted'>
export type NonAuthoritativeInformation<Body = undefined> = KitResponse<203, true, Body, Success | 'NonAuthoritativeInformation'>
export type NoContent<Body = undefined> = KitResponse<204, false, Body, Success | 'NoContent'>
export type ResetContent<Body = undefined> = KitResponse<205, true, Body, Success | 'ResetContent'>
export type PartialContent<Body = undefined> = KitResponse<206, true, Body, Success | 'PartialContent'>
export type MultiStatus<Body = undefined> = KitResponse<207, true, Body, Success | 'MultiStatus'>
export type AlreadyReported<Body = undefined> = KitResponse<208, true, Body, Success | 'AlreadyReported'>
export type IMUsed<Body = undefined> = KitResponse<226, true, Body, Success | 'IMUsed'>




// *
// * -- 3xx Redirect
// *

type Redirect = 'redirect' | 'any'

export type MultipleChoices<Body = undefined> = KitResponse<300, true, Body, Redirect | 'MultipleChoices'>
export type MovedPermanently<Body = undefined> = KitResponse<301, true, Body, Redirect | 'MovedPermanently'>
export type Found<Body = undefined> = KitResponse<302, true, Body, Redirect | 'Found'>
export type SeeOther<Body = undefined> = KitResponse<303, true, Body, Redirect | 'SeeOther'>
export type NotModified<Body = undefined> = KitResponse<304, false, Body, Redirect | 'NotModified'>
export type TemporaryRedirect<Body = undefined> = KitResponse<307, true, Body, Redirect | 'TemporaryRedirect'>
export type PermanentRedirect<Body = undefined> = KitResponse<308, true, Body, Redirect | 'PermanentRedirect'>




// *
// * -- 4xx Client Error
// *

type ClientError = 'clientError' | 'error' | 'any'

export type BadRequest<Body = undefined> = KitResponse<400, false, Body, ClientError | 'BadRequest'>
export type Unauthorized<Body = undefined> = KitResponse<401, false, Body, ClientError | 'Unauthorized'>
export type PaymentRequired<Body = undefined> = KitResponse<402, false, Body, ClientError | 'PaymentRequired'>
export type Forbidden<Body = undefined> = KitResponse<403, false, Body, ClientError | 'Forbidden'>
export type NotFound<Body = undefined> = KitResponse<404, false, Body, ClientError | 'NotFound'>
export type MethodNotAllowed<Body = undefined> = KitResponse<405, false, Body, ClientError | 'MethodNotAllowed'>
export type NotAcceptable<Body = undefined> = KitResponse<406, false, Body, ClientError | 'NotAcceptable'>
export type ProxyAuthenticationRequired<Body = undefined> = KitResponse<407, false, Body, ClientError | 'ProxyAuthenticationRequired'>
export type RequestTimeout<Body = undefined> = KitResponse<408, false, Body, ClientError | 'RequestTimeout'>
export type Conflict<Body = undefined> = KitResponse<409, false, Body, ClientError | 'Conflict'>
export type Gone<Body = undefined> = KitResponse<410, false, Body, ClientError | 'Gone'>
export type LengthRequired<Body = undefined> = KitResponse<411, false, Body, ClientError | 'LengthRequired'>
export type PreconditionFailed<Body = undefined> = KitResponse<412, false, Body, ClientError | 'PreconditionFailed'>
export type PayloadTooLarge<Body = undefined> = KitResponse<413, false, Body, ClientError | 'PayloadTooLarge'>
export type URITooLong<Body = undefined> = KitResponse<414, false, Body, ClientError | 'URITooLong'>
export type UnsupportedMediaType<Body = undefined> = KitResponse<415, false, Body, ClientError | 'UnsupportedMediaType'>
export type RangeNotSatisfiable<Body = undefined> = KitResponse<416, false, Body, ClientError | 'RangeNotSatisfiable'>
export type ExpectationFailed<Body = undefined> = KitResponse<417, false, Body, ClientError | 'ExpectationFailed'>
export type ImATeapot<Body = undefined> = KitResponse<418, false, Body, ClientError | 'ImATeapot'>
export type MisdirectedRequest<Body = undefined> = KitResponse<421, false, Body, ClientError | 'MisdirectedRequest'>
export type UnprocessableEntity<Body = undefined> = KitResponse<422, false, Body, ClientError | 'UnprocessableEntity'>
export type Locked<Body = undefined> = KitResponse<423, false, Body, ClientError | 'Locked'>
export type FailedDependency<Body = undefined> = KitResponse<424, false, Body, ClientError | 'FailedDependency'>
export type TooEarly<Body = undefined> = KitResponse<425, false, Body, ClientError | 'TooEarly'>
export type UpgradeRequired<Body = undefined> = KitResponse<426, false, Body, ClientError | 'UpgradeRequired'>
export type PreconditionRequired<Body = undefined> = KitResponse<428, false, Body, ClientError | 'PreconditionRequired'>
export type TooManyRequests<Body = undefined> = KitResponse<429, false, Body, ClientError | 'TooManyRequests'>
export type RequestHeaderFieldsTooLarge<Body = undefined> = KitResponse<431, false, Body, ClientError | 'RequestHeaderFieldsTooLarge'>
export type UnavailableForLegalReasons<Body = undefined> = KitResponse<451, false, Body, ClientError | 'UnavailableForLegalReasons'>




// *
// * 5xx Server Error
// *

type ServerError = 'serverError' | 'error' | 'any'

export type InternalServerError<Body = undefined> = KitResponse<500, false, Body, ServerError | 'InternalServerError'>
export type NotImplemented<Body = undefined> = KitResponse<501, false, Body, ServerError | 'NotImplemented'>
export type BadGateway<Body = undefined> = KitResponse<502, false, Body, ServerError | 'BadGateway'>
export type ServiceUnavailable<Body = undefined> = KitResponse<503, false, Body, ServerError | 'ServiceUnavailable'>
export type GatewayTimeout<Body = undefined> = KitResponse<504, false, Body, ServerError | 'GatewayTimeout'>
export type HTTPVersionNotSupported<Body = undefined> = KitResponse<505, false, Body, ServerError | 'HTTPVersionNotSupported'>
export type VariantAlsoNegotiates<Body = undefined> = KitResponse<506, false, Body, ServerError | 'VariantAlsoNegotiates'>
export type InsufficientStorage<Body = undefined> = KitResponse<507, false, Body, ServerError | 'InsufficientStorage'>
export type LoopDetected<Body = undefined> = KitResponse<508, false, Body, ServerError | 'LoopDetected'>
export type NotExtended<Body = undefined> = KitResponse<510, false, Body, ServerError | 'NotExtended'>
export type NetworkAuthenticationRequired<Body = undefined> = KitResponse<511, false, Body, ServerError | 'NetworkAuthenticationRequired'>