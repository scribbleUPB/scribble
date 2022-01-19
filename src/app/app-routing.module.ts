import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './components/answer/answer.component';
import { LoginComponent } from './components/login/login.component';
import { WorkdComponent } from './components/workd/workd.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'work', component: WorkdComponent },
  { path: 'answer', component: AnswerComponent },
  { path: '', redirectTo: '/answer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
