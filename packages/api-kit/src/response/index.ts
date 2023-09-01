import { KitResponseOptions, response } from '../http'
import type * as T from './types'
import { ToJSON } from '../types/json'
import { UnknownRecord } from '../types/utility'


/* eslint-disable max-len */

// *
// * -- 1xx Informational
// *

export const Continue = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 100 }) as T.Continue<ToJSON<B>>

export const SwitchingProtocols = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 101 }) as T.SwitchingProtocols<ToJSON<B>>

export const Processing = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 102 }) as T.Processing<ToJSON<B>>

export const EarlyHints = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 103 }) as T.EarlyHints<ToJSON<B>>

// *
// * -- 2xx Success
// *

export const Ok = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 200 }) as T.Ok<ToJSON<B>>

export const Created = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 201 }) as T.Created<ToJSON<B>>

export const Accepted = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 202 }) as T.Accepted<ToJSON<B>>

export const NonAuthoritativeInformation = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 203 }) as T.NonAuthoritativeInformation<ToJSON<B>>

export const NoContent = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 204 }) as T.NoContent<ToJSON<B>>

export const ResetContent = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 205 }) as T.ResetContent<ToJSON<B>>

export const PartialContent = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 206 }) as T.PartialContent<ToJSON<B>>

export const MultiStatus = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 207 }) as T.MultiStatus<ToJSON<B>>

export const AlreadyReported = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 208 }) as T.AlreadyReported<ToJSON<B>>

export const IMUsed = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 226 }) as T.IMUsed<ToJSON<B>>

// *
// * -- 3xx Redirection
// *

export const MultipleChoices = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 300 }) as T.MultipleChoices<ToJSON<B>>

export const MovedPermanently = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 301 }) as T.MovedPermanently<ToJSON<B>>

export const Found = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 302 }) as T.Found<ToJSON<B>>

export const SeeOther = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 303 }) as T.SeeOther<ToJSON<B>>

export const NotModified = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 304 }) as T.NotModified<ToJSON<B>>

export const TemporaryRedirect = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 307 }) as T.TemporaryRedirect<ToJSON<B>>

export const PermanentRedirect = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 308 }) as T.PermanentRedirect<ToJSON<B>>

// *
// * -- 4xx Client errors
// *

export const BadRequest = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 400 }) as T.BadRequest<ToJSON<B>>

export const Unauthorized = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 401 }) as T.Unauthorized<ToJSON<B>>

export const PaymentRequired = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 402 }) as T.PaymentRequired<ToJSON<B>>

export const Forbidden = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 403 }) as T.Forbidden<ToJSON<B>>

export const NotFound = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 404 }) as T.NotFound<ToJSON<B>>

export const MethodNotAllowed = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 405 }) as T.MethodNotAllowed<ToJSON<B>>

export const NotAcceptable = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 406 }) as T.NotAcceptable<ToJSON<B>>

export const ProxyAuthenticationRequired = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 407 }) as T.ProxyAuthenticationRequired<ToJSON<B>>

export const RequestTimeout = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 408 }) as T.RequestTimeout<ToJSON<B>>

export const Conflict = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 409 }) as T.Conflict<ToJSON<B>>

export const Gone = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 410 }) as T.Gone<ToJSON<B>>

export const LengthRequired = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 411 }) as T.LengthRequired<ToJSON<B>>

export const PreconditionFailed = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 412 }) as T.PreconditionFailed<ToJSON<B>>

export const PayloadTooLarge = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 413 }) as T.PayloadTooLarge<ToJSON<B>>

export const URITooLong = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 414 }) as T.URITooLong<ToJSON<B>>

export const UnsupportedMediaType = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 415 }) as T.UnsupportedMediaType<ToJSON<B>>

export const RangeNotSatisfiable = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 416 }) as T.RangeNotSatisfiable<ToJSON<B>>

export const ExpectationFailed = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 417 }) as T.ExpectationFailed<ToJSON<B>>

export const ImATeapot = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 418 }) as T.ImATeapot<ToJSON<B>>

export const MisdirectedRequest = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 421 }) as T.MisdirectedRequest<ToJSON<B>>

export const UnprocessableEntity = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 422 }) as T.UnprocessableEntity<ToJSON<B>>

export const Locked = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 423 }) as T.Locked<ToJSON<B>>

export const FailedDependency = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 424 }) as T.FailedDependency<ToJSON<B>>

export const TooEarly = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 425 }) as T.TooEarly<ToJSON<B>>

export const UpgradeRequired = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 426 }) as T.UpgradeRequired<ToJSON<B>>

export const PreconditionRequired = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 428 }) as T.PreconditionRequired<ToJSON<B>>

export const TooManyRequests = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 429 }) as T.TooManyRequests<ToJSON<B>>

export const RequestHeaderFieldsTooLarge = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 431 }) as T.RequestHeaderFieldsTooLarge<ToJSON<B>>

export const UnavailableForLegalReasons = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 451 }) as T.UnavailableForLegalReasons<ToJSON<B>>

// *
// * -- 5xx Server errors
// *

export const InternalServerError = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 500 }) as T.InternalServerError<ToJSON<B>>

export const NotImplemented = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 501 }) as T.NotImplemented<ToJSON<B>>

export const BadGateway = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 502 }) as T.BadGateway<ToJSON<B>>

export const ServiceUnavailable = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 503 }) as T.ServiceUnavailable<ToJSON<B>>

export const GatewayTimeout = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 504 }) as T.GatewayTimeout<ToJSON<B>>

export const HTTPVersionNotSupported = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 505 }) as T.HTTPVersionNotSupported<ToJSON<B>>

export const VariantAlsoNegotiates = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 506 }) as T.VariantAlsoNegotiates<ToJSON<B>>

export const InsufficientStorage = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 507 }) as T.InsufficientStorage<ToJSON<B>>

export const LoopDetected = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 508 }) as T.LoopDetected<ToJSON<B>>

export const NotExtended = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 510 }) as T.NotExtended<ToJSON<B>>

export const NetworkAuthenticationRequired = <const B extends UnknownRecord>(body?: B, opts: KitResponseOptions = {}) => 
	response(body, { ...opts, status: 511 }) as T.NetworkAuthenticationRequired<ToJSON<B>>
