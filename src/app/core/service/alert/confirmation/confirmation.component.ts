import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { mergeDeep } from '@vex/utils/merge-deep';

import { dialogClose } from '@calzatec/shared/utils/dialog';

import { ConfirmationConfig, ConfirmationResult } from '../alert.interfaces';

@Component({
  selector: 'ct-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnDestroy {
  // Default config
  private _defaultConfirmationConfig: ConfirmationConfig = {
    title: '',
    message: '',
    icon: {
      show: true,
      name: 'mat:warning',
      color: 'text-red-500 bg-red-100'
    },
    actions: {
      confirm: {
        show: true,
        label: 'ACEPTAR',
        color: 'primary'
      },
      cancel: {
        show: true,
        label: 'CANCELAR'
      },
      close: true
    },
    dismissible: true
  };

  config!: ConfirmationConfig;

  private _subscription!: Subscription;

  constructor(
    private readonly _matDialogRef: MatDialogRef<
      ConfirmationComponent,
      ConfirmationResult
    >,
    @Inject(MAT_DIALOG_DATA) public matDialogData: ConfirmationConfig
  ) {
    if (this.matDialogData) {
      this.config = mergeDeep(
        this._defaultConfirmationConfig,
        this.matDialogData
      );
    } else {
      this.config = { ...this._defaultConfirmationConfig };
    }

    if (!this.config.dismissible) this._matDialogRef.disableClose = true;
    else {
      this._subscription = dialogClose(this._matDialogRef, () => this.cancel());
    }
  }

  cancel(): void {
    this._matDialogRef.close('canceled');
  }

  acepted(): void {
    this._matDialogRef.close('acepted');
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
