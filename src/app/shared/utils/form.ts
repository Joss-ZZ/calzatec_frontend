import { FormGroup, ValidationErrors, ɵElement } from '@angular/forms';

export type TypeForm<T> = { [K in keyof T]: ɵElement<T[K], never> };

export type ErrorFc<T> = (field: keyof T, error: string) => ValidationErrors | null;

export function errorForm<T>(formGroup: FormGroup): ErrorFc<T> {
	return function (field: keyof T, error: string): ValidationErrors | null {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const d = formGroup.controls[field as unknown as any];

		if (d == null) return null;

		if (d.invalid && (d.dirty || d.touched)) {
			if (d.errors?.[error]) {
				// console.log({ errors: d.errors?.[error] });
				return d.errors?.[error];
			}
			return null;
		}

		return null;
	};
}
