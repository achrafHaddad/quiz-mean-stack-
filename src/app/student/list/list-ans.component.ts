import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/service/storage.service";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-list",
  templateUrl: "./list-ans.component.html",
  styleUrls: ["./list-ans.component.css"],
})
export class ListAnsComponent implements OnInit {
  constructor(private store: StorageService, private auth: AuthService) {}

  list;
  name;
  score;
  id;

  getQuiz() {
    this.store.getResult(this.auth.getId()).subscribe((res) => {
      this.list = res;
      console.log(res);
    });
  }

  // getResulT() {
  //   this.store
  //     .getResult(this.auth.getId())
  //     .subscribe((res: { quizId: string; score: string }) => {
  //       console.log(res);
  //       this.score = res;
  //     });
  // }

  ngOnInit(): void {
    this.getQuiz();
    // this.getResulT();
  }
}
