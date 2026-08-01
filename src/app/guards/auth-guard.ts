import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userName = sessionStorage.getItem('UserName');
  const password = sessionStorage.getItem('Password');

  if (userName && password) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
