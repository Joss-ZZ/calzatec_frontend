import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorService } from '@calzatec/shared/services/color.service';
import { TypeForm } from '@calzatec/shared/utils/form';
import {
  CreateColorDto,
  ResponseColorDto,
  UpdateColorDto
} from '@calzatec/shared/models/color.dto';
import { GenericCrudComponetDialog } from '@calzatec/core/generic/generic-crud.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  HasErrorRootDirective,
  HasErrorDirective
} from '@calzatec/shared/directives/error.directive';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    HasErrorRootDirective,
    HasErrorDirective
  ]
})
export class ColorDialogComponent extends GenericCrudComponetDialog<
  CreateColorDto,
  UpdateColorDto,
  ResponseColorDto
> {
  override formGroup = this.formBuilder.group<TypeForm<CreateColorDto>>({
    name: this.formBuilder.control('', [Validators.required]),
    value: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(7)
    ])
  });

  constructor(readonly _colorService: ColorService) {
    super(_colorService);
  }
}
