import { Injectable, Inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor(@Inject('environment') private environment: any) {}

  /**
   * regex testing if url is valid
   * @param url: string
   */
  validUrl(url: string) {
    return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
      url
    );
  }

  localUrl(url: string) {
    return url.startsWith('.');
  }

  /**
   * Intercept any http-request and put some sugar in it
   * @param request incoming request
   * @param next
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    const headers: any = {};

    headers['Accept'] = 'application/json';
    headers['Cache-Control'] = 'no-cache';
    headers['Pragma'] = 'no-cache';
    headers['If-Modified-Since'] = 'Sat, 01 Jan 2000 00:00:00 GMT';
    headers['Access-Control-Allow-Origin'] = '*';

    if (!request.headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let url = request.url; // .replace('api/', '');

    if (!this.validUrl(url) && !this.localUrl(url)) {
      url = this.environment.apiUrl + request.url; // .replace('api/', '');
    }

    request = request.clone({
      setHeaders: headers,
      url: url
    });

    return next.handle(request);
  }
}
