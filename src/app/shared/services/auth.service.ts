import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { ResponseDto } from '../interfaces/response.dto';
import { LoginAuthDto } from '../models/login-auth.dto';

const URL = `${environment.apiUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private readonly _httpClient: HttpClient) {}

	login(loginAuthDto: LoginAuthDto): Observable<any> {
		return this._httpClient
			.post<ResponseDto<any>>(`${URL}/login`, loginAuthDto)
			.pipe(map((r) => r.result));
	}

	isAuthenticated(): Observable<boolean> {
		return this._httpClient
			.post<ResponseDto<boolean>>(`${URL}/isAuthenticated`, null)
			.pipe(map((r) => r.result));
	}
}
