import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { answer } from 'src/app/models/answer.model';
import { dateTime } from 'src/app/models/dateTime.model';
import { individualResp } from 'src/app/models/individualResp.model';
import { poll } from 'src/app/models/poll.model';
import { User } from 'src/app/models/user.model';
import { AnswerService } from 'src/app/services/answer.service';
import { PollSaveService } from 'src/app/services/poll-save.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-answer2',
  templateUrl: './answer2.component.html',
  styleUrls: ['./answer2.component.css']
})
export class Answer2Component implements OnInit {

  private user!: SocialUser
  private pollSub!: Subscription
  showInvite: boolean = false;
  showHeader: boolean = true;
  optionHeader: any;
  textPoll: boolean = false;
  answers!: answer

  private loggedUser!: User
  private loggedSub!: Subscription

  icon: string[][] = [];
  updateIcon: number[][] = [];
  dataPoll!: poll;
  enableSave: boolean = false;
  index: number = 0;
  response!: answer
  private answerSub!: Subscription
  update: boolean = false;
  newEntry: boolean = false;
  alreadyAnswered: boolean = false;
  storage = localStorage.getItem('google_auth')
  calenOptions: dateTime[] = []
  calendarHeaders: string[] = []
  calenPoll: boolean = false;
  creatorMode: boolean = false;
  votes: number[] = []
  showV: boolean = false;
  hiddenPoll: boolean = false;



  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pollService: PollSaveService, private userAuth: UserAuthService,
    private answerService: AnswerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let pollId = this.activatedRoute.snapshot.paramMap.get('id');
    this.pollService.getPollById(pollId)
    this.pollService.getSingleListener().subscribe(data => {
      this.dataPoll = data;


      if (this.dataPoll === null) {
        this.router.navigateByUrl('**').then();
      } else if (this.dataPoll._id) {
        if (this.dataPoll.hidden) {
          this.hiddenPoll = true;
        }

        if (this.dataPoll.calendarOptions) {
          this.calenPoll = true;
          this.calenOptions = [...this.dataPoll.calendarOptions]
          for (let e of this.calenOptions) {
            let date = new Date(e.day);
            let dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            let dateCopy = dateStr;
            for (let t of e.times) {
              dateStr = dateCopy + " : " + t.start + " - " + t.end
              this.calendarHeaders.push(dateStr)


            }
          }
        }
        if (!this.storage) {
          this.showHeader = false;
        } else {
          this.user = JSON.parse(this.storage);
          if (this.dataPoll.creator === this.user.email) {
            this.showInvite = true
          }
          this.userAuth.userFetch(this.user.name, this.user.email)
          this.loggedSub = this.userAuth.getAuthStatusListener().subscribe(u => {
            this.loggedUser = u;
            if (this.user.email === this.dataPoll.creator) {
              this.creatorMode = true;
            }
          })
        }

        this.answerService.getAnswer(this.dataPoll._id)
        this.answerSub = this.answerService.getAnswerListener().subscribe(res => {
          this.response = res;
          if (this.response) {
            this.update = true;
            this.answers = { ...this.response }
            if (this.storage) {
              for (let e = 0; e < this.answers.responses.length; e++) {
                if (this.answers.responses[e].user?.name == this.loggedUser.name) {
                  this.index = e;
                  this.alreadyAnswered = true;
                }
              }
              if (!this.alreadyAnswered) {
                this.newEntry = true;
                let newResponse: individualResp = { user: { ...this.loggedUser }, responses: [] }
                this.answers.responses.unshift(newResponse)
              }

            } else {
              this.newEntry = true;
              let newResponse: individualResp = { name: '', responses: [] }
              this.answers.responses.unshift(newResponse)
            }





            if (this.calenOptions.length > 0) {
              if (this.newEntry) {
                for (let e of this.calenOptions) {
                  this.answers.responses[0].responses.push('empty')
                }
              }
              for (let i = 0; i < this.calendarHeaders.length; i++) {
                let o = []

                let t = []



                for (let j = 0; j < this.calendarHeaders.length; j++) {

                  if (this.answers.responses[i].responses[j] === 'checked') {
                    o.push('bi bi-check-all')
                    t.push(0)
                  } else if (this.answers.responses[i].responses[j] === 'half-checked') {
                    o.push('bi bi-check')
                    t.push(1)
                  } else {
                    o.push('')
                    t.push(2)
                  }


                }
                this.icon.push(o)
                this.updateIcon.push(t)
                o = []
                t = []
              }





            } else if (this.dataPoll.textOptions) {

              if (this.newEntry) {
                for (let e of this.dataPoll.textOptions) {
                  this.answers.responses[0].responses.push('empty')

                }
              }

              for (let i = 0; i < this.dataPoll.textOptions.length; i++) {
                let o = []

                let t = []



                for (let j = 0; j < this.dataPoll.textOptions.length; j++) {


                  if (this.answers.responses[i].responses[j] === 'checked') {
                    o.push('bi bi-check-all')
                    t.push(0)
                  } else if (this.answers.responses[i].responses[j] === 'half-checked') {
                    o.push('bi bi-check')
                    t.push(1)
                  } else {
                    o.push('')
                    t.push(2)
                  }


                }

                this.icon.push(o)
                this.updateIcon.push(t)
                o = []
                t = []
              }
              if (this.updateIcon.length > 0) {
                this.votes = []

                for (var i = 0; i < this.updateIcon.length; i++) {
                  for (var j = 0; j < this.updateIcon[i].length; j++) {
                    let val = 0;
                    if (this.updateIcon[i][j] == 0) {
                      val = 1
                    } else if (this.updateIcon[i][j] == 1) {
                      val = 1
                    } else if (this.updateIcon[i][j] == 2) {
                      val = 0
                    }
                    this.votes[j] = (this.votes[j] || 0) + val;

                  }
                }
              }


            }





          }
          else if (this.dataPoll._id) {

            this.answers = { pollId: this.dataPoll._id, responses: [] }
            let firstResponse: individualResp = { responses: [] }

            if (this.calendarHeaders.length > 0) {
              for (let i = 0; i < this.calendarHeaders.length; i++) {
                let o = []
                let t = []
                for (let e of this.calendarHeaders) {
                  o.push('')
                  t.push(2)
                }
                firstResponse.responses.push('empty')

                this.icon.push(o)
                this.updateIcon.push(t)
                o = []
                t = []
              }
            }
            else if (this.dataPoll.textOptions) {

              for (let i = 0; i < this.dataPoll.textOptions.length; i++) {
                let o = []
                let t = []
                for (let e of this.dataPoll.textOptions) {
                  o.push('')
                  t.push(2)
                }
                firstResponse.responses.push('empty')

                this.icon.push(o)
                this.updateIcon.push(t)
                o = []
                t = []
              }

            }
            if (this.storage) {
              this.user = JSON.parse(this.storage);
              this.userAuth.userFetch(this.user.name, this.user.email)
              this.loggedSub = this.userAuth.getAuthStatusListener().subscribe(u => {
                firstResponse.user = u
                firstResponse.user.name = this.user.name
              })
              this.answers.responses.push(firstResponse)
              if (this.dataPoll.creator === this.user.email) {
                this.showInvite = true
              }
            } else {
              this.showHeader = false;
              firstResponse.name = ''
              this.answers.responses.push(firstResponse)
            }
          }
        })

      }

    })

  }


  triggerIcon(indexj: number, indexi: number) {
    if (this.updateIcon.length > 0) {
      this.votes = []
      for (var i = 0; i < this.updateIcon.length; i++) {
        for (var j = 0; j < this.updateIcon[i].length; j++) {
          let val = 0;
          if (this.updateIcon[i][j] == 0) {
            val = 1
          } else if (this.updateIcon[i][j] == 1) {
            val = 1
          } else if (this.updateIcon[i][j] == 2) {
            val = 0
          }
          this.votes[j] = (this.votes[j] || 0) + val;

        }
      }
    }
    this.enableSave = true;
    if (indexj == this.index || this.creatorMode) {
      if (this.icon[indexj][indexi] === 'bi bi-check') {
        this.icon[indexj][indexi] = 'bi bi-check-all';
        this.updateIcon[indexj][indexi] = 0;
        this.answers.responses[indexj].responses[indexi] = 'checked'

      } else if (this.icon[indexj][indexi] === undefined || this.icon[indexj][indexi] === '') {
        this.icon[indexj][indexi] = 'bi bi-check';
        this.updateIcon[indexj][indexi] = 1;
        this.answers.responses[indexj].responses[indexi] = 'half-checked'

      } else {
        this.icon[indexj][indexi] = '';
        this.updateIcon[indexj][indexi] = 2;
        this.answers.responses[indexj].responses[indexi] = 'empty'

      }
    }
    if (this.updateIcon.length > 0) {
      this.votes = []

      for (var i = 0; i < this.updateIcon.length; i++) {
        for (var j = 0; j < this.updateIcon[i].length; j++) {
          let val = 0;
          if (this.updateIcon[i][j] == 0) {
            val = 1
          } else if (this.updateIcon[i][j] == 1) {
            val = 1
          } else if (this.updateIcon[i][j] == 2) {
            val = 0
          }
          this.votes[j] = (this.votes[j] || 0) + val;

        }
      }
    }
  }

  onSave() {
    if (this.update && this.dataPoll._id) {
      this.answerService.updateAnswer(this.dataPoll._id, this.answers.responses)
    } else {
      this.answerService.saveAnswer(this.answers)

    }

  }

  showVotes() {
    if (this.updateIcon.length > 0) {
      this.showV = !this.showV

      this.votes = []

      for (var i = 0; i < this.updateIcon.length; i++) {
        for (var j = 0; j < this.updateIcon[i].length; j++) {
          let val = 0;
          if (this.updateIcon[i][j] == 0) {
            val = 1
          } else if (this.updateIcon[i][j] == 1) {
            val = 1
          } else if (this.updateIcon[i][j] == 2) {
            val = 0
          }
          this.votes[j] = (this.votes[j] || 0) + val;

        }
      }
    }

  }
  openSnackBar() {
    this._snackBar.open('The Link was copied to the Clipboard', 'close', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  copyLink() {
    return window.location.href
  }


}

