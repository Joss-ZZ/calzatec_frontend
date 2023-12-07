import { ColDef } from 'ag-grid-community';

export interface ColDefCustom<TData, TParams = any, TValue = any>
  extends ColDef<TData, TValue> {
  cellRendererParams?: TParams;
}
