import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Stage0Component } from './stage0/stage0.component';
import { Stage1Component } from './stage1/stage1.component';


const routes: Routes = [
  { path: 'stage-zero', component: Stage0Component },
  { path: 'stage-one', component: Stage1Component },
  { path: '', redirectTo: '/stage-zero', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
