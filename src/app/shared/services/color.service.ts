import { Injectable } from '@angular/core';
import { CreateColorDto, ResponseColorDto, UpdateColorDto } from '../models/color.dto';
import { environment } from 'src/environments/environment';
import { GenericCrudService } from '@calzatec/core/generic/generic-crud..service';

const URL = `${environment.apiUrl}/colors`;

@Injectable({ providedIn: 'root' })
export class ColorService extends GenericCrudService<
	CreateColorDto,
	UpdateColorDto,
	ResponseColorDto
> {
	constructor() {
		super(URL);
	}
}
