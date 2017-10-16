(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "request", "buffer", "rxjs/Observable", "rxjs/add/observable/of", "rxjs/add/observable/bindNodeCallback", "rxjs/add/operator/map", "rxjs/add/operator/defaultIfEmpty", "./RxCookieJar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import libraries
    const request = require("request");
    const buffer_1 = require("buffer");
    const Observable_1 = require("rxjs/Observable");
    require("rxjs/add/observable/of");
    require("rxjs/add/observable/bindNodeCallback");
    require("rxjs/add/operator/map");
    require("rxjs/add/operator/defaultIfEmpty");
    const RxCookieJar_1 = require("./RxCookieJar");
    /**
     * Class definition
     */
    class RxHttpRequest {
        /**
         * Returns singleton instance
         *
         * @return {RxHttpRequest}
         */
        static instance() {
            if (!(RxHttpRequest._instance instanceof RxHttpRequest)) {
                RxHttpRequest._instance = new RxHttpRequest(request);
            }
            return RxHttpRequest._instance;
        }
        /**
         * Class constructor
         */
        constructor(req) {
            // check request parameter
            this._checkRequestParam(req);
            // set request object
            this._request = req;
        }
        /**
         * Returns private attribute _request
         *
         * @return {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
         */
        get request() {
            return this._request;
        }
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
        defaults(options) {
            return new RxHttpRequest(this._request.defaults(options));
        }
        /**
         * Function to do a GET HTTP request
         *
         * @param uri {string}
         * @param options {CoreOptions}
         *
         * @return {Observable<RxHttpRequestResponse>}
         */
        get(uri, options) {
            return this._call.apply(this, [].concat('get', uri, Object.assign({}, options || {})));
        }
        /**
         * Function to do a GET HTTP request and to return a buffer
         *
         * @param uri
         * @param options
         *
         * @return {Observable<RxHttpRequestResponse>}
         */
        getBuffer(uri, options) {
            return Observable_1.Observable.create((observer) => {
                try {
                    this._request.get(uri, Object.assign({}, options || {}))
                        .on('response', (response) => {
                        let res;
                        response.on('data', (data) => res = res ? buffer_1.Buffer.concat([].concat(res, data)) : data);
                        response.on('end', _ => {
                            observer.next(Object.assign({}, {
                                response: response,
                                body: res
                            }));
                            observer.complete();
                        });
                    })
                        .on('error', error => observer.error(error));
                }
                catch (error) {
                    observer.error(error);
                }
            });
        }
        /**
         * Function to do a POST HTTP request
         *
         * @param uri {string}
         * @param options {CoreOptions}
         *
         * @return {Observable<RxHttpRequestResponse>}
         */
        post(uri, options) {
            return this._call.apply(this, [].concat('post', uri, Object.assign({}, options || {})));
        }
        /**
         * Function to do a PUT HTTP request
         *
         * @param uri {string}
         * @param options {CoreOptions}
         *
         * @return {Observable<RxHttpRequestResponse>}
         */
        put(uri, options) {
            return this._call.apply(this, [].concat('put', uri, Object.assign({}, options || {})));
        }
        /**
         * Function to do a PATCH HTTP request
         *
         * @param uri {string}
         * @param options {CoreOptions}
         *
         * @return {Observable<RxHttpRequestResponse>}
         */
        patch(uri, options) {
            return this._call.apply(this, [].concat('patch', uri, Object.assign({}, options || {})));
        }
        /**
         * Function to do a DELETE HTTP request
         *
         * @param uri {string}
         * @param options {CoreOptions}
         *
         * @return {Observable<RxHttpRequestResponse>}
         */
        delete(uri, options) {
            return this._call.apply(this, [].concat('del', uri, Object.assign({}, options || {})));
        }
        /**
         * Function to do a HEAD HTTP request
         *
         * @param uri {string}
         * @param options {CoreOptions}
         *
         * @return {Observable<RxHttpRequestResponse>}
         */
        head(uri, options) {
            return this._call.apply(this, [].concat('head', uri, Object.assign({}, options || {})));
        }
        /**
         * Function that creates a new rx cookie jar
         *
         * @return {Observable<RxCookieJar>}
         */
        jar() {
            return Observable_1.Observable.of(new RxCookieJar_1.RxCookieJar(this._request.jar()));
        }
        /**
         * Function that creates a new cookie
         *
         * @param str {string}
         *
         * @return {Observable<Cookie>}
         */
        cookie(str) {
            return Observable_1.Observable.of(this._request.cookie(str));
        }
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
        _call(method, uri, options) {
            return Observable_1.Observable.bindNodeCallback(this._request[method])(uri, Object.assign({}, options || {}))
                .defaultIfEmpty([])
                .map(_ => !!_ ? _ : [])
                .map((_) => ({ response: _.shift(), body: _.pop() }));
        }
        /**
         * Function to check existing function in request API passed in parameter for a new instance
         *
         * @param req {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
         *
         * @private
         */
        _checkRequestParam(req) {
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
        }
    }
    exports.RxHttpRequest = RxHttpRequest;
    /**
     * Export {RxHttpRequest} instance
     */
    exports.RxHR = RxHttpRequest.instance();
});
//# sourceMappingURL=RxHttpRequest.js.map