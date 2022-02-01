import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollSaveService {
  private polls: poll[] = [];
  private singlePoll!: poll
  private fetchPolls = new Subject<poll[]>();
  private fetchSinglePoll = new Subject<poll>();


  constructor(private http: HttpClient, private router: Router) { }

  savePoll(poll: poll, email: string) {
    let data = { poll, email }
    this.http.post(`${environment.apiUrl}polls`, data)
      .subscribe(res => {
        console.log(res)
      })
    this.fetchPolls.next([...this.polls])
    //this.router.navigate(['dashboard']);

  }

  getPollById(id: any) {
    this.http.get<poll>(`${environment.apiUrl}poll/${id}`).subscribe(p => {
      this.singlePoll = p
      this.fetchSinglePoll.next(this.singlePoll)
    });
  }

  deletePollById(id: any) {
    return this.http.delete(`${environment.apiUrl}poll-delete/${id}`);
  }

  patchPollById(id: any, form: any) {
    return this.http.patch(`${environment.apiUrl}poll-edit/${id}`, form)
  }
  
  getSingleListener() {
    return this.fetchSinglePoll.asObservable()
  }

  // saveTextPoll(poll:poll){
  //   this.http.post("http://localhost:3000/api/polls", poll)
  //   .subscribe(res=>{
  //     console.log(res)
  //   })
  //   this.fetchPolls.next([...this.polls])
  // }
}
