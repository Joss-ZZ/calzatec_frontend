import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AlertService } from './alert.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LoadingComponent } from './loading/loading.component';
import { SnackComponent } from './snack/snack.component';

@NgModule({
  declarations: [ConfirmationComponent, LoadingComponent, SnackComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [AlertService]
})
export class AlertModule {}
