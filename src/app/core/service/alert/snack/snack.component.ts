import { Component, HostBinding, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from '@angular/material/snack-bar';

import { SnackBarData } from '../alert.interfaces';

@Component({
  selector: 'ct-snack',
  template: `
    <mat-icon
      *ngIf="icon"
      class="mr-2 w-8 h-8 text-4xl"
      [svgIcon]="icon"></mat-icon>
    <p class="flex-1">{{ snackBarConfg.message }}</p>
    <button
      *ngIf="snackBarConfg.buttonClosed"
      mat-icon-button
      type="button"
      aria-label="cerrar"
      (click)="close()">
      <mat-icon svgIcon="mat:close"></mat-icon>
    </button>
    <!-- <mat-icon class="ml-2 w-6 h-6 text-3xl" [icIcon]="icClose"></mat-icon> -->
  `,
  styles: []
})
export class SnackComponent {
  get icon(): string | null {
    const type = this.snackBarConfg.type;

    if (type === 'info') return 'mat:info';
    if (type === 'warn') return 'mat:warning';
    if (type === 'error') return 'mat:error';

    return null;
  }

  @HostBinding('class') private _class = 'flex items-center';

  constructor(
    private readonly _matSnackBarRef: MatSnackBarRef<SnackComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public snackBarConfg: SnackBarData
  ) {}

  close(): void {
    this._matSnackBarRef.dismiss();
  }
}
