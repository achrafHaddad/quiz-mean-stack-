import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class GuardCandidate implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if (this.auth.getToken() && this.auth.getRole() == "candidat") {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
