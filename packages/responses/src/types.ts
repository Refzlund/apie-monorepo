import { type APIResponse } from './api-response'
export { type APIResponse } from './api-response'

// *
// * -- 1xx Informational
// *

type Informational = 'informational' | 'any'

/** 
	[100 Continue](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100) 
	— indicates that everything so far is OK and that the client 
	should continue with the request or ignore it if it is already finished.
*/
export type Continue<Body = undefined> = APIResponse<100, true, Body, Informational | 'Continue'>

/**
	[101 Switching Protocols](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101)
	— indicates a protocol to which the server switches. The protocol is specified in the
	[Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) request header received from a client.
*/
export type SwitchingProtocols<Body = undefined> = APIResponse<101, true, Body, Informational | 'SwitchingProtocols'>

/**
	[102 Processing](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-102-status-code/)
	— An interim response used to inform the client that the
	server has accepted the complete request but has not yet completed it.
*/
export type Processing<Body = undefined> = APIResponse<102, true, Body, Informational | 'Processing'>

/**
	[103 Early Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103)
	— is primarily intended to be used with the
	[Link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link)
	header to allow the user agent to start preloading 
	resources while the server is still preparing a response.
*/
export type EarlyHints<Body = undefined> = APIResponse<103, true, Body, Informational | 'EarlyHints'>




// *
// * -- 2xx Success
// *

type Success = 'success' | 'any'

/**
	[200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)
	— indicates that the request has succeeded. A 200 response is cacheable by default.
*/
export type OK<Body = undefined> = APIResponse<200, true, Body, Success | 'OK'>

/**
	[201 Created](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201)
	— indicates that the request has succeeded and has led to the creation of a resource.
	The new resource is effectively created before this response is sent back and
	the new resource is returned in the body of the message, 
	its location being either the URL of the request,
	or the content of the [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) header.
*/
export type Created<Body = undefined> = APIResponse<201, true, Body, Success | 'Created'>

/**
	[202 Accepted](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202)
	— indicates that the request has been accepted for processing, but the processing 
	has not been completed; in fact, processing may not have started yet.
	The request might or might not eventually be acted upon,
	as it might be disallowed when processing actually takes place.
*/
export type Accepted<Body = undefined> = APIResponse<202, true, Body, Success | 'Accepted'>

/**
	[203 Non-Authoritative Information](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203)
	— indicates that the request was successful 
	but the enclosed payload has been modified by a transforming 
	[proxy](https://developer.mozilla.org/en-US/docs/Glossary/Proxy_server)
	from that of the origin server's [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) (OK) response.
*/
export type NonAuthoritativeInformation<Body = undefined> = APIResponse<203, true, Body, Success | 'NonAuthoritativeInformation'>

/**
	[204 No Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204) 
	— indicates that a request has succeeded, 
	but that the client doesn't need to navigate away from its current page.
 */
export type NoContent<Body = undefined> = APIResponse<204, false, Body, Success | 'NoContent'>

/**
	[205 Reset Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205)
	— tells the client to reset the document view, 
	so for example to clear the content of a form, 
	reset a canvas state, or to refresh the UI.
*/
export type ResetContent<Body = undefined> = APIResponse<205, true, Body, Success | 'ResetContent'>

/**
	[206 Partial Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206)
	— indicates that the request has succeeded and the body contains the 
	requested ranges of data, as described in the Range header of the request.
*/
export type PartialContent<Body = undefined> = APIResponse<206, true, Body, Success | 'PartialContent'>

/**
	[207 Mutli-Status](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-207-status-code/)
	— conveys information about multiple resources in situations 
	where multiple status codes might be appropriate.
*/
export type MultiStatus<Body = undefined> = APIResponse<207, true, Body, Success | 'MultiStatus'>

/**
	[208 Already Reported](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-208-status-code/)
	— Used inside a DAV: propstat response element to avoid enumerating 
	the internal members of multiple bindings to the same collection repeatedly.
*/
export type AlreadyReported<Body = undefined> = APIResponse<208, true, Body, Success | 'AlreadyReported'>

/**
	[226 IM Used](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-226-status-code/)
	— The server has fulfilled a GET request for the resource, 
	and the response is a representation of the result of one 
	or more instance-manipulations applied to the current instance.
*/
export type IMUsed<Body = undefined> = APIResponse<226, true, Body, Success | 'IMUsed'>




// *
// * -- 3xx Redirect
// *

type Redirect = 'redirect' | 'any'

/**
	[300 Multiple Choices](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300)
	— indicates that the request has more than one possible responses.
	The user-agent or user should choose one of them.
	As there is no standardized way of choosing one of the responses,
	this response code is very rarely used.
*/
export type MultipleChoices<Body = undefined> = APIResponse<300, true, Body, Redirect | 'MultipleChoices'>

