import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-workd',
  templateUrl: './workd.component.html',
  styleUrls: ['./workd.component.scss']
})
export class WorkdComponent implements OnInit {
  user!: SocialUser;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth')

    if (storage) {
      this.user = JSON.parse(storage);
    } else {
      console.error('not working');
    }
  }

  signOut() {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('demo').then();
  }

}
