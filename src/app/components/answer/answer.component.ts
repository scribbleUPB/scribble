import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  icon!: string;
  updateIcon!: number;

  constructor() { }

  ngOnInit(): void {
  }

  triggerIcon() {
    console.log(this.icon);
    if (this.icon === 'bi bi-check') {
      this.icon = 'bi bi-check-all';
      this.updateIcon = 0;
      console.log('click ' + this.icon + this.updateIcon);
    } else if (this.icon === undefined || this.icon === '') {
      this.icon = 'bi bi-check';
      this.updateIcon = 1;
      console.log('click ' + this.icon + this.updateIcon);
    } else {
      this.icon = '';
      this.updateIcon = 2;
      console.log('click ' + this.icon + this.updateIcon);
    }
  }
}
