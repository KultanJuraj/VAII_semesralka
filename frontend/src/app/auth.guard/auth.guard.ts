import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  if (this.userService.isLoggedin()) {
    return Promise.resolve(true);
  }
  return this.router.navigateByUrl('/login').then(() => false);
}
  }