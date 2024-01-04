import { GridOptions } from 'ag-grid-community';
import { SpinnerTableComponent } from '../components/spinner-table/spinner-table.component';

export const defaultGridOptions: GridOptions = {
  loadingOverlayComponent: SpinnerTableComponent,
  overlayLoadingTemplate: '<ct-spinner-table></ct-spinner-table>',
  overlayNoRowsTemplate:
    '<span class="ag-overlay-loading-center">No se ha encontrado información</span>',
  loadingOverlayComponentParams: {
    loadingMessage: 'Cargando información...'
  },
  pagination: true,
  paginationPageSize: 10,
  localeText: {
    page: 'Página',
    to: 'a',
    of: 'de',
    more: 'Más',
    next: 'Siguiente',
    last: 'Última',
    first: 'Primera',
    previous: 'Anterior'
  }
};
