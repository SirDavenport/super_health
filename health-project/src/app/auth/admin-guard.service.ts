import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as appStuff from "../store/app.state";

//Guard for only places admin can visit.
@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<appStuff.AppState>
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select("authStuff").subscribe(response => {
      if (!response.roles.includes("ADMIN")) {
        return false;
      }
    });
    return true;
  }
}
