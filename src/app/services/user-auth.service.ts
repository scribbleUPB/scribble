import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  user!:User
  private fetchUser = new Subject<User>();


  constructor(private http:HttpClient) { }

  userFetch(name:string,email:string){
    let userData={name,email}
    this.http.post<{message:string,user:any}>(`${environment.apiUrl}user`, userData)
    .pipe(map(resp=>{
     const u:User={
       _id:resp.user._id,
      name:resp.user.name,
      email:resp.user.email,
      ownedPolls:resp.user.ownedPolls,
      invitedPolls:resp.user.invitedPolls
     }
      return u
    }))
    .subscribe(data=>{
      this.user=data;
      this.fetchUser.next(this.user)
    })
    //this.fetchPolls.next([...this.polls])
  }

  getAuthStatusListener() {
    return this.fetchUser.asObservable();
  }


}
