import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/service/storage.service";
import { AuthService } from "src/app/service/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  constructor(
    private store: StorageService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  quiz;
  id;
  detailQuiz() {
    this.id = this.route.snapshot.params["id"];

    this.store.detailQuiz(this.id).subscribe((res) => {
      // console.log(res);
      this.quiz = res;
    });
  }

  onDelete() {
    this.store.deleteQuiz(this.id).subscribe((res) => {
      this.router.navigate(["/list-quiz"]);
    });
  }
  ngOnInit(): void {
    this.detailQuiz();
  }
}
