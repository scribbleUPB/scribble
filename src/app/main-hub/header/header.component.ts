import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { User } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: SocialUser;
  loggedUser!: User
  constructor(private authService: SocialAuthService, private router: Router, private userAuth: UserAuthService) { }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.userAuth.userFetch(user.name, user.email);
      this.userAuth.getAuthStatusListener().subscribe(u => {
        this.loggedUser = u;
      })
    })


    const storage = localStorage.getItem('google_auth')

    if (storage) {
      this.loggedUser = JSON.parse(storage);
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
