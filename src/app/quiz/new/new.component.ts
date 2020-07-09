import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { StorageService } from "src/app/service/storage.service";
import { Quiz } from "../quiz.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"],
})
export class NewComponent implements OnInit {
  constructor(
    private store: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  quizForm;
  uid;
  response = [
    { name: "response 1" },
    { name: "response 2" },
    { name: "response 3" },
    { name: "response 4" },
  ];

  get questGroup() {
    return new FormGroup({
      question: new FormControl(""),
      rep1: new FormControl(""),
      rep2: new FormControl(""),
      rep3: new FormControl(""),
      rep4: new FormControl(""),
      correctAnswer: new FormControl("", Validators.required),
    });
  }

  get questions() {
    return (this.quizForm.get("questions") as FormArray).controls;
  }

  addQuest() {
    (this.quizForm.get("questions") as FormArray).push(this.questGroup);
  }
  delquest(i) {
    (this.quizForm.get("questions") as FormArray).removeAt(i);
  }

  postQuiz() {
    const quiz: Quiz[] = this.quizForm.value;
    this.store.postQuiz(quiz).subscribe((res) => {
      // console.log(res);
    });
  }

  ngOnInit(): void {
    this.formQuiz();
  }

  private formQuiz() {
    this.quizForm = new FormGroup({
      title: new FormControl(""),
      time: new FormControl(""),
      questions: new FormArray([this.questGroup]),
    });
  }
  submit() {
    this.postQuiz();
    this.quizForm.reset();
    this.router.navigate(["/list-quiz"]);
  }
}
