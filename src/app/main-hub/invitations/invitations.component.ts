import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { poll } from 'src/app/models/poll.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  private loggedUser!: User
  userPolls: poll[] = []

  constructor(private userAuth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.userAuth.getAuthStatusListener().subscribe(u => {
      console.log(u)
      this.loggedUser = u;
      this.userPolls = this.loggedUser.ownedPolls.concat(this.loggedUser.invitedPolls)
    })
  }

  selected = 'All';

  inputValue = "";



  polls = [
    {
      name: "First Poll",
      options: 3,
      invitees: 4,
      creator: "B"
    },
    {
      name: "Second Poll",
      options: 2,
      invitees: 0,
      creator: "A"
    },
    {
      name: "Third Poll",
      options: 2,
      invitees: 0,
      creator: "C"
    }]


  setSelected(s: string) {
    this.selected = s;
  }

  hasNoResult() {
    return this.polls.filter(p => p.name.toLowerCase().includes(this.inputValue.toLowerCase())).length === 0;
  }

  goAnswer(id: any) {
    this.router.navigate(['answer', id]);
  }


}
