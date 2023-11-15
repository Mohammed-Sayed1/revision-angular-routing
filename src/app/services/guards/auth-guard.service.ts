/*
note: Guard is a service.
to make this class acts as guard servise:
    1. need to make it injectable by using @Injectable decorator
    2. need to make this class implements CanActivate interface
    3. add canActivate function to tell angular routing to proceed with this path or not according to this function's logic
    4. this function takes two params, 1st of type ActivatedRouteSnapshot and 2nd of type RouterStateSnapshot
    5. this function returns boolean | Promise<boolean> | Observable<boolean>
*/
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

/* we implements CanActivate to make this class acts as guard */
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/']);
    }

    /////////////////////////////////////////////////////////
    // return this.authService.isAuthenticated().then((data) => {
    //   if (data) {
    //     return true;
    //   } else {
    //     return this.router.navigate(['/']);
    //   }
    // });
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/']);
    }

    /////////////////////////////////////////////////////////
    // return this.authService.isAuthenticated().then((data) => {
    //   if (data) {
    //     return true;
    //   } else {
    //     return this.router.navigate(['/']);
    //   }
    // });
  }
}
