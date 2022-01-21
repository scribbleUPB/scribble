import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollSaveService {
  private polls:poll[]=[];
  private fetchPolls = new Subject<poll[]>();


  constructor(private http:HttpClient, private router:Router) { }

  savePoll(poll:poll, email:string){
    let data ={poll,email}
    this.http.post("http://localhost:3000/api/polls", data)
    .subscribe(res=>{
      console.log(res)
    })
    this.fetchPolls.next([...this.polls])
  //this.router.navigate(['dashboard']);

  }

  // saveTextPoll(poll:poll){
  //   this.http.post("http://localhost:3000/api/polls", poll)
  //   .subscribe(res=>{
  //     console.log(res)
  //   })
  //   this.fetchPolls.next([...this.polls])
  // }
}
