/*
AuthInterceptorService (auth-interceptor.service.ts):

This is an Angular service (AuthInterceptorService) that implements the HttpInterceptor interface. The HttpInterceptor allows you to intercept HTTP requests and responses.
The intercept method is the core of this service, and it gets executed every time an HTTP request is made from your Angular application.
Inside intercept:
The incoming HttpRequest (req) is cloned and modified before being sent. A new header ('auth': 'abc') and a query parameter ('hi': 'hello world') are added to this cloned request.
The modified request is then passed to the next interceptor or the actual HTTP request handler (next.handle(modifiedRequest)).
The response from the HTTP request is observed using the pipe method, and the tap operator logs information to the console. This is a common practice for logging and debugging.
The logged information includes the entire HTTP event (console.log(event)).
A message indicating that this is a response from the interceptor is logged (console.log('Response from interceptor')).
If the event type is a successful response (HttpEventType.Response), the response body is logged (console.log(event.body)).
*/

import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("from AuthInterceptorService")
    let modifiedRequest = req.clone({
      headers: req.headers.append('auth', 'abc'),
      params: req.params.append('hi', 'hello world'),
    });
    return next.handle(modifiedRequest);
  }
}
