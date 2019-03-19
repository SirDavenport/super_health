import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from "@angular/router";
import { Injectable } from "@angular/core";
import { PatientsService } from "./patients.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class PatientGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.token != null;
  }
}
