import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoadingConfig } from '../alert.interfaces';

@Component({
  selector: 'ct-loading',
  template: `<mat-spinner></mat-spinner>`
})
export class LoadingComponent implements OnInit {
  private _margin = '2em';

  constructor(
    private readonly _dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly _dialogData: LoadingConfig
  ) {}

  ngOnInit(): void {
    if (this._dialogData?.position) {
      switch (this._dialogData.position) {
        case 'top':
          this._dialogRef.updatePosition({
            top: this._margin
          });
          break;
        case 'top-left':
          this._dialogRef.updatePosition({
            top: this._margin,
            left: this._margin
          });
          break;
        case 'top-right':
          this._dialogRef.updatePosition({
            top: this._margin,
            right: this._margin
          });
          break;
        case 'bottom':
          this._dialogRef.updatePosition({
            bottom: this._margin
          });
          break;
        case 'bottom-left':
          this._dialogRef.updatePosition({
            bottom: this._margin,
            left: this._margin
          });
          break;
        case 'bottom-right':
          this._dialogRef.updatePosition({
            bottom: this._margin,
            right: this._margin
          });
          break;
        case 'left':
          this._dialogRef.updatePosition({
            left: this._margin
          });
          break;
        case 'right':
          this._dialogRef.updatePosition({
            right: this._margin
          });
          break;
      }
    }
  }
}
