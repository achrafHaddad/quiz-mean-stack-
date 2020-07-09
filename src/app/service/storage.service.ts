import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private http: HttpClient) {}

  getAllQuiz() {
    return this.http.get("http://localhost:3000/quiz");
  }
  getAllAnswers() {
    return this.http.get("http://localhost:3000/answer");
  }

  getAnswerById(userId, quizId) {
    return this.http.get(`http://localhost:3000/answer/${userId}/${quizId}`);
  }

  getQuiz(id) {
    return this.http.get(`http://localhost:3000/quiz/${id}`);
  }

  getResult(id) {
    return this.http.get(`http://localhost:3000/quiz/candidat/${id}`);
  }

  detailQuiz(id) {
    return this.http.get(`http://localhost:3000/quiz/detail/${id}`);
  }

  postQuiz(quiz) {
    return this.http.post("http://localhost:3000/quiz", quiz);
  }

  editQuiz(quiz, id) {
    return this.http.put(`http://localhost:3000/quiz/edit/${id}`, quiz);
  }

  deleteQuiz(id) {
    return this.http.delete(`http://localhost:3000/quiz/${id}`);
  }

  postAnswer(quiz, answer) {
    return this.http.post(`http://localhost:3000/answer/${quiz}`, answer);
  }
}
