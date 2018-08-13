import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IvyComponent } from './ivy/ivy.component';

const routes: Routes = [
  { path: '', component: IvyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
