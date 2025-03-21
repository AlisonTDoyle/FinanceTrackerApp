import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.GetCurrentUser().pipe(
    map(res => {
      if (res.error) {
        return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
      } else {
        return true;
      }
    }),
    catchError((error, caught) => {
      console.error('Error during authentication check:', error);
      return of(router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } }));
    })
  );
};
