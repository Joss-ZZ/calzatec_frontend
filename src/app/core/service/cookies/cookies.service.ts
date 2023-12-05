import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CookiesService {
	constructor(private readonly _cookieService: CookieService) {}

	setItem(key: string, value: string): void {
		this._cookieService.set(key, value, undefined, '/', environment.host, true);
	}

	getItem(key: string): string {
		return this._cookieService.get(key);
	}

	removeItem(key: string): void {
		this._cookieService.delete(key, '/', environment.host, true);
	}

	checkItem(key: string): boolean {
		return this._cookieService.check(key);
	}
}
