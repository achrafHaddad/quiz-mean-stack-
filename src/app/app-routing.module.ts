import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewComponent } from "./quiz/new/new.component";
import { SigninComponent } from "./sign/signin/signin.component";
import { SignupComponent } from "./sign/signup/signup.component";
import { ListComponent } from "./quiz/list/list.component";
import { DetailComponent } from "./quiz/detail/detail.component";
import { AnswersComponent } from "./student/answers/answers.component";
import { ListAnsComponent } from "./student/list/list-ans.component";
import { HomeComponent } from "./home/home.component";
import { CandidatListComponent } from "./quiz/candidat-list/candidat-list.component";
import { AnswerPrintComponent } from "./student/answer-print/answer-print.component";
import { EditQuizComponent } from "./quiz/edit-quiz/edit-quiz.component";
import { GuardCandidate } from "./service/guard-candidate.guard";
import { GuardCoach } from "./service/guard-coach.guard";
import { Guard } from "./service/guard.guard";

const routes: Routes = [
  { path: "", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "home",
    canActivate: [Guard],
    component: HomeComponent,
  },
  { path: "new-quiz", canActivate: [GuardCoach], component: NewComponent },
  {
    path: "edit-quiz/:quizId",
    canActivate: [GuardCoach],
    component: EditQuizComponent,
  },
  { path: "list-quiz", canActivate: [GuardCoach], component: ListComponent },
  {
    path: "detail-quiz/:id",
    canActivate: [GuardCoach],
    component: DetailComponent,
  },
  {
    path: "answer/:id",
    canActivate: [Guard],
    component: AnswersComponent,
  },
  {
    path: "list-answer",
    canActivate: [GuardCandidate],
    component: ListAnsComponent,
  },
  {
    path: "candidate-list/:quizId",
    canActivate: [Guard],
    component: CandidatListComponent,
  },
  {
    path: "print/:idUser/:quizId",
    canActivate: [Guard],
    component: AnswerPrintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
