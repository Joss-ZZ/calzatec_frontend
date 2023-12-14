import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { NgIf, AsyncPipe, NgStyle } from '@angular/common';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { SpinnerTableComponent } from '@calzatec/shared/components/spinner-table/spinner-table.component';
import { GenericCrudComponetList } from '@calzatec/core/generic/generic-crud.component';
import { DialogConfig } from '@calzatec/core/generic/generic-crud';
import {
  ButtonTable,
  ButtonTableComponent
} from '@calzatec/shared/components/button-table/button-table.component';
import { ColDefCustom } from '@calzatec/shared/interfaces/aggrid.interface';
import { defaultGridOptions } from '@calzatec/shared/utils/aggrid';
import { BodyService } from '@calzatec/shared/services/body.service';
import { BodyDialogComponent } from './dialog/body-dialog/body-dialog.component';
import { CreateBodyDto, ResponseBodyDto, UpdateBodyDto } from '@calzatec/shared/models/body.dto';

@Component({
  selector: 'app-color',
  templateUrl: './body.component.html',
  standalone: true,
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ],
  imports: [
    AgGridModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    NgIf,
    AsyncPipe,
    NgStyle,
    SpinnerTableComponent,
    ButtonTableComponent
  ]
})
export class BodyComponent extends GenericCrudComponetList<
  CreateBodyDto,
  UpdateBodyDto,
  ResponseBodyDto
> {
  dialogConfig: DialogConfig = {
    title: 'capellada',
    width: '30em'
  };

  style = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto'
  };

  gridOptions: GridOptions = {
    ...defaultGridOptions
  };

  columnDefs: ColDefCustom<ResponseBodyDto, ButtonTable<ResponseBodyDto>>[] =
    [
      { headerName: 'Nombre', field: 'name' },
      {
        headerName: 'Acciones',
        cellRenderer: ButtonTableComponent,
        cellRendererParams: {
          update: (value) => {
            console.log('update', { value });
            this.update(value.bodyId);
          },
          delete: (value) => {
            console.log('delete', { value });
            this.remove(value.bodyId);
          }
        }
      }
    ];
    constructor(readonly _bodyService: BodyService) {
      super(_bodyService, BodyDialogComponent);
    }
}
