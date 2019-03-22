import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { PatientsService } from "./patients.service";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
//Make sure logged in before viewing certain pages, otherwise redirect to login.
export class PatientGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.token == null) {
      this.router.navigate(["/login"]);
    }
    return this.authService.token != null;
  }
}
