import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  EnumTypeError,
  ResponseDto
} from 'src/app/shared/interfaces/response.dto';
import { AlertService } from '../service/alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly _alertService = inject(AlertService);
  private readonly _snackBar = this._alertService.snackBar;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(({ error }: HttpErrorResponse) => {
        if (!(error instanceof ProgressEvent)) {
          const { typeError, message } = error as ResponseDto<null>;

          const type = {
            [EnumTypeError.Information]: {
              action: this._snackBar.info,
              title: 'Info'
            },
            [EnumTypeError.Warn]: {
              action: this._snackBar.warn,
              title: 'Advertencia'
            },
            [EnumTypeError.Error]: {
              action: this._snackBar.error,
              title: 'Error'
            }
          };

          const ms = type[typeError];

          if (typeof message === 'object') {
            // this._matSnackBar.addAll(
            //   message.map((m, i) => ({
            //     ...ms,
            //     detail: m,
            //     life: 5000 * (i + 1)
            //   }))
            // );
            ms.action(message.join(','));
          } else {
            // this._matSnackBar.add({
            //   ...ms,
            //   detail: message,
            //   life: 5000
            // });
            ms.action(message);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
