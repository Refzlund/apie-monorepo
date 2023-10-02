import { KitResponseOptions, ResponseBody, kitResponse } from './kitresponse'
import type * as T from './types'
import type * as U from './types.nobody'
import { ToJSON } from '../types/json'



/* eslint-disable max-len */

// *
// * -- 1xx Informational
// *

/** 
	[100 Continue](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100) 
	— indicates that everything so far is OK and that the client 
	should continue with the request or ignore it if it is already finished.
*/
export const Continue = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 100, statusText: 'Continue' }) as B extends undefined ? U.Continue : T.Continue<ToJSON<B>>

/**
	[101 Switching Protocols](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101)
	— indicates a protocol to which the server switches. The protocol is specified in the
	[Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) request header received from a client.
*/
export const SwitchingProtocols = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 101, statusText: 'SwitchingProtocols' }) as B extends undefined ? U.SwitchingProtocols : T.SwitchingProtocols<ToJSON<B>>

/**
	[102 Processing](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-102-status-code/)
	— An interim response used to inform the client that the
	server has accepted the complete request but has not yet completed it.
*/
export const Processing = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 102, statusText: 'Processing' }) as B extends undefined ? U.Processing : T.Processing<ToJSON<B>>

/**
	[103 Early Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103)
	— is primarily intended to be used with the
	[Link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link)
	header to allow the user agent to start preloading 
	resources while the server is still preparing a response.
*/
export const EarlyHints = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 103, statusText: 'EarlyHints' }) as B extends undefined ? U.EarlyHints : T.EarlyHints<ToJSON<B>>

// *
// * -- 2xx Success
// *

/**
	[200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)
	— indicates that the request has succeeded. A 200 response is cacheable by default.
*/
export const OK = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 200, statusText: 'OK' }) as B extends undefined ? U.OK : T.OK<ToJSON<B>>

/**
	[201 Created](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201)
	— indicates that the request has succeeded and has led to the creation of a resource.
	The new resource is effectively created before this response is sent back and
	the new resource is returned in the body of the message, 
	its location being either the URL of the request,
	or the content of the [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) header.
*/
export const Created = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 201, statusText: 'Created' }) as B extends undefined ? U.Created : T.Created<ToJSON<B>>

/**
	[202 Accepted](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202)
	— indicates that the request has been accepted for processing, but the processing 
	has not been completed; in fact, processing may not have started yet.
	The request might or might not eventually be acted upon,
	as it might be disallowed when processing actually takes place.
*/
export const Accepted = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 202, statusText: 'Accepted' }) as B extends undefined ? U.Accepted : T.Accepted<ToJSON<B>>

/**
	[203 Non-Authoritative Information](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203)
	— indicates that the request was successful 
	but the enclosed payload has been modified by a transforming 
	[proxy](https://developer.mozilla.org/en-US/docs/Glossary/Proxy_server)
	from that of the origin server's [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) (OK) response.
*/
export const NonAuthoritativeInformation = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 203, statusText: 'NonAuthoritativeInformation' }) as B extends undefined ? U.NonAuthoritativeInformation : T.NonAuthoritativeInformation<ToJSON<B>>

/**
	[204 No Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204) 
	— indicates that a request has succeeded, 
	but that the client doesn't need to navigate away from its current page.
 */
export const NoContent = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 204, statusText: 'NoContent' }) as B extends undefined ? U.NoContent : T.NoContent<ToJSON<B>>

/**
	[205 Reset Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205)
	— tells the client to reset the document view, 
	so for example to clear the content of a form, 
	reset a canvas state, or to refresh the UI.
*/
export const ResetContent = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 205, statusText: 'ResetContent' }) as B extends undefined ? U.ResetContent : T.ResetContent<ToJSON<B>>

/**
	[206 Partial Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206)
	— indicates that the request has succeeded and the body contains the 
	requested ranges of data, as described in the Range header of the request.
*/
export const PartialContent = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 206, statusText: 'PartialContent' }) as B extends undefined ? U.PartialContent : T.PartialContent<ToJSON<B>>

/**
	[207 Mutli-Status](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-207-status-code/)
	— conveys information about multiple resources in situations 
	where multiple status codes might be appropriate.
*/
export const MultiStatus = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 207, statusText: 'MultiStatus' }) as B extends undefined ? U.MultiStatus : T.MultiStatus<ToJSON<B>>

