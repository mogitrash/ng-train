import { map, take } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccess } from '../store/user/user.selectors';
import { getUser } from '../store/user/user.actions';

export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    store.dispatch(getUser());
    return store.select(selectAccess).pipe(
      take(1),
      map((currentAccess) => {
        console.log(currentAccess);
        if (currentAccess === 'manager') {
          return true;
        }
        router.navigate(['/signin']);
        return false;
      }),
    );
  }

  router.navigate(['/signin']);
  return false;
};
