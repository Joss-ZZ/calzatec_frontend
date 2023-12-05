import { HttpClient } from '@angular/common/http';
import { Directive, inject } from '@angular/core';
import { ResponseDto } from '@calzatec/shared/interfaces/response.dto';
import { Observable, map } from 'rxjs';
import { GenericCrud } from './generic-crud';

@Directive()
export abstract class GenericCrudService<C, U, R> implements GenericCrud<C, U, R> {
	private readonly _httpClient = inject(HttpClient);

	constructor(protected readonly url: string) {}

	insert(entity: C): Observable<R> {
		return this._httpClient.post<ResponseDto<R>>(this.url, entity).pipe(map((r) => r.result));
	}

	update(id: number, entity: U): Observable<boolean> {
		return this._httpClient
			.patch<ResponseDto<boolean>>(`${this.url}/${id}`, entity)
			.pipe(map((r) => r.result));
	}

	findOne(id: number): Observable<R> {
		return this._httpClient.get<ResponseDto<R>>(`${this.url}/${id}`).pipe(map((r) => r.result));
	}

	findAll(): Observable<R[]> {
		return this._httpClient.get<ResponseDto<R[]>>(this.url).pipe(map((r) => r.result));
	}

	delete(id: number): Observable<boolean> {
		return this._httpClient
			.delete<ResponseDto<boolean>>(`${this.url}/${id}`)
			.pipe(map((r) => r.result));
	}
}
