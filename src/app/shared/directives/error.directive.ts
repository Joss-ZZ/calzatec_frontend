import {
  Directive,
  ContentChild,
  EmbeddedViewRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  Input
} from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import {
  EMPTY,
  Observable,
  ReplaySubject,
  Subscription,
  combineLatest,
  distinctUntilChanged,
  map,
  startWith,
  switchMap
} from 'rxjs';

@Directive({
  selector: 'mat-form-field',
  standalone: true
})
export class HasErrorRootDirective {
  @ContentChild(MatFormFieldControl)
  set formControl(formControl: MatFormFieldControl<unknown>) {
    this._formControl$.next(formControl.ngControl as AbstractControlDirective);
  }

  get formControl$(): Observable<AbstractControlDirective> {
    return this._formControl$.asObservable();
  }

  private _formControl$ = new ReplaySubject<AbstractControlDirective>(1);
}

export interface HasErrorContext {
  $implicit: any;
}

@Directive({
  selector: '[hasError]',
  standalone: true
})
export class HasErrorDirective implements OnInit, OnDestroy {
  @Input()
  set hasError(errorName: string) {
    this.errorName$.next(errorName);
  }

  private errorName$ = new ReplaySubject<string>(1);
  private ctrl$ = this.hasErrorRoot.formControl$;

  // Notifies us whenever the status of the form control changes
  private status$ = this.ctrl$.pipe(
    switchMap((ctrl) => (ctrl.statusChanges || EMPTY).pipe(startWith(null)))
  );

  // Check if the control has the error
  // and access the error value.
  private error$ = combineLatest([
    this.ctrl$,
    this.errorName$,
    this.status$
  ]).pipe(
    map(([ctrl, errorName]) => ({
      hasError: ctrl.hasError(errorName),
      value: ctrl.getError(errorName)
    })),
    distinctUntilChanged(
      (x, y) => x.hasError === y.hasError && x.value === y.value
    )
  );

  private _view?: EmbeddedViewRef<HasErrorContext>;
  private _subscription?: Subscription;
  private _timeout!: NodeJS.Timeout;

  constructor(
    private hasErrorRoot: HasErrorRootDirective,
    private templateRef: TemplateRef<HasErrorContext>,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this._timeout = setTimeout(() => {
      this._subscription = this.error$.subscribe((error) => {
        if (!error.hasError) {
          this._view?.destroy();
          this._view = undefined;
          return;
        }

        if (this._view) {
          this._view.context.$implicit = error.value;
          this._view.markForCheck();
          return;
        }

        this._view = this.vcr.createEmbeddedView(this.templateRef, {
          $implicit: error.value
        });
      });
    });
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
    clearTimeout(this._timeout);
  }
}
