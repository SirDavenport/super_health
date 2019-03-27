import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { User } from "./user.model";

const host = "https://java-super-health.herokuapp.com/users/";
@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers() {
    return this.http.get(host, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }

  getUserById(id: string) {
    return this.http.get(host + id, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
  addUser(user: User) {
    return this.http.post(host, user);
  }
  updateUser(user: User) {
    return this.http.put(host + user.userId, user, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
  deleteUser(id: string) {
    return this.http.delete(host + id, {
      headers: new HttpHeaders().set("jwt", this.authService.token)
    });
  }
}
