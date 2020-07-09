import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/service/storage.service";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  constructor(private store: StorageService, private auth: AuthService) {}
  list;
  listAnswers = [];

  getQuiz() {
    this.store.getQuiz(this.auth.getId()).subscribe((res: { quiz }) => {
      this.list = res.quiz;

      this.getCandidatesAnswers();
    });
  }

  getCandidatesAnswers() {
    this.store.getAllAnswers().subscribe((answers: [{ result }]) => {
      let count = 0;
      this.list.forEach((lis) => {
        let list = answers.filter((l) => l.result[0].quizId === lis._id);
        count = list.length;
        let obj = { quizId: lis._id, count: count };
        this.listAnswers.push(obj);
        count = 0;
      });
    });
  }

  ngOnInit(): void {
    this.getQuiz();
  }
}
