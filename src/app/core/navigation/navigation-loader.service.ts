import { Injectable } from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  constructor(private readonly layoutService: VexLayoutService) {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Dashboards',
        children: [
          {
            type: 'link',
            label: 'Analíticas',
            route: '/',
            icon: 'mat:insights',
            routerLinkActiveOptions: { exact: true }
          },
        ]
      },
      {
        type: 'subheading',
        label: 'Principal',
        children: [
          {
            type: 'dropdown',
            label: 'Gestión de Accesos',
            icon: 'mat:insights',
            children: [
              {
                type: 'link',
                label: 'Usuarios',
                route: '/gestion-accesos/usuario',
                routerLinkActiveOptions: { exact: true }
              },
              {
                type: 'link',
                label: 'Perfiles',
                route: '/gestion-accesos/perfil',
                routerLinkActiveOptions: { exact: true }
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Mantenimientos',
            icon: 'mat:insights',
            children: [
              {
                type: 'dropdown',
                label: 'Maestros',
                children: [
                  {
                    type: 'link',
                    label: 'Modelos',
                    route: '/mantenimientos/modelo',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Capelladas',
                    route: '/mantenimientos/capellada',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Plantas',
                    route: '/mantenimientos/planta',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Tacos',
                    route: '/mantenimientos/taco',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Forros',
                    route: '/mantenimientos/forro',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Colores',
                    route: '/mantenimientos/color',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Series',
                    route: '/mantenimientos/serie',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Productos',
                    route: '/mantenimientos/producto',
                    routerLinkActiveOptions: { exact: true }
                  },
                ]
              },
              {
                type: 'link',
                label: 'Cargos',
                route: 'mantenimientos/cargo',
                routerLinkActiveOptions: { exact: true }
              },
              {
                type: 'link',
                label: 'Empleados',
                route: 'mantenimientos/empleado',
                routerLinkActiveOptions: { exact: true }
              },
              {
                type: 'link',
                label: 'Tiendas/Almacenes',
                route: 'mantenimientos/tienda-almacen',
                routerLinkActiveOptions: { exact: true }
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Transacciones',
            icon: 'mat:insights',
            children: [
              {
                type: 'link',
                label: 'Movimientos',
                route: '/transacciones/movimiento',
                routerLinkActiveOptions: { exact: true }
              },
              {
                type: 'link',
                label: 'Solicitudes de aprobación',
                route: '/transacciones/solicitud-aprobacion',
                routerLinkActiveOptions: { exact: true }
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Inventarios',
            icon: 'mat:insights',
            children: [
              {
                type: 'link',
                label: 'Inventarios',
                route: '/inventarios/inventario',
                routerLinkActiveOptions: { exact: true }
              }
            ]
          },
        ]
      }
    ]);
  }
}
