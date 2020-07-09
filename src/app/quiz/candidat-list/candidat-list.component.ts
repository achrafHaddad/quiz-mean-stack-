import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/service/storage.service";
import { AuthService } from "src/app/service/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-candidat-list",
  templateUrl: "./candidat-list.component.html",
  styleUrls: ["./candidat-list.component.css"],
})
export class CandidatListComponent implements OnInit {
  constructor(
    private store: StorageService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  list;
  quizId;

  getUsers() {
    this.auth.getCandidates(this.quizId).subscribe((res) => {
      // console.log(res);
      this.list = res;
    });
  }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params["quizId"];
    this.getUsers();
    // console.log(this.quizId);
  }
}
