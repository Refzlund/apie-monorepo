import { KitResponse } from './kitresponse'



// *
// * -- 1xx Informational
// *

export type Continue<Body = undefined> = KitResponse<100, true, Body, 'Continue'>
export type SwitchingProtocols<Body = undefined> = KitResponse<101, true, Body, 'SwitchingProtocols'>
export type Processing<Body = undefined> = KitResponse<102, true, Body, 'Processing'>
export type EarlyHints<Body = undefined> = KitResponse<103, true, Body, 'EarlyHints'>




// *
// * -- 2xx Success
// *

export type OK<Body = undefined> = KitResponse<200, true, Body, 'OK'>
export type Created<Body = undefined> = KitResponse<201, true, Body, 'Created'>
export type Accepted<Body = undefined> = KitResponse<202, true, Body, 'Accepted'>
export type NonAuthoritativeInformation<Body = undefined> = KitResponse<203, true, Body, 'NonAuthoritativeInformation'>
export type NoContent<Body = undefined> = KitResponse<204, false, Body, 'NoContent'>
export type ResetContent<Body = undefined> = KitResponse<205, true, Body, 'ResetContent'>
export type PartialContent<Body = undefined> = KitResponse<206, true, Body, 'PartialContent'>
export type MultiStatus<Body = undefined> = KitResponse<207, true, Body, 'MultiStatus'>
export type AlreadyReported<Body = undefined> = KitResponse<208, true, Body, 'AlreadyReported'>
export type IMUsed<Body = undefined> = KitResponse<226, true, Body, 'IMUsed'>





// *
// * -- 3xx Redirection
// *

export type MultipleChoices<Body = undefined> = KitResponse<300, true, Body, 'MultipleChoices'>
export type MovedPermanently<Body = undefined> = KitResponse<301, true, Body, 'MovedPermanently'>
export type Found<Body = undefined> = KitResponse<302, true, Body, 'Found'>
export type SeeOther<Body = undefined> = KitResponse<303, true, Body, 'SeeOther'>
export type NotModified<Body = undefined> = KitResponse<304, false, Body, 'NotModified'>
export type TemporaryRedirect<Body = undefined> = KitResponse<307, true, Body, 'TemporaryRedirect'>
export type PermanentRedirect<Body = undefined> = KitResponse<308, true, Body, 'PermanentRedirect'>




// *
// * -- 4xx Client Error
// *

export type BadRequest<Body = undefined> = KitResponse<400, false, Body, 'BadRequest'>
export type Unauthorized<Body = undefined> = KitResponse<401, false, Body, 'Unauthorized'>
export type PaymentRequired<Body = undefined> = KitResponse<402, false, Body, 'PaymentRequired'>
export type Forbidden<Body = undefined> = KitResponse<403, false, Body, 'Forbidden'>
export type NotFound<Body = undefined> = KitResponse<404, false, Body, 'NotFound'>
export type MethodNotAllowed<Body = undefined> = KitResponse<405, false, Body, 'MethodNotAllowed'>
export type NotAcceptable<Body = undefined> = KitResponse<406, false, Body, 'NotAcceptable'>
export type ProxyAuthenticationRequired<Body = undefined> = KitResponse<407, false, Body, 'ProxyAuthenticationRequired'>
export type RequestTimeout<Body = undefined> = KitResponse<408, false, Body, 'RequestTimeout'>
export type Conflict<Body = undefined> = KitResponse<409, false, Body, 'Conflict'>
export type Gone<Body = undefined> = KitResponse<410, false, Body, 'Gone'>
export type LengthRequired<Body = undefined> = KitResponse<411, false, Body, 'LengthRequired'>
export type PreconditionFailed<Body = undefined> = KitResponse<412, false, Body, 'PreconditionFailed'>
export type PayloadTooLarge<Body = undefined> = KitResponse<413, false, Body, 'PayloadTooLarge'>
export type URITooLong<Body = undefined> = KitResponse<414, false, Body, 'URITooLong'>
export type UnsupportedMediaType<Body = undefined> = KitResponse<415, false, Body, 'UnsupportedMediaType'>
export type RangeNotSatisfiable<Body = undefined> = KitResponse<416, false, Body, 'RangeNotSatisfiable'>
export type ExpectationFailed<Body = undefined> = KitResponse<417, false, Body, 'ExpectationFailed'>
export type ImATeapot<Body = undefined> = KitResponse<418, false, Body, 'ImATeapot'>
export type MisdirectedRequest<Body = undefined> = KitResponse<421, false, Body, 'MisdirectedRequest'>
export type UnprocessableEntity<Body = undefined> = KitResponse<422, false, Body, 'UnprocessableEntity'>
export type Locked<Body = undefined> = KitResponse<423, false, Body, 'Locked'>
export type FailedDependency<Body = undefined> = KitResponse<424, false, Body, 'FailedDependency'>
export type TooEarly<Body = undefined> = KitResponse<425, false, Body, 'TooEarly'>
export type UpgradeRequired<Body = undefined> = KitResponse<426, false, Body, 'UpgradeRequired'>
export type PreconditionRequired<Body = undefined> = KitResponse<428, false, Body, 'PreconditionRequired'>
export type TooManyRequests<Body = undefined> = KitResponse<429, false, Body, 'TooManyRequests'>
export type RequestHeaderFieldsTooLarge<Body = undefined> = KitResponse<431, false, Body, 'RequestHeaderFieldsTooLarge'>
export type UnavailableForLegalReasons<Body = undefined> = KitResponse<451, false, Body, 'UnavailableForLegalReasons'>





// *
// * 5xx Server Error
// *

export type InternalServerError<Body = undefined> = KitResponse<500, false, Body, 'InternalServerError'>
export type NotImplemented<Body = undefined> = KitResponse<501, false, Body, 'NotImplemented'>
export type BadGateway<Body = undefined> = KitResponse<502, false, Body, 'BadGateway'>
export type ServiceUnavailable<Body = undefined> = KitResponse<503, false, Body, 'ServiceUnavailable'>
export type GatewayTimeout<Body = undefined> = KitResponse<504, false, Body, 'GatewayTimeout'>
export type HTTPVersionNotSupported<Body = undefined> = KitResponse<505, false, Body, 'HTTPVersionNotSupported'>
export type VariantAlsoNegotiates<Body = undefined> = KitResponse<506, false, Body, 'VariantAlsoNegotiates'>
export type InsufficientStorage<Body = undefined> = KitResponse<507, false, Body, 'InsufficientStorage'>
export type LoopDetected<Body = undefined> = KitResponse<508, false, Body, 'LoopDetected'>
export type NotExtended<Body = undefined> = KitResponse<510, false, Body, 'NotExtended'>
export type NetworkAuthenticationRequired<Body = undefined> = KitResponse<511, false, Body, 'NetworkAuthenticationRequired'>