/**
	[301 Moved Permanently](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
	— indicates that the resource has been moved permanently to a new location,
	and that future references should use a new URI with their requests.
*/
export type MovedPermanently<Body = undefined> = APIResponse<301, true, Body, Redirect | 'MovedPermanently'>

/**
	[302 Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)
	— indicates that the resource has been moved temporarily to a different location,
	but that future references should still use the original URI to access the resource.
*/
export type Found<Body = undefined> = APIResponse<302, true, Body, Redirect | 'Found'>

/**
	[303 See Other](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303)
	— indicates that the response to the request can be found under a different URI.
*/
export type SeeOther<Body = undefined> = APIResponse<303, true, Body, Redirect | 'SeeOther'>

/**
	[304 Not Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304)
	— indicates that the request has not been modified since the last request.
*/
export type NotModified<Body = undefined> = APIResponse<304, false, Body, Redirect | 'NotModified'>

/**
	[307 Temporary Redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307)
	— indicates that the resource is located temporarily under a different URI.
	Since the redirection might be altered on occasion, the client should
	continue to use the original effective request URI for future requests.
*/
export type TemporaryRedirect<Body = undefined> = APIResponse<307, true, Body, Redirect | 'TemporaryRedirect'>

/**
	[308 Permanent Redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308)
	— indicates that the resource has been moved permanently to a new location,
	and that future references should use a new URI with their requests.
*/
export type PermanentRedirect<Body = undefined> = APIResponse<308, true, Body, Redirect | 'PermanentRedirect'>




// *
// * -- 4xx Client Error
// *

type ClientError = 'clientError' | 'error' | 'any'

/**
	[400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)
	— indicates that the server cannot or will not process the request due to an
	apparent client error.
*/
export type BadRequest<Body = undefined> = APIResponse<400, false, Body, ClientError | 'BadRequest'>

/**
	[401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)
	— indicates that the request has not been applied because it lacks valid
	authentication credentials for the target resource.
*/
export type Unauthorized<Body = undefined> = APIResponse<401, false, Body, ClientError | 'Unauthorized'>

/**
	[402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402)
	— is reserved for future use. The original intention was that this code might
	be used as part of some form of digital cash or micropayment scheme, but that
	has not happened, and this code is not usually used.
*/
export type PaymentRequired<Body = undefined> = APIResponse<402, false, Body, ClientError | 'PaymentRequired'>

/**
	[403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)
	— indicates that the server understood the request but refuses to authorize it.
*/
export type Forbidden<Body = undefined> = APIResponse<403, false, Body, ClientError | 'Forbidden'>

/**
	[404 Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
	— indicates that the origin server did not find a current representation for
	the target resource or is not willing to disclose that one exists.
*/
export type NotFound<Body = undefined> = APIResponse<404, false, Body, ClientError | 'NotFound'>

/**
	[405 Method Not Allowed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405)
	— indicates that the method received in the request-line is known by the origin
	server but not supported by the target resource.
*/
export type MethodNotAllowed<Body = undefined> = APIResponse<405, false, Body, ClientError | 'MethodNotAllowed'>

/**
	[406 Not Acceptable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406)
	— indicates that the server cannot produce a response matching the list of
	acceptable values defined in the request's proactive content negotiation
	headers, and that the server is unwilling to supply a default representation.
*/
export type NotAcceptable<Body = undefined> = APIResponse<406, false, Body, ClientError | 'NotAcceptable'>

/**
	[407 Proxy Authentication Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407)
	— indicates that the client needs to authenticate itself in order to use a
	proxy.
*/
export type ProxyAuthenticationRequired<Body = undefined> = APIResponse<407, false, Body, ClientError | 'ProxyAuthenticationRequired'>

/**
	[408 Request Timeout](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408)
	— indicates that the server did not receive a complete request message within
	the time that it was prepared to wait.
*/
export type RequestTimeout<Body = undefined> = APIResponse<408, false, Body, ClientError | 'RequestTimeout'>

/**
	[409 Conflict](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409)
	— indicates that the request could not be completed due to a conflict with the
	current state of the target resource.
*/
export type Conflict<Body = undefined> = APIResponse<409, false, Body, ClientError | 'Conflict'>

/**
	[410 Gone](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410)
	— indicates that access to the target resource is no longer available at the
	origin server and that this condition is likely to be permanent.
*/
export type Gone<Body = undefined> = APIResponse<410, false, Body, ClientError | 'Gone'>

