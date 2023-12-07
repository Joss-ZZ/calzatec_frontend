import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmationConfig,
  ConfirmationResult,
  LoadingConfig,
  SnackBarConfig,
  SnackBarFuc,
  SnackBarData,
  SnackBarType
} from './alert.interfaces';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LoadingComponent } from './loading/loading.component';
import { SnackComponent } from './snack/snack.component';

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

@Injectable()
export class AlertService {
  private _snackBarFuc: SnackBarFuc | null = null;

  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _matSnackBar: MatSnackBar
  ) {}

  confirm(
    confirmationConfig: ConfirmationConfig
  ): MatDialogRef<ConfirmationComponent, ConfirmationResult> {
    return this._matDialog.open(ConfirmationComponent, {
      data: confirmationConfig,
      // width: '32rem',
      panelClass: 'ct-confirmation-dialog-panel'
    });
  }

  get loading(): {
    show: (loadingConfig?: LoadingConfig) => void;
    hide: () => void;
  } {
    let dialogRef: MatDialogRef<LoadingComponent> | null = null;

    return {
      show: (loadingConfig?): void => {
        dialogRef = this._matDialog.open(LoadingComponent, {
          disableClose: true,
          data: loadingConfig,
          hasBackdrop: loadingConfig?.hasBackdrop ?? true
        });
      },
      hide: (): void => {
        dialogRef?.close();
        dialogRef = null;
      }
    };
  }

  private _snackBarOpen(
    message: string,
    type: SnackBarType,
    duration?: number
  ): void {
    const data: SnackBarData = {
      message,
      type,
      buttonClosed: true
    };

    this._matSnackBar.openFromComponent(SnackComponent, {
      data,
      panelClass: `ct-alert-${type}`,
      duration: duration ?? 3000
    });
  }

  get snackBar(): SnackBarFuc {
    // const values = Object.values(SnackBarType);
    // const d = values.map((v) => {
    //   const x = {
    //     [v]: (message: string, duration?: number) => {
    //       this._snackBarOpen(
    //         message,
    //         capitalizeFirstLetter(v) as SnackBarType,
    //         duration
    //       );
    //     }
    //   };

    //   return x;
    // });
    if (this._snackBarFuc != null) return this._snackBarFuc;

    this._snackBarFuc = {
      success: (message: string, duration?: number): void =>
        this._snackBarOpen(message, SnackBarType.Success, duration),
      error: (message: string, duration?: number): void =>
        this._snackBarOpen(message, SnackBarType.Error, duration),
      warn: (message: string, duration?: number): void =>
        this._snackBarOpen(message, SnackBarType.Warn, duration),
      info: (message: string, duration?: number): void =>
        this._snackBarOpen(message, SnackBarType.Info, duration),
      default: (config: SnackBarConfig): void => {
        const { message, duration, horizontalPosition } = config;

        const data: SnackBarData = {
          message,
          type: null,
          buttonClosed: config.buttonClosed ?? true
        };

        this._matSnackBar.openFromComponent(SnackComponent, {
          data,
          duration,
          horizontalPosition
        });
      }
    };

    return this._snackBarFuc;
  }
}