/**
	[208 Already Reported](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-208-status-code/)
	— Used inside a DAV: propstat response element to avoid enumerating 
	the internal members of multiple bindings to the same collection repeatedly.
*/
export const AlreadyReported = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 208, statusText: 'AlreadyReported' }) as B extends undefined ? U.AlreadyReported : T.AlreadyReported<ToJSON<B>>

/**
	[226 IM Used](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-226-status-code/)
	— The server has fulfilled a GET request for the resource, 
	and the response is a representation of the result of one 
	or more instance-manipulations applied to the current instance.
*/
export const IMUsed = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 226, statusText: 'IMUsed' }) as B extends undefined ? U.IMUsed : T.IMUsed<ToJSON<B>>

// *
// * -- 3xx Redirection
// *

/**
	[300 Multiple Choices](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300)
	— indicates that the request has more than one possible responses.
	The user-agent or user should choose one of them.
	As there is no standardized way of choosing one of the responses,
	this response code is very rarely used.
*/
export const MultipleChoices = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 300, statusText: 'MultipleChoices' }) as B extends undefined ? U.MultipleChoices : T.MultipleChoices<ToJSON<B>>

/**
	[301 Moved Permanently](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
	— indicates that the resource has been moved permanently to a new location,
	and that future references should use a new URI with their requests.
*/
export const MovedPermanently = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 301, statusText: 'MovedPermanently' }) as B extends undefined ? U.MovedPermanently : T.MovedPermanently<ToJSON<B>>

/**
	[302 Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)
	— indicates that the resource has been moved temporarily to a different location,
	but that future references should still use the original URI to access the resource.
*/
export const Found = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 302, statusText: 'Found' }) as B extends undefined ? U.Found : T.Found<ToJSON<B>>

/**
	[303 See Other](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303)
	— indicates that the response to the request can be found under a different URI.
*/
export const SeeOther = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 303, statusText: 'SeeOther' }) as B extends undefined ? U.SeeOther : T.SeeOther<ToJSON<B>>

/**
	[304 Not Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304)
	— indicates that the request has not been modified since the last request.
*/
export const NotModified = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 304, statusText: 'NotModified' }) as B extends undefined ? U.NotModified : T.NotModified<ToJSON<B>>

/**
	[307 Temporary Redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307)
	— indicates that the resource is located temporarily under a different URI.
	Since the redirection might be altered on occasion, the client should
	continue to use the original effective request URI for future requests.
*/
export const TemporaryRedirect = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 307, statusText: 'TemporaryRedirect' }) as B extends undefined ? U.TemporaryRedirect : T.TemporaryRedirect<ToJSON<B>>

/**
	[308 Permanent Redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308)
	— indicates that the resource has been moved permanently to a new location,
	and that future references should use a new URI with their requests.
*/
export const PermanentRedirect = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 308, statusText: 'PermanentRedirect' }) as B extends undefined ? U.PermanentRedirect : T.PermanentRedirect<ToJSON<B>>

// *
// * -- 4xx Client errors
// *

/**
	[400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)
	— indicates that the server cannot or will not process the request due to an
	apparent client error.
*/
export const BadRequest = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 400, statusText: 'BadRequest' }) as B extends undefined ? U.BadRequest : T.BadRequest<ToJSON<B>>

/**
	[401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)
	— indicates that the request has not been applied because it lacks valid
	authentication credentials for the target resource.
*/
export const Unauthorized = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 401, statusText: 'Unauthorized' }) as B extends undefined ? U.Unauthorized : T.Unauthorized<ToJSON<B>>

/**
	[402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402)
	— is reserved for future use. The original intention was that this code might
	be used as part of some form of digital cash or micropayment scheme, but that
	has not happened, and this code is not usually used.
*/
export const PaymentRequired = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 402, statusText: 'PaymentRequired' }) as B extends undefined ? U.PaymentRequired : T.PaymentRequired<ToJSON<B>>

/**
	[403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)
	— indicates that the server understood the request but refuses to authorize it.
*/
export const Forbidden = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 403, statusText: 'Forbidden' }) as B extends undefined ? U.Forbidden : T.Forbidden<ToJSON<B>>

/**
	[404 Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
	— indicates that the origin server did not find a current representation for
	the target resource or is not willing to disclose that one exists.
*/
export const NotFound = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 404, statusText: 'NotFound' }) as B extends undefined ? U.NotFound : T.NotFound<ToJSON<B>>