/** 
	[411 Length Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411) 
	— indicates that the server refuses to accept the request without a defined
	[Content-Length](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length).
*/
export type LengthRequired<Body = undefined> = APIResponse<411, false, Body, ClientError | 'LengthRequired'>

/**
	[412 Precondition Failed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412) 
	— indicates that one or more conditions given in the request 
	header fields evaluated to false when tested on the server. 
*/
export type PreconditionFailed<Body = undefined> = APIResponse<412, false, Body, ClientError | 'PreconditionFailed'>

/** 
	[413 Payload Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413) 
	— indicates that the server is refusing to process a request because 
	the request payload is larger than the server is willing or able to process. 
*/
export type PayloadTooLarge<Body = undefined> = APIResponse<413, false, Body, ClientError | 'PayloadTooLarge'>

/** 
	[414 URI Too Long](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414) 
	— indicates that the server is refusing to service the request 
	because the request-target is longer than the server is willing to interpret.
*/
export type URITooLong<Body = undefined> = APIResponse<414, false, Body, ClientError | 'URITooLong'>

/** 
	[415 Unsupported Media Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415) 
	— indicates that the origin server is refusing to service the request because 
	the payload is in a format not supported by this method on the target resource.
*/
export type UnsupportedMediaType<Body = undefined> = APIResponse<415, false, Body, ClientError | 'UnsupportedMediaType'>

/**
	[416 Range Not Satisfiable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416) 
	— indicates that none of the ranges in the request's 
	[Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
	header field (Section 14.35 of [RFC7233](https://tools.ietf.org/html/rfc7233)) overlap the
	current extent of the selected resource or that the set of ranges requested has been 
	rejected due to invalid ranges or an excessive request of small or overlapping ranges
*/
export type RangeNotSatisfiable<Body = undefined> = APIResponse<416, false, Body, ClientError | 'RangeNotSatisfiable'>

/** 	
	[417 Expectation Failed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417) 
	— indicates that the expectation given in the request's 
	[Expect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect) 
	header field (Section 5.1.1 of [RFC7231](https://tools.ietf.org/html/rfc7231)) 
	could not be met by at least one of the inbound servers. 
*/
export type ExpectationFailed<Body = undefined> = APIResponse<417, false, Body, ClientError | 'ExpectationFailed'>

/** 
	[418 I'm a teapot](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) 
	— indicates that the server refuses to brew coffee because it is, permanently, 
	a teapot.  A combined coffee/tea pot that is temporarily 
	out of coffee should instead return 503. 
	This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April 
	Fools' jokes in 1998 and 2014. 
*/
export type ImATeapot<Body = undefined> = APIResponse<418, false, Body, ClientError | 'ImATeapot'>

/** 
	[421 Misdirected Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421) 
	— indicates that the request was directed at a 
	server that is not able to produce a response. 
*/
export type MisdirectedRequest<Body = undefined> = APIResponse<421, false, Body, ClientError | 'MisdirectedRequest'>

/** 	
	[422 Unprocessable Entity](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422) 
	— indicates that the server understands the content type of the request entity 
	(hence a [415] [Unsupported Media Type] status code is inappropriate), and the 
	syntax of the request entity is correct (thus a [400] [Bad Request] status code 
	is inappropriate) but was unable to process the contained instructions. 
*/
export type UnprocessableEntity<Body = undefined> = APIResponse<422, false, Body, ClientError | 'UnprocessableEntity'>

/** 	
	[423 Locked](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423) 
	— indicates that the access to the target resource is denied. 
*/
export type Locked<Body = undefined> = APIResponse<423, false, Body, ClientError | 'Locked'>

/**
	[424 Failed Dependency](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424) 
	— indicates that the method could not be performed on the resource because the 
	requested action depended on another action and that action failed. 
*/
export type FailedDependency<Body = undefined> = APIResponse<424, false, Body, ClientError | 'FailedDependency'>

/**
	[425 Too Early](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425) 
	— indicates that the server is unwilling to risk processing a request that might 
	be replayed. 
*/
export type TooEarly<Body = undefined> = APIResponse<425, false, Body, ClientError | 'TooEarly'>

/**
	[426 Upgrade Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426) 
	— indicates that the server refuses to perform the request using the current 
	protocol but might be willing to do so after the client upgrades to a different 
	protocol. The server sends an [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) 
	header field in a 426 response to indicate the required protocol(s). 
*/
export type UpgradeRequired<Body = undefined> = APIResponse<426, false, Body, ClientError | 'UpgradeRequired'>

/**
	[428 Precondition Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428) 
	— indicates that the origin server requires the request to be conditional. 
*/
export type PreconditionRequired<Body = undefined> = APIResponse<428, false, Body, ClientError | 'PreconditionRequired'>

