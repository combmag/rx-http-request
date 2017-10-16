import * as url from 'url';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/**
 * Class definition
 */
var RxCookieJar = (function () {
    /**
     * Class constructor
     */
    function RxCookieJar(cookieJar) {
        // check cookie parameter
        this._checkRequestParam(cookieJar);
        // set cookie jar object
        this._cookieJar = cookieJar;
    }
    Object.defineProperty(RxCookieJar.prototype, "cookieJar", {
        /**
         * Returns private property _cookieJar
         *
         * @return {CookieJar}
         */
        get: function () {
            return this._cookieJar;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Function to set a new cookie jar
     *
     * @param cookie {Cookie}
     * @param uri {string | url.Url}
     * @param options {any}
     *
     * @return {Observable<void>}
     */
    RxCookieJar.prototype.setCookie = function (cookie, uri, options) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._cookieJar.setCookie(cookie, uri, options);
            observer.next();
            observer.complete();
        });
    };
    /**
     * Function to get cookie string
     *
     * @param uri {string | url.Url}
     *
     * @return {Observable<string>}
     */
    RxCookieJar.prototype.getCookieString = function (uri) {
        return Observable.of(this._cookieJar.getCookieString(uri));
    };
    /**
     * Funtion to get an array of cookies
     *
     * @param uri {string | url.Url}
     *
     * @return {Observable<Cookie[]>}
     */
    RxCookieJar.prototype.getCookies = function (uri) {
        return Observable.of(this._cookieJar.getCookies(uri));
    };
    /**
     * Function to check existing function in object passed in parameter for a new instance
     *
     * @param cookieJar {CookieJar}
     *
     * @private
     */
    RxCookieJar.prototype._checkRequestParam = function (cookieJar) {
        // check existing function in object
        if (!cookieJar ||
            Object.prototype.toString.call(cookieJar.setCookie) !== '[object Function]' ||
            Object.prototype.toString.call(cookieJar.getCookieString) !== '[object Function]' ||
            Object.prototype.toString.call(cookieJar.getCookies) !== '[object Function]') {
            throw new TypeError('Parameter must be a valid `CookieJar` object');
        }
    };
    return RxCookieJar;
}());
export { RxCookieJar };
/**
 * Export all initial elements
 */
export { url };
//# sourceMappingURL=RxCookieJar.js.map