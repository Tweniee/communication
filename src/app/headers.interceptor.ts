import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // curl -i -H "Accept:application/json" -H "Content-Type:application/json" -H "Authorization: Bearer f2e9661042e844971464d86fb841a13034cc3230ad5e0d6568187c53f46f9645"

    const apiKey =
      'Bearer f2e9661042e844971464d86fb841a13034cc3230ad5e0d6568187c53f46f9645';
    request = request.clone({
      setHeaders: {
        Authorization: apiKey,
        name: "Khush",
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return next.handle(request);
  }
}