/**
	[429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) 
	— indicates that the user has sent too many requests in a given amount of time 
	("rate limiting"). 
*/
export type TooManyRequests<Body = undefined> = APIResponse<429, false, Body, ClientError | 'TooManyRequests'>

/**
	[431 Request Header Fields Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431) 
	— indicates that the server is unwilling to process the request because its 
	header fields are too large. The request may be resubmitted after reducing the 
	size of the request header fields. 
*/
export type RequestHeaderFieldsTooLarge<Body = undefined> = APIResponse<431, false, Body, ClientError | 'RequestHeaderFieldsTooLarge'>

/** 
	[451 Unavailable For Legal Reasons](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451) 
	— indicates that the user requested a resource that is not available for legal 
	reasons, such as a web page censored by a government. 
*/
export type UnavailableForLegalReasons<Body = undefined> = APIResponse<451, false, Body, ClientError | 'UnavailableForLegalReasons'>




// *
// * 5xx Server Error
// *

type ServerError = 'serverError' | 'error' | 'any'

/**
	[500 Internal Server Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) 
	— indicates that the server encountered an unexpected condition that prevented 
	it from fulfilling the request. 
*/
export type InternalServerError<Body = undefined> = APIResponse<500, false, Body, ServerError | 'InternalServerError'>

/**
	[501 Not Implemented](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501) 
	— indicates that the server does not support the functionality required to 
	fulfill the request. 
*/
export type NotImplemented<Body = undefined> = APIResponse<501, false, Body, ServerError | 'NotImplemented'>

/**
	[502 Bad Gateway](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) 	
	— indicates that the server, while acting as a gateway or proxy, received an 
	invalid response from the upstream server it accessed in attempting to fulfill 
	the request. 
*/
export type BadGateway<Body = undefined> = APIResponse<502, false, Body, ServerError | 'BadGateway'>

/**	
	[503 Service Unavailable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) 
	— indicates that the server is currently unable to handle the request due to a 
	temporary overload or scheduled maintenance, which will likely be alleviated 
	after some delay. 
*/
export type ServiceUnavailable<Body = undefined> = APIResponse<503, false, Body, ServerError | 'ServiceUnavailable'>

/**	
	[504 Gateway Timeout](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) 
	— indicates that the server, while acting as a gateway or proxy, did not receive 
	a timely response from the upstream server specified by the URI (e.g. 
	[HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) or 
	[FTP](https://developer.mozilla.org/en-US/docs/Glossary/FTP)) or some other 
	auxiliary server (e.g. DNS) it needed to access in attempting to complete the 
	request. 
*/
export type GatewayTimeout<Body = undefined> = APIResponse<504, false, Body, ServerError | 'GatewayTimeout'>

/**	
	[505 HTTP Version Not Supported](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505) 
	— indicates that the server does not support, or refuses to support, the 
	[HTTP protocol](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) version 
	that was used in the request message. 
*/
export type HTTPVersionNotSupported<Body = undefined> = APIResponse<505, false, Body, ServerError | 'HTTPVersionNotSupported'>

/** 	
	[506 Variant Also Negotiates](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506) 
	— indicates that the server has an internal configuration error: the chosen 
	variant resource is configured to engage in transparent content negotiation 
	itself, and is therefore not a proper end point in the negotiation process. 
*/
export type VariantAlsoNegotiates<Body = undefined> = APIResponse<506, false, Body, ServerError | 'VariantAlsoNegotiates'>

/** 	
	[507 Insufficient Storage](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507) 
	— indicates that the method could not be performed on the resource because 
	the server is unable to store the representation needed to successfully 
	complete the request. 
*/
export type InsufficientStorage<Body = undefined> = APIResponse<507, false, Body, ServerError | 'InsufficientStorage'>

/** 	
	[508 Loop Detected](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508) 
	— indicates that the server terminated an operation because it encountered 
	an infinite loop while processing a request with "Depth: infinity". This 
	status indicates that the entire operation failed. 
*/
export type LoopDetected<Body = undefined> = APIResponse<508, false, Body, ServerError | 'LoopDetected'>

/** 	
	[510 Not Extended](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510) 
	— indicates that further extensions to the request are required for the 
	server to fulfill it. 
*/
export type NotExtended<Body = undefined> = APIResponse<510, false, Body, ServerError | 'NotExtended'>

/**
	[511 Network Authentication Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511) 
	— indicates that the client needs to authenticate to gain network access. 
*/
export type NetworkAuthenticationRequired<Body = undefined> = APIResponse<511, false, Body, ServerError | 'NetworkAuthenticationRequired'>