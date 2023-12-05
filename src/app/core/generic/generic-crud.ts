import { Observable } from 'rxjs';

export interface GenericCrud<C, U, R> {
	insert(entity: C): Observable<R>;
	update(id: number, entity: U): Observable<boolean>;
	findOne(id: number): Observable<R>;
	findAll(): Observable<R[]>;
	delete(id: number): Observable<boolean>;
}
