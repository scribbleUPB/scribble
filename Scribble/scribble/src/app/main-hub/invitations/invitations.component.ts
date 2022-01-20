import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selected = 'All';

  inputValue="";



  polls=[
    {
      name:"First Poll",
      options:3,
      invitees:4,
      creator:"B"
    },
    {
      name:"Second Poll",
      options:2,
      invitees:0,
      creator:"A"
    },
    {
      name:"Third Poll",
      options:2,
      invitees:0,
      creator:"C"
    }]


  setSelected(s:string){
    this.selected=s;
  }

  hasNoResult(){
    return this.polls.filter(p=>p.name.toLowerCase().includes(this.inputValue.toLowerCase())).length===0;
  }




}
