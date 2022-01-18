import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { WorkdComponent } from './components/workd/workd.component';

const routes: Routes = [
  { path: 'demo', component: DemoComponent },
  { path: 'work', component: WorkdComponent },
  { path: '', redirectTo: '/demo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
