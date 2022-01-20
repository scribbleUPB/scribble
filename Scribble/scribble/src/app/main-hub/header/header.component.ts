import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: SocialUser;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth')

    if (storage) {
      this.user = JSON.parse(storage);
    } else {
      console.error('not working');
      this.router.navigateByUrl('login').then();
    }
  }

  signOut() {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('login').then();
  }

}
