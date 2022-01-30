import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { option } from 'src/app/models/option.model';
import { poll } from 'src/app/models/poll.model';
import { PollSaveService } from 'src/app/services/poll-save.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  options: any[] = [];
  alert: boolean = false;

  constructor(private activeRouter: ActivatedRoute,
    private router: Router, private pollService: PollSaveService) { }

  pollData!: poll;
  editPoll = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    calendarOptions: new FormControl(''),
    textOptions: new FormControl(''),
    needBe: new FormControl(''),
    numberVote: new FormControl(''),
    singleVote: new FormControl(''),
    hidden: new FormControl(''),
    deadline: new FormControl('')
  });

  ngOnInit(): void {
    let pollId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(pollId);
    this.pollService.getPollById(pollId).subscribe((data: any) => {
      this.pollData = data;
      this.editPoll.setValue({
        'title': this.pollData.title,
        'description': this.pollData.description,
        'calendarOptions': this.pollData.calendarOptions,
        'textOptions': this.pollData.textOptions,
        /*?.map(option => {
          return this.options.push(option.content.toString())
        })*/
        'needBe': this.pollData.needBe,
        'numberVote': this.pollData.numberVote,
        'singleVote': this.pollData.singleVote,
        'hidden': this.pollData.hidden,
        'deadline': this.pollData.deadline
      });
      console.log(this.editPoll.value);
      console.log(this.options)
    })
  }

  patchPoll() {
    this.pollService.patchPollById(this.activeRouter.snapshot.paramMap.get('id'),
      this.editPoll.value).subscribe(result => {
        if (!result) console.log('error');
        console.log(result)
        this.alert = true;
        this.router.navigate(['dashboard'])
      })
  }

  closeAlert() {
    this.alert = false
  }
}
