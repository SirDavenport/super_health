import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as appStuff from "../store/app.state";
import { switchMap, take } from "rxjs/operators";
import * as fromAuth from "../store/auth.reducers";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<appStuff.AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes("login")) {
      return next.handle(req);
    }

    return this.store.select("authStuff").pipe(
      take(1),
      switchMap((authState: fromAuth.AuthState) => {
        const copiedReq = req.clone({
          headers: new HttpHeaders().set("jwt", authState.token)
        });
        return next.handle(copiedReq);
      })
    );
  }
}