/**
	[405 Method Not Allowed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405)
	— indicates that the method received in the request-line is known by the origin
	server but not supported by the target resource.
*/
export const MethodNotAllowed = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 405, statusText: 'MethodNotAllowed' }) as B extends undefined ? U.MethodNotAllowed : T.MethodNotAllowed<ToJSON<B>>

/**
	[406 Not Acceptable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406)
	— indicates that the server cannot produce a response matching the list of
	acceptable values defined in the request's proactive content negotiation
	headers, and that the server is unwilling to supply a default representation.
*/
export const NotAcceptable = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 406, statusText: 'NotAcceptable' }) as B extends undefined ? U.NotAcceptable : T.NotAcceptable<ToJSON<B>>

/**
	[407 Proxy Authentication Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407)
	— indicates that the client needs to authenticate itself in order to use a
	proxy.
*/
export const ProxyAuthenticationRequired = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 407, statusText: 'ProxyAuthenticationRequired' }) as B extends undefined ? U.ProxyAuthenticationRequired : T.ProxyAuthenticationRequired<ToJSON<B>>

/**
	[408 Request Timeout](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408)
	— indicates that the server did not receive a complete request message within
	the time that it was prepared to wait.
*/
export const RequestTimeout = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 408, statusText: 'RequestTimeout' }) as B extends undefined ? U.RequestTimeout : T.RequestTimeout<ToJSON<B>>

/**
	[409 Conflict](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409)
	— indicates that the request could not be completed due to a conflict with the
	current state of the target resource.
*/
export const Conflict = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 409, statusText: 'Conflict' }) as B extends undefined ? U.Conflict : T.Conflict<ToJSON<B>>

/**
	[410 Gone](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410)
	— indicates that access to the target resource is no longer available at the
	origin server and that this condition is likely to be permanent.
*/
export const Gone = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 410, statusText: 'Gone' }) as B extends undefined ? U.Gone : T.Gone<ToJSON<B>>

/** 
	[411 Length Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411) 
	— indicates that the server refuses to accept the request without a defined
	[Content-Length](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length).
*/
export const LengthRequired = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 411, statusText: 'LengthRequired' }) as B extends undefined ? U.LengthRequired : T.LengthRequired<ToJSON<B>>

/**
	[412 Precondition Failed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412) 
	— indicates that one or more conditions given in the request 
	header fields evaluated to false when tested on the server. 
*/
export const PreconditionFailed = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 412, statusText: 'PreconditionFailed' }) as B extends undefined ? U.PreconditionFailed : T.PreconditionFailed<ToJSON<B>>

/** 
	[413 Payload Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413) 
	— indicates that the server is refusing to process a request because 
	the request payload is larger than the server is willing or able to process. 
*/
export const PayloadTooLarge = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 413, statusText: 'PayloadTooLarge' }) as B extends undefined ? U.PayloadTooLarge : T.PayloadTooLarge<ToJSON<B>>

/** 
	[414 URI Too Long](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414) 
	— indicates that the server is refusing to service the request 
	because the request-target is longer than the server is willing to interpret.
*/
export const URITooLong = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 414, statusText: 'URITooLong' }) as B extends undefined ? U.URITooLong : T.URITooLong<ToJSON<B>>

/** 
	[415 Unsupported Media Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415) 
	— indicates that the origin server is refusing to service the request because 
	the payload is in a format not supported by this method on the target resource.
*/
export const UnsupportedMediaType = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 415, statusText: 'UnsupportedMediaType' }) as B extends undefined ? U.UnsupportedMediaType : T.UnsupportedMediaType<ToJSON<B>>

/**
	[416 Range Not Satisfiable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416) 
	— indicates that none of the ranges in the request's 
	[Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
	header field (Section 14.35 of [RFC7233](https://tools.ietf.org/html/rfc7233)) overlap the
	current extent of the selected resource or that the set of ranges requested has been 
	rejected due to invalid ranges or an excessive request of small or overlapping ranges
*/
export const RangeNotSatisfiable = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 416, statusText: 'RangeNotSatisfiable' }) as B extends undefined ? U.RangeNotSatisfiable : T.RangeNotSatisfiable<ToJSON<B>>

