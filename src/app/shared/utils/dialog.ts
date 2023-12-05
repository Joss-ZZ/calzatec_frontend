import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export function dialogClose<T>(
  matDialogRef: MatDialogRef<T>,
  callback: () => void
): Subscription {
  const subscription$ = new Subscription();

  matDialogRef.disableClose = true;

  subscription$.add(
    matDialogRef.keydownEvents().subscribe((e: KeyboardEvent) => {
      if (e.key === 'Escape') callback();
    })
  );

  subscription$.add(
    matDialogRef.backdropClick().subscribe(() => {
      callback();
    })
  );

  return subscription$;
}
