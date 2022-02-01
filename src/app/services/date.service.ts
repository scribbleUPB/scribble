import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { dateTime } from '../models/dateTime.model';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private datet: dateTime[] = [];
  private fetchDate = new Subject<dateTime[]>();

  getDates() {
    this.fetchDate.next(this.datet);
  }

  saveDate(d: dateTime) {
    this.datet.push(d);
    this.fetchDate.next(this.datet);
  }

  setTimeStart(s: string, j: number, i: number) {
    this.datet[j].times[i].start = s;
  }

  setTimeEnd(e: string, j: number, i: number) {
    this.datet[j].times[i].end = e;
  }

  saveTime(i: number) {
    this.datet[i].times.push({
      start: "08:00",
      end: "10:00",
    })
    this.fetchDate.next([...this.datet])
  }

  getDateListener() {
    return this.fetchDate.asObservable()
  }

  deleteHour(j: number, i: number) {
    this.datet[j].times.splice(i, 1);
    this.fetchDate.next([...this.datet])
  }

  deleteDate(i: number) {
    this.datet.splice(i, 1);
    this.fetchDate.next(this.datet);
  }

  constructor() { }
}
