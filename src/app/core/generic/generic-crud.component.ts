import {
  Directive,
  OnInit,
  inject,
  signal,
  Type,
  computed
} from '@angular/core';
import { NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { TypeForm, ErrorFc, errorForm } from '@calzatec/shared/utils/form';
import { firstValueFrom } from 'rxjs';
import { DialogConfig, GenericCrud } from './generic-crud';
import { Action } from '@calzatec/shared/enums/action.enum';
import { DialogData } from '@calzatec/shared/interfaces/dialog.interface';
import { AlertService } from '../service/alert/alert.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';

@Directive()
export abstract class GenericCrudComponetList<C, U, R> implements OnInit {
  private readonly _messageService = inject(AlertService);
  private readonly _matDialog = inject(MatDialog);

  private readonly _snackBar = this._messageService.snackBar;

  results = signal<R[]>([]);
  loading = signal(true);

  abstract dialogConfig: DialogConfig;

  constructor(
    protected readonly _service: GenericCrud<C, U, R>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected readonly _dialogComponent: Type<any>
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.loading.set(true);

    const result$ = this._service.findAll().subscribe((colors) => {
      console.log({ colors });
      this.results.set(colors);
      this.loading.set(false);
      result$.unsubscribe();
    });
  }

  create(): void {
    this._openDialog(Action.Create);
  }

  update(id: number): void {
    this._openDialog(Action.Update, id);
  }

  async remove(id: number): Promise<void> {
    const confirm$ = this._messageService
      .confirm({
        title: 'Eliminar',
        message: 'Esta seguro que desea eliminar este registro.'
      })
      .afterClosed();

    const result = await firstValueFrom(confirm$);

    if (result === 'acepted') {
      await firstValueFrom(this._service.delete(id));
      this._snackBar.success('Registro eliminado correctamente');
      this.list();
    }
  }

  private _openDialog(action: Action, id?: number): void {
    const { title, ...res } = this.dialogConfig;

    const config: MatDialogConfig<DialogData> = {
      ...res,
      data: {
        action,
        title,
        id
      }
    };

    const dialogRef$ = this._matDialog
      .open(this._dialogComponent, config)
      .afterClosed();
    const dialogRefSub = dialogRef$.subscribe((result: R | boolean) => {
      if (result == null) {
        dialogRefSub.unsubscribe();
        return;
      }
      if (typeof result === 'boolean') {
        this.list();
        dialogRefSub.unsubscribe();
        return;
      }
      this.results.update((results) => [result, ...results]);
      dialogRefSub.unsubscribe();
    });
  }

  // globalFilter(table: Table, event: Event): void {
  // 	table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  // }
}

@Directive()
export abstract class GenericCrudComponetDialog<C, U, R> implements OnInit {
  // private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _messageService = inject(AlertService);
  private readonly _matDialogRef = inject(
    MatDialogRef<GenericCrudComponetDialog<C, U, R>>
  );
  private readonly _dialogData = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly _snackBar = this._messageService.snackBar;

  abstract formGroup: FormGroup<TypeForm<C>>;

  error!: ErrorFc<C>;

  loading = signal(false);
  isEdit = signal(false);
  text = computed(() => {
    const { title } = this._dialogData;
    if (this.isEdit()) return `Actualizar ${title}`;
    return `Crear ${title}`;
  });

  constructor(protected readonly _service: GenericCrud<C, U, R>) {}

  ngOnInit(): void {
    this.error = errorForm<C>(this.formGroup);

    this.find();

    this.isEdit.set(this._dialogData.action === Action.Update);
  }

  async find(): Promise<void> {
    if (this._dialogData) {
      const { id, action } = this._dialogData;

      if (action === Action.Update && id) {
        this.loading.set(true);

        const result: R = await firstValueFrom(this._service.findOne(id));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.formGroup.patchValue({ ...(result as any) });

        this.loading.set(false);
      }
    }
  }

  async save(): Promise<void> {
    if (!this.formGroup.valid) return;
    this.loading.set(true);

    const value = this.formGroup.getRawValue();

    const { id, action } = this._dialogData;

    try {
      if (Action.Update === action && id) {
        await firstValueFrom(this._service.update(id, value as unknown as U));
        this._matDialogRef.close(true);
        this._snackBar.success('Registro actualizado correctamente');
      }

      if (Action.Create === action) {
        const result = await firstValueFrom(
          this._service.insert(value as unknown as C)
        );
        this._matDialogRef.close(result);
        this._snackBar.success('Registro registrado correctamente');
      }
    } finally {
      this.loading.set(false);
    }
  }
}
