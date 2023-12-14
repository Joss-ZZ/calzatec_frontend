import { Injectable } from '@angular/core';
import {
  CreateBodyDto,
  ResponseBodyDto,
  UpdateBodyDto
} from '@calzatec/shared/models/body.dto';
import { environment } from 'src/environments/environment';
import { GenericCrudService } from '@calzatec/core/generic/generic-crud..service';

const URL = `${environment.apiUrl}/bodies`;

@Injectable({ providedIn: 'root' })
export class BodyService extends GenericCrudService<
  CreateBodyDto,
  UpdateBodyDto,
  ResponseBodyDto
> {
  constructor() {
    super(URL);
  }
}
