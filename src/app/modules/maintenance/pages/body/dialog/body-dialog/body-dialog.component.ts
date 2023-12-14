import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeForm } from '@calzatec/shared/utils/form';
import { GenericCrudComponetDialog } from '@calzatec/core/generic/generic-crud.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateBodyDto, ResponseBodyDto, UpdateBodyDto } from '@calzatec/shared/models/body.dto';
import { BodyService } from '@calzatec/shared/services/body.service';

@Component({
  selector: 'app-body-dialog',
  templateUrl: './body-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ]
})
export class BodyDialogComponent extends GenericCrudComponetDialog<
  CreateBodyDto,
  UpdateBodyDto,
  ResponseBodyDto
> {
  override formGroup = this.formBuilder.group<TypeForm<CreateBodyDto>>({
    name: this.formBuilder.control('', [Validators.required]),
  });

  constructor(readonly _bodyService: BodyService) {
    super(_bodyService);
  }
}
