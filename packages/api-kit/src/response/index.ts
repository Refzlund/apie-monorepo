import { DeepWriteable } from '../types/utility'
import { KitResponseOptions, response } from '../http'
import type * as T from './types'


/* eslint-disable max-len */

// *
// * -- 1xx Informational
// *

export const Continue = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 100 }) as T.Continue<DeepWriteable<B>>

export const SwitchingProtocols = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 101 }) as T.SwitchingProtocols<DeepWriteable<B>>

export const Processing = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 102 }) as T.Processing<DeepWriteable<B>>

export const EarlyHints = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 103 }) as T.EarlyHints<DeepWriteable<B>>

// *
// * -- 2xx Success
// *

export const Ok = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 200 }) as T.Ok<DeepWriteable<B>>

export const Created = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 201 }) as T.Created<DeepWriteable<B>>

export const Accepted = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 202 }) as T.Accepted<DeepWriteable<B>>

export const NonAuthoritativeInformation = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 203 }) as T.NonAuthoritativeInformation<DeepWriteable<B>>

export const NoContent = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 204 }) as T.NoContent<DeepWriteable<B>>

export const ResetContent = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 205 }) as T.ResetContent<DeepWriteable<B>>

export const PartialContent = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 206 }) as T.PartialContent<DeepWriteable<B>>

export const MultiStatus = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 207 }) as T.MultiStatus<DeepWriteable<B>>

export const AlreadyReported = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 208 }) as T.AlreadyReported<DeepWriteable<B>>

export const IMUsed = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 226 }) as T.IMUsed<DeepWriteable<B>>

// *
// * -- 3xx Redirection
// *

export const MultipleChoices = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 300 }) as T.MultipleChoices<DeepWriteable<B>>

export const MovedPermanently = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 301 }) as T.MovedPermanently<DeepWriteable<B>>

export const Found = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 302 }) as T.Found<DeepWriteable<B>>

export const SeeOther = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 303 }) as T.SeeOther<DeepWriteable<B>>

export const NotModified = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 304 }) as T.NotModified<DeepWriteable<B>>

export const TemporaryRedirect = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 307 }) as T.TemporaryRedirect<DeepWriteable<B>>

export const PermanentRedirect = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 308 }) as T.PermanentRedirect<DeepWriteable<B>>

// *
// * -- 4xx Client errors
// *

export const BadRequest = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 400 }) as T.BadRequest<DeepWriteable<B>>

export const Unauthorized = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 401 }) as T.Unauthorized<DeepWriteable<B>>

export const PaymentRequired = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 402 }) as T.PaymentRequired<DeepWriteable<B>>

export const Forbidden = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 403 }) as T.Forbidden<DeepWriteable<B>>

export const NotFound = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 404 }) as T.NotFound<DeepWriteable<B>>

export const MethodNotAllowed = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 405 }) as T.MethodNotAllowed<DeepWriteable<B>>

export const NotAcceptable = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 406 }) as T.NotAcceptable<DeepWriteable<B>>

export const ProxyAuthenticationRequired = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 407 }) as T.ProxyAuthenticationRequired<DeepWriteable<B>>

export const RequestTimeout = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 408 }) as T.RequestTimeout<DeepWriteable<B>>

export const Conflict = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 409 }) as T.Conflict<DeepWriteable<B>>

export const Gone = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 410 }) as T.Gone<DeepWriteable<B>>

export const LengthRequired = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 411 }) as T.LengthRequired<DeepWriteable<B>>

export const PreconditionFailed = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 412 }) as T.PreconditionFailed<DeepWriteable<B>>

export const PayloadTooLarge = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 413 }) as T.PayloadTooLarge<DeepWriteable<B>>

export const URITooLong = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 414 }) as T.URITooLong<DeepWriteable<B>>

export const UnsupportedMediaType = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 415 }) as T.UnsupportedMediaType<DeepWriteable<B>>

export const RangeNotSatisfiable = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 416 }) as T.RangeNotSatisfiable<DeepWriteable<B>>

export const ExpectationFailed = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 417 }) as T.ExpectationFailed<DeepWriteable<B>>

export const ImATeapot = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 418 }) as T.ImATeapot<DeepWriteable<B>>

export const MisdirectedRequest = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 421 }) as T.MisdirectedRequest<DeepWriteable<B>>

export const UnprocessableEntity = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 422 }) as T.UnprocessableEntity<DeepWriteable<B>>

export const Locked = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 423 }) as T.Locked<DeepWriteable<B>>

export const FailedDependency = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 424 }) as T.FailedDependency<DeepWriteable<B>>

export const TooEarly = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 425 }) as T.TooEarly<DeepWriteable<B>>

export const UpgradeRequired = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 426 }) as T.UpgradeRequired<DeepWriteable<B>>

export const PreconditionRequired = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 428 }) as T.PreconditionRequired<DeepWriteable<B>>

export const TooManyRequests = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 429 }) as T.TooManyRequests<DeepWriteable<B>>

export const RequestHeaderFieldsTooLarge = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 431 }) as T.RequestHeaderFieldsTooLarge<DeepWriteable<B>>

export const UnavailableForLegalReasons = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 451 }) as T.UnavailableForLegalReasons<DeepWriteable<B>>

// *
// * -- 5xx Server errors
// *

export const InternalServerError = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 500 }) as T.InternalServerError<DeepWriteable<B>>

export const NotImplemented = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 501 }) as T.NotImplemented<DeepWriteable<B>>

export const BadGateway = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 502 }) as T.BadGateway<DeepWriteable<B>>

export const ServiceUnavailable = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 503 }) as T.ServiceUnavailable<DeepWriteable<B>>

export const GatewayTimeout = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 504 }) as T.GatewayTimeout<DeepWriteable<B>>

export const HTTPVersionNotSupported = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 505 }) as T.HTTPVersionNotSupported<DeepWriteable<B>>

export const VariantAlsoNegotiates = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 506 }) as T.VariantAlsoNegotiates<DeepWriteable<B>>

export const InsufficientStorage = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 507 }) as T.InsufficientStorage<DeepWriteable<B>>

export const LoopDetected = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 508 }) as T.LoopDetected<DeepWriteable<B>>

export const NotExtended = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 510 }) as T.NotExtended<DeepWriteable<B>>

export const NetworkAuthenticationRequired = <const B>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 511 }) as T.NetworkAuthenticationRequired<DeepWriteable<B>>
