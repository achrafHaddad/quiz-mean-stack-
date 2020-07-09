import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { StorageService } from "src/app/service/storage.service";
import { Quiz } from "../quiz.model";

@Component({
  selector: "app-edit-quiz",
  templateUrl: "./edit-quiz.component.html",
  styleUrls: ["./edit-quiz.component.css"],
})
export class EditQuizComponent implements OnInit {
  constructor(
    private store: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  quizForm;
  uid;
  editedQuiz: Quiz | null = null;
  quizId: string | null = null;
  questionEdit;
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

  editQuiz() {
    const quiz: Quiz[] = this.quizForm.value;

    this.store.editQuiz(quiz, this.quizId).subscribe((res) => {
      // console.log(res);
    });
  }

  getQuizById() {
    return this.store.detailQuiz(this.quizId).subscribe((q: Quiz) => {
      this.editedQuiz = q;
      // console.log(this.editedQuiz);
      this.formQuiz();
    });
  }
  ngOnInit(): void {
    this.quizId = this.route.snapshot.params["quizId"];
    this.getQuizById();
  }

  onEdit() {
    this.editQuiz();
    this.router.navigate(["/detail-quiz", this.quizId]);
  }

  private formQuiz() {
    let titleEdit = "";
    let timeEdit = 0;

    this.questionEdit = new FormArray([]);
    titleEdit = this.editedQuiz.title;
    timeEdit = this.editedQuiz.time;
    for (let quest of this.editedQuiz.questions)
      this.questionEdit.push(
        new FormGroup({
          question: new FormControl(quest.question),
          rep1: new FormControl(quest.rep1),
          rep2: new FormControl(quest.rep2),
          rep3: new FormControl(quest.rep3),
          rep4: new FormControl(quest.rep4),
          correctAnswer: new FormControl(quest.correctAnswer),
        })
      );

    this.quizForm = new FormGroup({
      title: new FormControl(titleEdit),
      time: new FormControl(timeEdit),
      questions: this.questionEdit,
    });
  }
}
