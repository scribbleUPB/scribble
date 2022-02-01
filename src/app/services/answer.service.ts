import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { answer } from '../models/answer.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { individualResp } from '../models/individualResp.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private answer!: answer;
  private fetchAnswer = new Subject<answer>();


  constructor(private http: HttpClient, private router: Router) { }
  saveAnswer(answer: answer) {
    this.http.post(`${environment.apiUrl}answers`, answer)
      .subscribe(res => {
        console.log(res)
      })
  }

  getAnswer(id: string) {
    this.http.get<answer>(`${environment.apiUrl}answers/${id}`)
      .subscribe(res => {
        this.answer = res;
        this.fetchAnswer.next(this.answer)
      })
  }

  updateAnswer(id: string, responses: any) {
    let resp = responses
    this.http.put(`${environment.apiUrl}answers/${id}`, resp)
      .subscribe(res => {
        console.log(res)
      })
  }

  getAnswerListener() {
    return this.fetchAnswer.asObservable()
  }
}
