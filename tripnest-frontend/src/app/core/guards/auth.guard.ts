import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Check if route requires admin roles
      if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
        // Role not authorized, redirect to home
        this.router.navigate(['/']);
        return false;
      }
      // Authorized
      return true;
    }

    // Not logged in, redirect to login page with returnUrl
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
