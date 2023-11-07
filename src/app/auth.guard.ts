import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './services';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private authorizationService: AuthorizationService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authorizationService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
