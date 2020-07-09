import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isCoach: Observable<boolean>;
  isLogged: Observable<boolean>;
  isCandidate: Observable<boolean>;
  toggled = true;

  constructor(private auth: AuthService, private router: Router) {}

  toggle() {
    this.toggled = !this.toggled;
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.isLogged = this.auth.isLoggedIn();
    this.isCoach = this.auth.loggedCoach();
    this.isCandidate = this.auth.loggedCandidate();
  }
}
