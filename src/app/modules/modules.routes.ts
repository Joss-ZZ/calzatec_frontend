import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { maintenanceRoutes } from './maintenance/maintenance.routes';
import { authGuard } from '@calzatec/core/guards/auth.guard';

export const modulesRoutes: VexRoutes = [
  {
		path: 'mantenimientos',
    canActivate: [authGuard()],
    children: [...maintenanceRoutes]
  }
];
