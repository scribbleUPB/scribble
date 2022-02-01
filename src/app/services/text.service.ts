import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { option } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private options:option[]=[];
  private fetchOptions=new Subject<option[]>()

  constructor() { }

  getOptions() {
    this.fetchOptions.next(this.options);
  }

  saveOption(o: option) {
    this.options.push(o);
    this.fetchOptions.next(this.options);
  }

  getOptionListener() {
    return this.fetchOptions.asObservable()
  }

  deleteOption(i: number) {
    this.options.splice(i, 1);
    this.fetchOptions.next(this.options);
  }

  setOptionContent(c: string, i: number) {
    this.options[i].content= c;
  }
}
