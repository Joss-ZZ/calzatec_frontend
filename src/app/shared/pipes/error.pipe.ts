import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
	name: 'error',
	standalone: true,
})
export class ErrorPipe implements PipeTransform {
	transform(d: FormControl, ...args: string[]): any {
		if (d == null) return null;

		if (d.invalid && (d.dirty || d.touched)) {
			if (d.errors?.[args[0]]) {
				// console.log({ errors: d.errors?.[error] });
				return d.errors?.[args[0]];
			}
			return null;
		}

		return null;
	}
}
