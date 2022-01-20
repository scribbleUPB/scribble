import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateRange, MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { dateTime } from 'src/app/models/dateTime.model';
import { option } from 'src/app/models/option.model';
import { DateService } from 'src/app/services/date.service';
import { TextService } from 'src/app/services/text.service';


@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.css']
})
export class FirstScreenComponent implements OnInit, OnDestroy {
  firstFormGroup!: FormGroup;
  selected: any;
  dates: string[] = []
  fullDates: Date[] = [];
  fullerDates: dateTime[] = [];
  options: option[] = [];
  private dateSub!: Subscription
  private textSub!: Subscription



  @ViewChild('cal') calendar: MatCalendar<Date> | undefined;


  constructor(private dateService: DateService, private textService:TextService, private _formBuilder: FormBuilder) { }
  ngOnDestroy() {
    this.dateSub.unsubscribe()
    this.textSub.unsubscribe()
  }


  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });



    this.dateSub = this.dateService.getDateListener()
      .subscribe((dates: dateTime[]) => {
        this.fullerDates = dates;
      })

    this.textSub = this.textService.getOptionListener()
    .subscribe((options:option[])=>{
      this.options=options;
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

  deleteOption(i:number){
    this.textService.deleteOption(i)
  }

  setOptionContent(opt:HTMLInputElement, i:number){
    this.textService.setOptionContent(opt.value,i)
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



}
