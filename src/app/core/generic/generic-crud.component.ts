import { Directive, OnInit, inject, signal, Type } from '@angular/core';
import { NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { renderButtonsFooter } from '@calzatec/shared/utils/dialog';
import { TypeForm, ErrorFc, errorForm } from '@calzatec/shared/utils/form';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';
import { GenericCrud } from './generic-crud';
import { Action } from '@calzatec/shared/enums/action.enum';
import { DialogData } from '@calzatec/shared/interfaces/dialog.interface';

export type DialogConfig = Omit<DynamicDialogConfig, 'data'>;

@Directive()
export abstract class GenericCrudComponetList<C, U, R> implements OnInit {
	private readonly _dialogService = inject(DialogService);
	private readonly _confirmationService = inject(ConfirmationService);
	private readonly _messageService = inject(MessageService);

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

	remove(id: number): void {
		this._confirmationService.confirm({
			message: 'Esta seguro que desea eliminar este registro.',
			header: 'Eliminar',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Si',
			accept: async () => {
				await firstValueFrom(this._service.delete(id));

				this._messageService.add({
					severity: 'success',
					summary: 'Eliminado',
					detail: 'Registro eliminado correctamente',
				});

				this.list();
			},
		});
	}

	private _openDialog(action: Action, id?: number): void {
		const config: DialogConfig = {
			...this.dialogConfig,
			header: `${action === Action.Create ? 'Nuevo' : 'Actualizar'} ${this.dialogConfig.header}`,
		};

		const data: DialogData = {
			action,
			id,
		};

		const dialogRef = this._dialogService.open(this._dialogComponent, {
			...config,
			data,
		});

		const dialogRef$ = dialogRef.onClose.subscribe((result: R | boolean) => {
			if (result == null) {
				dialogRef$.unsubscribe();
				return;
			}

			if (typeof result === 'boolean') {
				this.list();
				dialogRef$.unsubscribe();
				return;
			}

			this.results.update((results) => [result, ...results]);
			dialogRef$.unsubscribe();
		});
	}

	globalFilter(table: Table, event: Event): void {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}
}

@Directive()
export abstract class GenericCrudComponetDialog<C, U, R> implements OnInit {
	private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
	private readonly _dynamicDialogRef = inject(DynamicDialogRef);
	private readonly _messageService = inject(MessageService);

	protected readonly formBuilder = inject(NonNullableFormBuilder);

	abstract formGroup: FormGroup<TypeForm<C>>;

	abstract RENDER_ID: string;

	error!: ErrorFc<C>;

	loading = signal(false);

	private readonly _renderButtons = renderButtonsFooter([
		{
			idButton: 'btn-cancel',
			icon: 'pi pi-times',
			btnClass: 'p-button-rounded p-button-text',
			text: 'Cancelar',
			callBack: (): void => {
				this._dynamicDialogRef.close(null);
			},
		},
		{
			idButton: 'btn-accept',
			btnClass: 'p-button-rounded',
			icon: 'pi pi-check',
			text: 'Aceptar',
			disabled: true,
			callBack: (): void => {
				void this.save();
			},
		},
	]);

	constructor(protected readonly _service: GenericCrud<C, U, R>) {}

	ngOnInit(): void {
		this.error = errorForm<C>(this.formGroup);
		this._renderButtons.reactive(['btn-accept'], this.formGroup);
		this._renderButtons.render(this.RENDER_ID);

		this.find();
	}

	get dialogData(): DialogData {
		const dialogData = this._dynamicDialogConfig.data as DialogData;
		return dialogData;
	}

	async find(): Promise<void> {
		if (this.dialogData) {
			const { id, action } = this.dialogData;

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

		const { id, action } = this.dialogData;

		try {
			if (Action.Update === action && id) {
				await firstValueFrom(this._service.update(id, value as unknown as U));
				this._dynamicDialogRef.close(true);

				this._messageService.add({
					severity: 'success',
					summary: 'Actualizado',
					detail: 'Registro actualizado correctamente',
				});
			}

			if (Action.Create === action) {
				const result = await firstValueFrom(this._service.insert(value as unknown as C));
				this._dynamicDialogRef.close(result);

				this._messageService.add({
					severity: 'success',
					summary: 'Registrado',
					detail: 'Registro registrado correctamente',
				});
			}
		} finally {
			this.loading.set(false);
		}
	}
}
