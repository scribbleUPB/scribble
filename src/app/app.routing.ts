import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { InvitationsComponent } from './main-hub/invitations/invitations.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AnswerComponent } from './poll-creation/answer/answer.component';
import { EditComponent } from './poll-creation/edit/edit.component';
import { FirstScreenComponent } from './poll-creation/first-screen/first-screen.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: InvitationsComponent },
  { path: 'create', component: FirstScreenComponent },
  { path: 'answer/:id', component: AnswerComponent },
  { path: 'poll-edit/:id', component: EditComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
