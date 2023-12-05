import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesService } from '../service/cookies/cookies.service';
import { KEY } from 'src/app/shared/utils/constants';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  private readonly _cookieService = inject(CookiesService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let requestClone = request.clone({});
    if (this._cookieService.checkItem(KEY.token)) {
      const token = this._cookieService.getItem(KEY.token);
      requestClone = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
    }

    return next.handle(requestClone);
  }
}
