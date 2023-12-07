import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface ButtonTable<T> {
  update: (value: T) => void;
  delete: (value: T) => void;
}

@Component({
  selector: 'ct-button-table',
  template: `
    <div class="flex gap-1 items-center">
      <button mat-fab color="warn" (click)="delete()" aria-label="delete">
        <mat-icon svgIcon="mat:delete"></mat-icon>
      </button>
      <button mat-fab color="primary" (click)="update()" aria-label="update">
        <mat-icon svgIcon="mat:edit"></mat-icon>
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class ButtonTableComponent implements ICellRendererAngularComp {
  private params!: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  update() {
    this.params.update(this.params.data);
  }

  delete() {
    this.params.delete(this.params.data);
  }
}
