import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { ILoadingOverlayParams } from 'ag-grid-community';

@Component({
  selector: 'ct-spinner-table',
  templateUrl: './spinner-table.component.html',
  styleUrls: ['./spinner-table.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SpinnerTableComponent implements ILoadingOverlayAngularComp {
  public params!: ILoadingOverlayParams & { loadingMessage: string };

  agInit(params: ILoadingOverlayParams & { loadingMessage: string }): void {
    this.params = params;
  }
}
