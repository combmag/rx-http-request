// import libraries
import * as request from 'request';
import { Buffer } from 'buffer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/defaultIfEmpty';
import { RxCookieJar } from './RxCookieJar';
/**
 * Class definition
 */
var RxHttpRequest = (function () {
    /**
     * Class constructor
     */
    function RxHttpRequest(req) {
        // check request parameter
        this._checkRequestParam(req);
        // set request object
        this._request = req;
    }
    /**
     * Returns singleton instance
     *
     * @return {RxHttpRequest}
     */
    RxHttpRequest.instance = function () {
        if (!(RxHttpRequest._instance instanceof RxHttpRequest)) {
            RxHttpRequest._instance = new RxHttpRequest(request);
        }
        return RxHttpRequest._instance;
    };
    Object.defineProperty(RxHttpRequest.prototype, "request", {
        /**
         * Returns private attribute _request
         *
         * @return {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
         */
        get: function () {
            return this._request;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method returns a wrapper around the normal rx-http-request API that defaults to whatever options
     * you pass to it.
     * It does not modify the global rx-http-request API; instead, it returns a wrapper that has your default settings
     * applied to it.
     * You can _call .defaults() on the wrapper that is returned from rx-http-request.defaults to add/override defaults
     * that were previously defaulted.
     *
     * @param options
     *
     * @return {RxHttpRequest}
     */
    RxHttpRequest.prototype.defaults = function (options) {
        return new RxHttpRequest(this._request.defaults(options));
    };
    /**
     * Function to do a GET HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    RxHttpRequest.prototype.get = function (uri, options) {
        return this._call.apply(this, [].concat('get', uri, Object.assign({}, options || {})));
    };
    /**
     * Function to do a GET HTTP request and to return a buffer
     *
     * @param uri
     * @param options
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    RxHttpRequest.prototype.getBuffer = function (uri, options) {
        var _this = this;
        return Observable.create(function (observer) {
            try {
                _this._request.get(uri, Object.assign({}, options || {}))
                    .on('response', function (response) {
                    var res;
                    response.on('data', function (data) { return res = res ? Buffer.concat([].concat(res, data)) : data; });
                    response.on('end', function (_) {
                        observer.next(Object.assign({}, {
                            response: response,
                            body: res
                        }));
                        observer.complete();
                    });
                })
                    .on('error', function (error) { return observer.error(error); });
            }
            catch (error) {
                observer.error(error);
            }
        });
    };
    /**
     * Function to do a POST HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    RxHttpRequest.prototype.post = function (uri, options) {
        return this._call.apply(this, [].concat('post', uri, Object.assign({}, options || {})));
    };
    /**
     * Function to do a PUT HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    RxHttpRequest.prototype.put = function (uri, options) {
        return this._call.apply(this, [].concat('put', uri, Object.assign({}, options || {})));
    };
    /**
     * Function to do a PATCH HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    RxHttpRequest.prototype.patch = function (uri, options) {
        return this._call.apply(this, [].concat('patch', uri, Object.assign({}, options || {})));
    };
    /**
     * Function to do a DELETE HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    RxHttpRequest.prototype.delete = function (uri, options) {
        return this._call.apply(this, [].concat('del', uri, Object.assign({}, options || {})));
    };
    /**
     * Function to do a HEAD HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    RxHttpRequest.prototype.head = function (uri, options) {
        return this._call.apply(this, [].concat('head', uri, Object.assign({}, options || {})));
    };
    /**
     * Function that creates a new rx cookie jar
     *
     * @return {Observable<RxCookieJar>}
     */
    RxHttpRequest.prototype.jar = function () {
        return Observable.of(new RxCookieJar(this._request.jar()));
    };
    /**
     * Function that creates a new cookie
     *
     * @param str {string}
     *
     * @return {Observable<Cookie>}
     */
    RxHttpRequest.prototype.cookie = function (str) {
        return Observable.of(this._request.cookie(str));
    };
    /**
     * Function to do a HTTP request for given method
     *
     * @param method {string}
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     *
     * @private
     */
    RxHttpRequest.prototype._call = function (method, uri, options) {
        return Observable.bindNodeCallback(this._request[method])(uri, Object.assign({}, options || {}))
            .defaultIfEmpty([])
            .map(function (_) { return !!_ ? _ : []; })
            .map(function (_) { return ({ response: _.shift(), body: _.pop() }); });
    };
    /**
     * Function to check existing function in request API passed in parameter for a new instance
     *
     * @param req {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
     *
     * @private
     */
    RxHttpRequest.prototype._checkRequestParam = function (req) {
        // check existing function in API
        if (!req ||
            Object.prototype.toString.call(req.get) !== '[object Function]' ||
            Object.prototype.toString.call(req.head) !== '[object Function]' ||
            Object.prototype.toString.call(req.post) !== '[object Function]' ||
            Object.prototype.toString.call(req.put) !== '[object Function]' ||
            Object.prototype.toString.call(req.patch) !== '[object Function]' ||
            Object.prototype.toString.call(req.del) !== '[object Function]' ||
            Object.prototype.toString.call(req.defaults) !== '[object Function]' ||
            Object.prototype.toString.call(req.jar) !== '[object Function]' ||
            Object.prototype.toString.call(req.cookie) !== '[object Function]') {
            throw new TypeError('Parameter must be a valid `request` module API');
        }
    };
    return RxHttpRequest;
}());
export { RxHttpRequest };
/**
 * Export {RxHttpRequest} instance
 */
export var RxHR = RxHttpRequest.instance();
//# sourceMappingURL=RxHttpRequest.js.map