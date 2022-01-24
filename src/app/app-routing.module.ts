import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HeaderComponent } from './main-hub/header/header.component';
import { InvitationsComponent } from './main-hub/invitations/invitations.component';
import { AnswerComponent } from './poll-creation/answer/answer.component';
import { FirstScreenComponent } from './poll-creation/first-screen/first-screen.component';
import { ViewComponent } from './poll-creation/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: InvitationsComponent },
  { path: 'create', component: FirstScreenComponent },
  { path: 'answer/:id', component: AnswerComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'edit/:id', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