/** 	
	[417 Expectation Failed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417) 
	— indicates that the expectation given in the request's 
	[Expect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect) 
	header field (Section 5.1.1 of [RFC7231](https://tools.ietf.org/html/rfc7231)) 
	could not be met by at least one of the inbound servers. 
*/
export const ExpectationFailed = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 417, statusText: 'ExpectationFailed' }) as B extends undefined ? U.ExpectationFailed : T.ExpectationFailed<ToJSON<B>>

/** 
	[418 I'm a teapot](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) 
	— indicates that the server refuses to brew coffee because it is, permanently, 
	a teapot.  A combined coffee/tea pot that is temporarily 
	out of coffee should instead return 503. 
	This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April 
	Fools' jokes in 1998 and 2014. 
*/
export const ImATeapot = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 418, statusText: 'ImATeapot' }) as B extends undefined ? U.ImATeapot : T.ImATeapot<ToJSON<B>>

/** 
	[421 Misdirected Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421) 
	— indicates that the request was directed at a 
	server that is not able to produce a response. 
*/
export const MisdirectedRequest = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 421, statusText: 'MisdirectedRequest' }) as B extends undefined ? U.MisdirectedRequest : T.MisdirectedRequest<ToJSON<B>>

/** 	
	[422 Unprocessable Entity](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422) 
	— indicates that the server understands the content type of the request entity 
	(hence a [415] [Unsupported Media Type] status code is inappropriate), and the 
	syntax of the request entity is correct (thus a [400] [Bad Request] status code 
	is inappropriate) but was unable to process the contained instructions. 
*/
export const UnprocessableEntity = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 422, statusText: 'UnprocessableEntity' }) as B extends undefined ? U.UnprocessableEntity : T.UnprocessableEntity<ToJSON<B>>

/** 	
	[423 Locked](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423) 
	— indicates that the access to the target resource is denied. 
*/
export const Locked = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 423, statusText: 'Locked' }) as B extends undefined ? U.Locked : T.Locked<ToJSON<B>>

/**
	[424 Failed Dependency](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424) 
	— indicates that the method could not be performed on the resource because the 
	requested action depended on another action and that action failed. 
*/
export const FailedDependency = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 424, statusText: 'FailedDependency' }) as B extends undefined ? U.FailedDependency : T.FailedDependency<ToJSON<B>>

/**
	[425 Too Early](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425) 
	— indicates that the server is unwilling to risk processing a request that might 
	be replayed. 
*/
export const TooEarly = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 425, statusText: 'TooEarly' }) as B extends undefined ? U.TooEarly : T.TooEarly<ToJSON<B>>

/**
	[426 Upgrade Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426) 
	— indicates that the server refuses to perform the request using the current 
	protocol but might be willing to do so after the client upgrades to a different 
	protocol. The server sends an [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) 
	header field in a 426 response to indicate the required protocol(s). 
*/
export const UpgradeRequired = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 426, statusText: 'UpgradeRequired' }) as B extends undefined ? U.UpgradeRequired : T.UpgradeRequired<ToJSON<B>>

/**
	[428 Precondition Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428) 
	— indicates that the origin server requires the request to be conditional. 
*/
export const PreconditionRequired = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 428, statusText: 'PreconditionRequired' }) as B extends undefined ? U.PreconditionRequired : T.PreconditionRequired<ToJSON<B>>

/**
	[429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) 
	— indicates that the user has sent too many requests in a given amount of time 
	("rate limiting"). 
*/
export const TooManyRequests = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 429, statusText: 'TooManyRequests' }) as B extends undefined ? U.TooManyRequests : T.TooManyRequests<ToJSON<B>>

/**
	[431 Request Header Fields Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431) 
	— indicates that the server is unwilling to process the request because its 
	header fields are too large. The request may be resubmitted after reducing the 
	size of the request header fields. 
*/
export const RequestHeaderFieldsTooLarge = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 431, statusText: 'RequestHeaderFieldsTooLarge' }) as B extends undefined ? U.RequestHeaderFieldsTooLarge : T.RequestHeaderFieldsTooLarge<ToJSON<B>>

/** 
	[451 Unavailable For Legal Reasons](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451) 
	— indicates that the user requested a resource that is not available for legal 
	reasons, such as a web page censored by a government. 
*/
export const UnavailableForLegalReasons = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 451, statusText: 'UnavailableForLegalReasons' }) as B extends undefined ? U.UnavailableForLegalReasons : T.UnavailableForLegalReasons<ToJSON<B>>

