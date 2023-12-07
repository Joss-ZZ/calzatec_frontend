import { MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface DialogConfig extends Omit<MatDialogConfig, 'data'> {
  title: string;
}

export interface GenericCrud<C, U, R> {
  insert(entity: C): Observable<R>;
  update(id: number, entity: U): Observable<boolean>;
  findOne(id: number): Observable<R>;
  findAll(): Observable<R[]>;
  delete(id: number): Observable<boolean>;
}
