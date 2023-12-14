import { VexRoutes } from '@vex/interfaces/vex-route.interface';

export const maintenanceRoutes: VexRoutes = [
  {
    path: 'color',
    loadComponent: () =>
      import('./pages/color/color.component').then((c) => c.ColorComponent),
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'capellada',
    loadComponent: () =>
      import('./pages/body/body.component').then((c) => c.BodyComponent),
    data: {
      scrollDisabled: true,
      toolbarShadowEnabled: false
    }
  }
];
