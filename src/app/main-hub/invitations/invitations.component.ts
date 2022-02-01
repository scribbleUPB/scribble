import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { poll } from 'src/app/models/poll.model';
import { Router } from '@angular/router';
import { PollSaveService } from 'src/app/services/poll-save.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit, OnDestroy {
  private user!: SocialUser
  private loggedUser!: User
  userPolls: poll[] = []
  private loggedSub!: Subscription
  constructor(
    private userAuth: UserAuthService,
    private router: Router,
    private pollService: PollSaveService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal

  ) { }
  ngOnDestroy() {
    this.loggedSub.unsubscribe()
  }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth')

    if (storage) {
      this.user = JSON.parse(storage);
      this.userAuth.userFetch(this.user.name, this.user.email)
    } else {
      console.error('not working');
      this.router.navigateByUrl('login').then();
    }



    this.loggedSub = this.userAuth.getAuthStatusListener().subscribe(u => {
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



    if (s === 'All') {

      this.userPolls = this.loggedUser.ownedPolls.concat(this.loggedUser.invitedPolls)
      this.selected = 'All'
    } else if (s === 'Sent') {
      this.userPolls = this.loggedUser.ownedPolls
      this.selected = 'Sent'

    } else {
      this.userPolls = [...this.loggedUser.invitedPolls]
      this.selected = 'Received'

    }
  }

  hasNoResult(search: HTMLInputElement) {
    if (this.inputValue !== "") {
      return this.userPolls.filter(p => p.title.toLowerCase().includes(this.inputValue.toLowerCase())).length === 0;
    }
    return false;
  }

  goView(id: any) {
    this.router.navigate(['poll-view', id]);
  }

  goAnswer(id: any){
    this.router.navigate(['answer', id]);
  }

  goEdit(id: any) {
    this.router.navigate(['poll-edit', id]);
  }

  deletePoll(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.pollService.deletePollById(result).subscribe((data) => {
        console.log(data);
      })
      this.ngOnInit()
      this.openSnackBar()
    })
  }

  openSnackBar() {
    this._snackBar.open('Poll has been deleted', 'X', {
      duration: 3000,
      panelClass: 'delete',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
