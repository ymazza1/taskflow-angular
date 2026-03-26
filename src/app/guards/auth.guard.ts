import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const isAuthenticated = () => true;

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isAuthenticated()) {
    return true;
  }

  return router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
