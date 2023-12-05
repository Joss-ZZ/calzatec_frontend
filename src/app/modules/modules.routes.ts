import { VexRoutes } from '@vex/interfaces/vex-route.interface';

export const modulesRoutes: VexRoutes = [
  {
    path: 'color',
    loadComponent: () =>
      import('./color/color.component').then((c) => c.ColorComponent)
  }
];
