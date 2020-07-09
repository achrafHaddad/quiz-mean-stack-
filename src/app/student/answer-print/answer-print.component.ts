import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/service/storage.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-answer-print",
  templateUrl: "./answer-print.component.html",
  styleUrls: ["./answer-print.component.css"],
})
export class AnswerPrintComponent implements OnInit {
  constructor(private store: StorageService, private route: ActivatedRoute) {}
  userId;
  quizId;
  quiz;
  answer;

  getAnswerById() {
    this.store
      .getAnswerById(this.userId, this.quizId)
      .subscribe((res: { result }) => {
        this.answer = res.result[0].responses;
        this.quiz = res.result[0].quizId;
        // console.log(this.quiz);
        // console.log(this.answer);
      });
  }

  // getQuiz() {
  //   this.store.detailQuiz(this.quizId).subscribe((res) => {
  //     this.quiz = res;
  //     console.log(res);
  //   });
  // }

  // getQuiz() {
  //   this.store.getResult(this.quizId).subscribe((res) => {
  //     // this.answer = res.result[0].answerId.result[0];
  //     // this.quiz = res.quiz[0];
  //     // console.log(this.answer);
  //     // console.log(this.quiz);
  //     console.log(res);
  //   });
  // }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["idUser"];
    this.quizId = this.route.snapshot.params["quizId"];
    this.getAnswerById();
    // this.getQuiz();
  }
}
