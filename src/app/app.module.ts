import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRadioModule } from "@angular/material/radio";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./sign/signup/signup.component";
import { SigninComponent } from "./sign/signin/signin.component";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./quiz/list/list.component";
import { NewComponent } from "./quiz/new/new.component";
import { DetailComponent } from "./quiz/detail/detail.component";
import { AnswersComponent } from "./student/answers/answers.component";
import { ListAnsComponent } from "./student/list/list-ans.component";
import { TokenInterceptor } from "./service/token.intercepter";
import { HeaderComponent } from "./header/header.component";
import { CandidatListComponent } from './quiz/candidat-list/candidat-list.component';
import { AnswerPrintComponent } from './student/answer-print/answer-print.component';
import { EditQuizComponent } from './quiz/edit-quiz/edit-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ListComponent,
    NewComponent,
    DetailComponent,
    AnswersComponent,
    ListAnsComponent,
    HeaderComponent,
    CandidatListComponent,
    AnswerPrintComponent,
    EditQuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRadioModule,
    NgbModule,
    NgbCollapseModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
