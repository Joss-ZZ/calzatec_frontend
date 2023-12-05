import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  Provider
} from '@angular/core';
import { AlertModule } from './alert.module';
import { AlertService } from './alert.service';

export function provideAlert(): Array<Provider | EnvironmentProviders> {
  return [
    importProvidersFrom(AlertModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(AlertService),
      multi: true
    }
  ];
}
