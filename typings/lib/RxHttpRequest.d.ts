/// <reference types="request" />
import * as request from 'request';
import RequestAPI = request.RequestAPI;
import Request = request.Request;
import CoreOptions = request.CoreOptions;
import RequiredUriUrl = request.RequiredUriUrl;
import RequestResponse = request.RequestResponse;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/defaultIfEmpty';
import { RxCookieJar, Cookie } from './RxCookieJar';
/**
 * Class definition
 */
export declare class RxHttpRequest {
    private static _instance;
    private _request;
    /**
     * Returns singleton instance
     *
     * @return {RxHttpRequest}
     */
    static instance(): RxHttpRequest;
    /**
     * Class constructor
     */
    constructor(req: RequestAPI<Request, CoreOptions, RequiredUriUrl>);
    /**
     * Returns private attribute _request
     *
     * @return {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
     */
    readonly request: RequestAPI<Request, CoreOptions, RequiredUriUrl>;
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
    defaults(options: CoreOptions): RxHttpRequest;
    /**
     * Function to do a GET HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    get(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse>;
    /**
     * Function to do a GET HTTP request and to return a buffer
     *
     * @param uri
     * @param options
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    getBuffer(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse>;
    /**
     * Function to do a POST HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    post(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse>;
    /**
     * Function to do a PUT HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    put(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse>;
    /**
     * Function to do a PATCH HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    patch(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse>;
    /**
     * Function to do a DELETE HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    delete(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse>;
    /**
     * Function to do a HEAD HTTP request
     *
     * @param uri {string}
     * @param options {CoreOptions}
     *
     * @return {Observable<RxHttpRequestResponse>}
     */
    head(uri: string, options?: CoreOptions): Observable<RxHttpRequestResponse>;
    /**
     * Function that creates a new rx cookie jar
     *
     * @return {Observable<RxCookieJar>}
     */
    jar(): Observable<RxCookieJar>;
    /**
     * Function that creates a new cookie
     *
     * @param str {string}
     *
     * @return {Observable<Cookie>}
     */
    cookie(str: string): Observable<Cookie>;
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
    private _call(method, uri, options?);
    /**
     * Function to check existing function in request API passed in parameter for a new instance
     *
     * @param req {RequestAPI<Request, CoreOptions, RequiredUriUrl>}
     *
     * @private
     */
    private _checkRequestParam(req);
}
/**
 * Export {RxHttpRequest} instance
 */
export declare const RxHR: RxHttpRequest;
/**
 * Export response interface
 */
export interface RxHttpRequestResponse {
    response: RequestResponse;
    body: any;
}
/**
 * Export all initial elements
 */
export { RequestAPI, Request, CoreOptions, RequiredUriUrl, RequestResponse };
