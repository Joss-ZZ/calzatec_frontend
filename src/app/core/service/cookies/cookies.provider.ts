import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Provider
} from '@angular/core';
import { CookiesService } from './cookies.service';

export function provideCookies(): Array<Provider | EnvironmentProviders> {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(CookiesService),
      multi: true
    }
  ];
}
