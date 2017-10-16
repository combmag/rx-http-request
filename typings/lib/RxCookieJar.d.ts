/// <reference types="request" />
/// <reference types="node" />
import * as request from 'request';
import * as url from 'url';
import Cookie = request.Cookie;
import CookieJar = request.CookieJar;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/**
 * Class definition
 */
export declare class RxCookieJar {
    private _cookieJar;
    /**
     * Class constructor
     */
    constructor(cookieJar: CookieJar);
    /**
     * Returns private property _cookieJar
     *
     * @return {CookieJar}
     */
    readonly cookieJar: CookieJar;
    /**
     * Function to set a new cookie jar
     *
     * @param cookie {Cookie}
     * @param uri {string | url.Url}
     * @param options {any}
     *
     * @return {Observable<void>}
     */
    setCookie(cookie: Cookie, uri: string | url.Url, options?: any): Observable<void>;
    /**
     * Function to get cookie string
     *
     * @param uri {string | url.Url}
     *
     * @return {Observable<string>}
     */
    getCookieString(uri: string | url.Url): Observable<string>;
    /**
     * Funtion to get an array of cookies
     *
     * @param uri {string | url.Url}
     *
     * @return {Observable<Cookie[]>}
     */
    getCookies(uri: string | url.Url): Observable<Cookie[]>;
    /**
     * Function to check existing function in object passed in parameter for a new instance
     *
     * @param cookieJar {CookieJar}
     *
     * @private
     */
    private _checkRequestParam(cookieJar);
}
/**
 * Export all initial elements
 */
export { CookieJar, Cookie, url };