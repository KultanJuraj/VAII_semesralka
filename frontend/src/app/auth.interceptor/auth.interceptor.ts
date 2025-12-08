import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedin()) {
    req = req.clone({
      setHeaders: {
        Authorization: userService.getToken()!
      }
    });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (userService.isLoggedin() && err.status === 401) {
        userService.logout();
        router.navigateByUrl('/');
      }
      throw err;
    })
  );
};
