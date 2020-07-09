import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  id: string;
  role: string;

  isLogged = new BehaviorSubject<boolean>(this.logged());

  isCoach = new BehaviorSubject<boolean>(this.coach());

  isCandidate = new BehaviorSubject<boolean>(this.candidate());

  constructor(private http: HttpClient) {}

  private coach(): boolean {
    this.role = this.getRole();
    if (this.role == "") return false;
    else if (this.role === "coach") return true;
  }
  private candidate(): boolean {
    this.role = this.getRole();
    if (this.role == "") return false;
    else if (this.role === "candidat") return true;
  }

  private logged(): boolean {
    return !!localStorage.getItem("token");
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  loggedCoach(): Observable<boolean> {
    return this.isCoach.asObservable();
  }

  loggedCandidate(): Observable<boolean> {
    return this.isCandidate.asObservable();
  }

  logout() {
    localStorage.removeItem("token");
    return this.isLogged.next(false);
  }

  signup(user) {
    return this.http.post("http://localhost:3000/user/signup", user);
  }

  signin(user) {
    return this.http.post("http://localhost:3000/user/signin", user);
  }

  getUsers(quizId) {
    return this.http.get(`http://localhost:3000/user/${quizId}`);
  }
  getCandidates(quizId) {
    return this.http.get(`http://localhost:3000/user/candidate/${quizId}`);
  }

  getId() {
    const token = this.getToken();
    return (this.id = jwt_decode(token).data._id);
  }
  getRole() {
    const token = this.getToken();
    if (token != "") return (this.role = jwt_decode(token).data.role);
    else return "";
  }

  getToken() {
    const token = localStorage.getItem("token");
    if (token != undefined && token != null) return token;
    else return "";
  }

  deleteToken() {
    return localStorage.removeItem("token");
  }
}
