import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StorageService } from "src/app/service/storage.service";
import { MatRadioChange, MatRadioButton } from "@angular/material/radio";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.css"],
})
export class AnswersComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: StorageService) {}

  @Output() change: EventEmitter<MatRadioChange>;
  id;
  quiz;
  indexQ = 0;
  isCheked = true;
  response: string = "start";
  ans: any[] = [{ choice: this.response }];
  count = 0;
  i = 0;
  score: string;

  changeIndex(number) {
    if (
      (this.indexQ > 0 && number < 0) || //index must be greater than 0 at all times
      (this.indexQ < this.quiz?.questions.length && number > 0)
    ) {
      //index must be less than length of array
      this.indexQ += number;
    }
  }

  oncheck(event: MatRadioChange, i) {
    let radio: MatRadioButton = event.source;

    this.ans[i].choice = radio.value;
  }

  onSubmit() {
    while (this.i < this.ans.length - 1) {
      if (
        this.quiz.questions[this.i].correctAnswer === this.ans[this.i].choice
      ) {
        this.count++;
      }
      this.i++;
    }
    this.score = `${Math.floor((this.count / this.ans.length) * 100)} %`;
    this.ans.push({ score: this.score });
    this.store.postAnswer(this.quiz._id, this.ans).subscribe((res) => {
      // console.log(res);
    });
    // console.log(this.ans);
    // console.log(this.ans);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.store.detailQuiz(this.id).subscribe((res) => {
      this.quiz = res;

      for (let i = 1; i < this.quiz.questions.length; i++) {
        this.ans.push({ choice: this.response });
      }
    });
  }
}
