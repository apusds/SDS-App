import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, iif, of } from 'rxjs';
import {
  catchError, concatMap, delay, publishLast, refCount, retryWhen, switchMap,
  tap, timeout,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  get<T>(endpoint: string, options: {
    attempts?: number,
    auth?: boolean,
    headers?: HttpHeaders | { [header: string]: string | string[]; },
    params?: HttpParams | { [param: string]: string | string[]; },
    timeout?: number,
    url?: string
  } = {}): Observable<T> {
    options = {
      attempts: 4,
      auth: true,
      headers: {},
      params: {},
      timeout: 20000,
      url: this.apiUrl,
      ...options
    };

    const url = options.url + endpoint;
    const opt = {
      params: options.params,
      headers: options.headers
    };

    const request$ = this.http.get<T>(url, opt)
      .pipe(
        timeout(options.timeout),
        catchError(err => {
          if (400 <= err.status && err.status < 500) {
            return throwError(err);
          }
        }),
        retryWhen(errors => errors.pipe(
          concatMap((err, n) => iif(
            () => !(400 <= err.status && err.status < 500) && n < options.attempts,
            of(err).pipe(delay((2 ** (n + 1) + Math.random() * 8) * 1000)), // 2^n + random 0-8
            throwError(err)
          )
          ))
        ));

    return request$;
  }

  post<T>(endpoint: string, options: {
    body?: any | null,
    headers?: HttpHeaders | { [header: string]: string | string[]; },
    params?: HttpParams | { [param: string]: string | string[]; },
    timeout?: number,
    url?: string
  } = {}): Observable<T> {
    options = {
      body: null,
      headers: {},
      params: {},
      timeout: 10000,
      url: this.apiUrl,
      ...options
    };

    const url = options.url + endpoint;
    const opt = {
      headers: options.headers,
      params: options.params,
      body: options.body
    };

    const body = options.body;

    return this.http.post<T>(url, {
      body
    }).pipe(
        catchError(err => {
          if (400 <= err.status && err.status < 500) {
            return throwError(err);
          }
        }),
        timeout(options.timeout),
      );
  }
}
