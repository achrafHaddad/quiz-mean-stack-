import { Component, OnInit } from "@angular/core";
import { StorageService } from "../service/storage.service";
import { AuthService } from "../service/auth.service";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private store: StorageService, private auth: AuthService) {}
  list;
  quizId = [];
  nameList = [];
  role;

  getQuiz() {
    this.store.getAllQuiz().subscribe((res) => {
      this.list = res;
    });
  }

  ngOnInit(): void {
    this.getQuiz();
    this.role = this.auth.getRole();
  }
}
