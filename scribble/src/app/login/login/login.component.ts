import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { User } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user!: SocialUser;
  loggedIn!: boolean;
  dis!:boolean
  loggedUser!:User;


  constructor(private authService: SocialAuthService, private router: Router, private userAuth:UserAuthService) { }

  ngOnInit(): void {
    this.dis=false;

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    })
  }

  googleLoginOptions = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig



  signInWithGoogle(): void {
    this.dis=true;
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions ).then((data) => {
        this.authService.authState.subscribe((user) => {
          this.userAuth.userFetch(user.firstName,user.email);
          this.userAuth.getAuthStatusListener().subscribe(u=>{
            this.loggedUser=u;

          })
          this.loggedIn = (user != null);
        })
        localStorage.setItem('google_auth', JSON.stringify(data));
        this.router.navigateByUrl('dashboard').then();
      }).catch(data => {
        this.dis=false;
        this.authService.signOut();
        this.router.navigate(['login']);
      });
    }






  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
