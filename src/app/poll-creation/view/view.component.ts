import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollSaveService } from 'src/app/services/poll-save.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls:['./view.component.css']
})
export class ViewComponent implements OnInit {

  icon!: string;
  updateIcon!: number;
  dataPoll: any = {};

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pollService: PollSaveService) { }

  ngOnInit(): void {
    let pollId = this.activatedRoute.snapshot.paramMap.get('id');
    this.pollService.getPollById2(pollId).subscribe(data => {
      this.dataPoll = data;
    })
  }

  triggerIcon(index: any) {
    if (this.icon === 'bi bi-check') {
      this.icon = 'bi bi-check-all';
      this.updateIcon = 0;
    } else if (this.icon === undefined || this.icon === '') {
      this.icon = 'bi bi-check';
      this.updateIcon = 1;
    } else {
      this.icon = '';
      this.updateIcon = 2;
    }
  }
}