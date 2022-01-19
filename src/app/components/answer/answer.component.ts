import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  icon!: string;

  constructor() { }

  ngOnInit(): void {
  }

  oneClick() {
    console.log(this.icon);
    if (this.icon === 'bi bi-check') {
      this.icon = 'bi bi-check-all'
      console.log('click ' + this.icon);
    } else if (this.icon === undefined || this.icon === '') {
      this.icon = 'bi bi-check'
      console.log('click ' + this.icon);
    } else {
      this.icon = ''
      console.log('click ' + this.icon);
    }
  }
}
