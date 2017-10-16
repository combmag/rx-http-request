(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "url", "rxjs/Observable", "rxjs/add/observable/of"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const url = require("url");
    exports.url = url;
    const Observable_1 = require("rxjs/Observable");
    require("rxjs/add/observable/of");
    /**
     * Class definition
     */
    class RxCookieJar {
        /**
         * Class constructor
         */
        constructor(cookieJar) {
            // check cookie parameter
            this._checkRequestParam(cookieJar);
            // set cookie jar object
            this._cookieJar = cookieJar;
        }
        /**
         * Returns private property _cookieJar
         *
         * @return {CookieJar}
         */
        get cookieJar() {
            return this._cookieJar;
        }
        /**
         * Function to set a new cookie jar
         *
         * @param cookie {Cookie}
         * @param uri {string | url.Url}
         * @param options {any}
         *
         * @return {Observable<void>}
         */
        setCookie(cookie, uri, options) {
            return Observable_1.Observable.create((observer) => {
                this._cookieJar.setCookie(cookie, uri, options);
                observer.next();
                observer.complete();
            });
        }
        /**
         * Function to get cookie string
         *
         * @param uri {string | url.Url}
         *
         * @return {Observable<string>}
         */
        getCookieString(uri) {
            return Observable_1.Observable.of(this._cookieJar.getCookieString(uri));
        }
        /**
         * Funtion to get an array of cookies
         *
         * @param uri {string | url.Url}
         *
         * @return {Observable<Cookie[]>}
         */
        getCookies(uri) {
            return Observable_1.Observable.of(this._cookieJar.getCookies(uri));
        }
        /**
         * Function to check existing function in object passed in parameter for a new instance
         *
         * @param cookieJar {CookieJar}
         *
         * @private
         */
        _checkRequestParam(cookieJar) {
            // check existing function in object
            if (!cookieJar ||
                Object.prototype.toString.call(cookieJar.setCookie) !== '[object Function]' ||
                Object.prototype.toString.call(cookieJar.getCookieString) !== '[object Function]' ||
                Object.prototype.toString.call(cookieJar.getCookies) !== '[object Function]') {
                throw new TypeError('Parameter must be a valid `CookieJar` object');
            }
        }
    }
    exports.RxCookieJar = RxCookieJar;
});
//# sourceMappingURL=RxCookieJar.js.map