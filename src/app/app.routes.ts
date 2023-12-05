import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { LoginComponent } from './modules/auth/login/login.component';
import { modulesRoutes } from './modules/modules.routes';

export const appRoutes: VexRoutes = [
  {
    path: '',
    canActivate: [authGuard()],
    component: LayoutComponent,
    children: [...modulesRoutes]
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./modules/auth/login/login.component').then(
            (c) => c.LoginComponent
          )
      }
    ]
  }
];
