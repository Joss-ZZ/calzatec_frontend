import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

export function authGuard(): CanActivateFn {
	return () => {
		const router = inject(Router);
		return inject(AuthService)
			.isAuthenticated()
			.pipe(
				map((isLogged) => {
					if (!isLogged) {
						router.navigate(['/auth']);
					}
					return isLogged;
				})
			);
	};
}
