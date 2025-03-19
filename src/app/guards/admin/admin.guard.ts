import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.GetCurrentUser().pipe(
    map(res => {
      // Check user is logged in
      if (res.error) {
        return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
      } else {
        // Check user is an admin
        if(res.data.user.user_metadata["role"] == "admin") {
          return true;
        } else {
          return router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
        }
      }
    }),
    catchError((error, caught) => {
      console.error('Error during authentication check:', error);
      return of(router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } }));
    })
  );
};
