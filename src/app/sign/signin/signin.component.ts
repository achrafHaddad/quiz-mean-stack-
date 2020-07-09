import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  signForm: FormGroup;

  getErrorMessage() {
    if (this.signForm.get("email").hasError("required")) {
      return "You must enter a value";
    }

    return this.signForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }

  signin() {
    const user = {
      email: this.signForm.value.email,
      password: this.signForm.value.password,
    };
    this.auth.signin(user).subscribe((res: { token: string }) => {
      localStorage.setItem("token", res.token);
      this.auth.isLogged.next(true);
      if (this.auth.getRole() === "coach") {
        this.auth.isCoach.next(true);
        this.auth.isCandidate.next(false);
      } else {
        this.auth.isCoach.next(false);
        this.auth.isCandidate.next(true);
      }
      this.router.navigate(["/home"]);
    });
  }

  ngOnInit(): void {
    this.auth.deleteToken();

    this.signForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }
}
