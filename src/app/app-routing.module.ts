import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Stage0Component } from './stage0/stage0.component';
import { Stage1Component } from './stage1/stage1.component';
import { stageGuard } from './stage.guard';


const routes: Routes = [
  { path: 'stage-0', component: Stage0Component },
  { path: 'stage-1', component: Stage1Component, canActivate: [stageGuard] },
  { path: '', redirectTo: '/stage-0', pathMatch: 'full' },
  { path: '**', redirectTo: '/stage-0' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
