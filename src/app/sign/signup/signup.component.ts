import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private auth: AuthService) {}
  signForm: FormGroup;

  getErrorMessage() {
    if (this.signForm.get("email").hasError("required")) {
      return "You must enter a value";
    }

    return this.signForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }

  signup() {
    const user = {
      name: this.signForm.value.name,
      email: this.signForm.value.email,
      password: this.signForm.value.password,
      role: this.signForm.value.role,
    };
    this.auth.signup(user).subscribe((user) => {
      // console.log(user);
    });
    // console.log(this.signForm.value);
  }

  ngOnInit(): void {
    this.signForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl(false),
    });
  }
}
