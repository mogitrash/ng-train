import { map, take } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccess } from '../store/user/user.selectors';

export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAccess).pipe(
    take(1),
    map((currentAccess) => {
      if (currentAccess === 'guest') {
        return true;
      }
      router.navigate(['/']);
      return false;
    }),
  );
};