// *
// * -- 5xx Server errors
// *

/**
	[500 Internal Server Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) 
	— indicates that the server encountered an unexpected condition that prevented 
	it from fulfilling the request. 
*/
export const InternalServerError = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 500, statusText: 'InternalServerError' }) as B extends undefined ? U.InternalServerError : T.InternalServerError<ToJSON<B>>

/**
	[501 Not Implemented](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501) 
	— indicates that the server does not support the functionality required to 
	fulfill the request. 
*/
export const NotImplemented = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 501, statusText: 'NotImplemented' }) as B extends undefined ? U.NotImplemented : T.NotImplemented<ToJSON<B>>

/**
	[502 Bad Gateway](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) 	
	— indicates that the server, while acting as a gateway or proxy, received an 
	invalid response from the upstream server it accessed in attempting to fulfill 
	the request. 
*/
export const BadGateway = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 502, statusText: 'BadGateway' }) as B extends undefined ? U.BadGateway : T.BadGateway<ToJSON<B>>

/**	
	[503 Service Unavailable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) 
	— indicates that the server is currently unable to handle the request due to a 
	temporary overload or scheduled maintenance, which will likely be alleviated 
	after some delay. 
*/
export const ServiceUnavailable = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 503, statusText: 'ServiceUnavailable' }) as B extends undefined ? U.ServiceUnavailable : T.ServiceUnavailable<ToJSON<B>>

/**	
	[504 Gateway Timeout](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) 
	— indicates that the server, while acting as a gateway or proxy, did not receive 
	a timely response from the upstream server specified by the URI (e.g. 
	[HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) or 
	[FTP](https://developer.mozilla.org/en-US/docs/Glossary/FTP)) or some other 
	auxiliary server (e.g. DNS) it needed to access in attempting to complete the 
	request. 
*/
export const GatewayTimeout = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 504, statusText: 'GatewayTimeout' }) as B extends undefined ? U.GatewayTimeout : T.GatewayTimeout<ToJSON<B>>

/**	
	[505 HTTP Version Not Supported](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505) 
	— indicates that the server does not support, or refuses to support, the 
	[HTTP protocol](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) version 
	that was used in the request message. 
*/
export const HTTPVersionNotSupported = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 505, statusText: 'HTTPVersionNotSupported' }) as B extends undefined ? U.HTTPVersionNotSupported : T.HTTPVersionNotSupported<ToJSON<B>>

/** 	
	[506 Variant Also Negotiates](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506) 
	— indicates that the server has an internal configuration error: the chosen 
	variant resource is configured to engage in transparent content negotiation 
	itself, and is therefore not a proper end point in the negotiation process. 
*/
export const VariantAlsoNegotiates = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 506, statusText: 'VariantAlsoNegotiates' }) as B extends undefined ? U.VariantAlsoNegotiates : T.VariantAlsoNegotiates<ToJSON<B>>

/** 	
	[507 Insufficient Storage](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507) 
	— indicates that the method could not be performed on the resource because 
	the server is unable to store the representation needed to successfully 
	complete the request. 
*/
export const InsufficientStorage = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 507, statusText: 'InsufficientStorage' }) as B extends undefined ? U.InsufficientStorage : T.InsufficientStorage<ToJSON<B>>

/** 	
	[508 Loop Detected](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508) 
	— indicates that the server terminated an operation because it encountered 
	an infinite loop while processing a request with "Depth: infinity". This 
	status indicates that the entire operation failed. 
*/
export const LoopDetected = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 508, statusText: 'LoopDetected' }) as B extends undefined ? U.LoopDetected : T.LoopDetected<ToJSON<B>>

/** 	
	[510 Not Extended](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510) 
	— indicates that further extensions to the request are required for the 
	server to fulfill it. 
*/
export const NotExtended = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 510, statusText: 'NotExtended' }) as B extends undefined ? U.NotExtended : T.NotExtended<ToJSON<B>>

/**
	[511 Network Authentication Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511) 
	— indicates that the client needs to authenticate to gain network access. 
*/
export const NetworkAuthenticationRequired = <const B = undefined>(body?: B, opts: KitResponseOptions = {}) =>
	kitResponse(body, { ...opts, status: 511, statusText: 'NetworkAuthenticationRequired' }) as B extends undefined ? U.NetworkAuthenticationRequired : T.NetworkAuthenticationRequired<ToJSON<B>>
