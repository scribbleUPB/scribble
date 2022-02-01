import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateRange, MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { dateTime } from 'src/app/models/dateTime.model';
import { option } from 'src/app/models/option.model';
import { poll } from 'src/app/models/poll.model';
import { DateService } from 'src/app/services/date.service';
import { PollSaveService } from 'src/app/services/poll-save.service';
import { TextService } from 'src/app/services/text.service';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css']
})
export class FirstScreenComponent implements OnInit, OnDestroy {
  user!: SocialUser;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  selected: any;
  dates: string[] = []
  fullDates: Date[] = [];
  fullerDates: dateTime[] = [];
  options: option[] = [];
  private dateSub!: Subscription
  private textSub!: Subscription
  title: string = '';
  desc: string = '';
  private loggedUser!: User




  @ViewChild('cal') calendar: MatCalendar<Date> | undefined;


  constructor(private router: Router, private dateService: DateService, private textService: TextService, private _formBuilder: FormBuilder, private pollService: PollSaveService, private userAuth: UserAuthService) { }
  ngOnDestroy() {
    this.dateSub.unsubscribe()
    this.textSub.unsubscribe()
  }


  ngOnInit(): void {

    this.userAuth.getAuthStatusListener().subscribe(u => {
      this.loggedUser = u;
    })

    const storage = localStorage.getItem('google_auth')

    if (storage) {
      this.user = JSON.parse(storage);
    } else {
      console.error('not working');
      this.router.navigateByUrl('login').then();
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['']

    });

    this.secondFormGroup = this._formBuilder.group({
      needBeCtrl: [false, Validators.required],
      numberCtrl: [false, Validators.required],
      singleCtrl: [false, Validators.required],
      hiddenCtrl: [false, Validators.required],
      deadlineCtrl: [false, Validators.required]

    });



    this.dateSub = this.dateService.getDateListener()
      .subscribe((dates: dateTime[]) => {
        this.fullerDates = dates;
      })

    this.textSub = this.textService.getOptionListener()
      .subscribe((options: option[]) => {
        this.options = options;
      })

    let o: option = {
      content: ''
    }
    this.textService.saveOption(o);
  }

  // dateClass() {
  //   return (date: Date): MatCalendarCellCssClasses => {
  //     if(this.fullDates.length>0){
  //       if (date.getDate() === this.fullDates[0].getDate()) {
  //         return 'special-date';
  //       } else {
  //         return 'undefined';
  //       }
  //     };
  //     return 'special-date'
  //     }


  // }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.dates
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'special-date' : '';
    };
  }

  addTime(j: number) {
    this.dateService.saveTime(j)
  }

  deleteHour(j: number, i: number) {
    this.dateService.deleteHour(j, i)
  }

  setTimeStart(start: HTMLInputElement, j: number, i: number) {
    this.dateService.setTimeStart(start.value, j, i)
  }
  setTimeEnd(end: HTMLInputElement, j: number, i: number) {
    this.dateService.setTimeEnd(end.value, j, i)
  }

  addOption(s: string) {
    let o: option = {
      content: s
    }
    this.textService.saveOption(o)
  }

  deleteOption(i: number) {
    this.textService.deleteOption(i)
  }

  setOptionContent(opt: HTMLInputElement, i: number) {
    this.textService.setOptionContent(opt.value, i)
  }

  trackByFn(index: number, treatment: any) {
    return index;
  }


  onSelect(event: Date | null) {

    //this.fullDates=[]
    if (event !== null) {
      let d = new Date(event);
      if (this.dates.includes(d.toDateString())) {
        let i = this.dates.indexOf(d.toDateString())
        this.dates.splice(i, 1)
        this.fullDates.splice(i, 1)
        this.dateService.deleteDate(i)
      } else {
        this.dates.push(d.toDateString())
        this.fullDates.push(new Date(d))

        let newDay: dateTime = {
          day: new Date(d),
          times: [{
            start: "00:00",
            end: "12:00",
          }]
        }
        // newDay.times[0].start.setHours(0,0,0);
        // newDay.times[0].end.setHours(12,0,0);
        this.dateService.saveDate(newDay)
        this.dateService.getDates()

      }

      //this.dates.forEach(e=>this.fullDates.push(new Date(e)))
      if (this.calendar != undefined) {
        this.calendar.updateTodaysDate();
      }

    }

  }




  createPoll() {
    // console.log(this.firstFormGroup.controls['firstCtrl'].value)
    // console.log(this.firstFormGroup.controls['secondCtrl'].value)
    // console.log(this.secondFormGroup.controls['needBeCtrl'].value)
    // console.log(this.secondFormGroup.controls['numberCtrl'].value)
    // console.log(this.secondFormGroup.controls['singleCtrl'].value)
    // console.log(this.secondFormGroup.controls['hiddenCtrl'].value)
    // console.log(this.secondFormGroup.controls['deadlineCtrl'].value)

    if (this.options.length > 1 || this.options[0].content != '') {
      let filteredOptions = this.options.filter(o => o.content !== '');
      let textpoll: poll = {
        creator: this.user.email,
        title: this.firstFormGroup.controls['firstCtrl'].value,
        description: this.firstFormGroup.controls['secondCtrl'].value,
        textOptions: filteredOptions,
        needBe: this.secondFormGroup.controls['needBeCtrl'].value,
        numberVote: this.secondFormGroup.controls['numberCtrl'].value,
        singleVote: this.secondFormGroup.controls['singleCtrl'].value,
        hidden: this.secondFormGroup.controls['hiddenCtrl'].value,
        deadline: this.secondFormGroup.controls['deadlineCtrl'].value,
        invitees: []
      }
      this.pollService.savePoll(textpoll, this.user.email);
    } else {
      console.log(this.fullerDates)
      let calendarPoll: poll = {
        creator: this.user.email,
        title: this.firstFormGroup.controls['firstCtrl'].value,
        description: this.firstFormGroup.controls['secondCtrl'].value,
        calendarOptions: this.fullerDates,
        needBe: this.secondFormGroup.controls['needBeCtrl'].value === true,
        numberVote: this.secondFormGroup.controls['numberCtrl'].value === true,
        singleVote: this.secondFormGroup.controls['singleCtrl'].value === true,
        hidden: this.secondFormGroup.controls['hiddenCtrl'].value === true,
        deadline: this.secondFormGroup.controls['deadlineCtrl'].value === true,
        invitees: []
      }
      this.pollService.savePoll(calendarPoll, this.user.email);

    }

    this.router.navigateByUrl('dashboard').then(

    );

  }

}
