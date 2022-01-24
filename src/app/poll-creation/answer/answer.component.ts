import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { poll } from 'src/app/models/poll.model';
import { PollSaveService } from 'src/app/services/poll-save.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  icon!: string;
  updateIcon!: number;
  dataPoll: any = {};

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pollService: PollSaveService) { }

  ngOnInit(): void {
    let pollId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(pollId);
    this.pollService.getPollById(pollId).subscribe(data => {
      console.log(data);
      this.dataPoll = data;
    })
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