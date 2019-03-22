import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
//Guard to make sure they are logged in before trying to view encounter staff.
//If you aren't, redirects you to login page.
export class EncounterGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.token == null) {
      this.router.navigate(["/login"]);
    }
    return this.authService.token != null;
  }
}
