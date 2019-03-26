import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Store } from "@ngrx/store";
import * as appStuff from "./store/app.state";

@Injectable({ providedIn: "root" })
//Make sure logged in before viewing certain pages, otherwise redirect to login.
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<appStuff.AppState>
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select("authStuff").subscribe(response => {
      if (response.token == null) {
        this.router.navigate(["/login"]);
      }
    });
    return true;
  }
}
