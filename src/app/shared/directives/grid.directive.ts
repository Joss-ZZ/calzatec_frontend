import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[GridDirective]',
  standalone: true
})
export class GridDirective {
  constructor(private readonly _vi: TemplateRef<any>) {
    console.log(this._vi.elementRef.nativeElement);
  }
}
