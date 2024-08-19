import { map, take } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentAccess } from '../store/user/user.selectors';

export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCurrentAccess).pipe(
    take(1),
    map((currentAccess) => {
      if (currentAccess === 'admin') {
        return true;
      }
      router.navigate(['/signin']);
      return false;
    })
  );
};
