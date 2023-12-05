import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Provider
} from '@angular/core';
import { SecurityInterceptor } from './security.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export function provideInterceptor(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ];
}
