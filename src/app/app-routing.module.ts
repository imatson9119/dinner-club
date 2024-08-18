import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Stage0Component } from './stage0/stage0.component';
import { Stage1Component } from './stage1/stage1.component';
import { stageGuard } from './stage.guard';
import { Stage2Component } from './stage2/stage2.component';


const routes: Routes = [
  { path: 'stage-0', component: Stage0Component, canActivate: [stageGuard]},
  { path: 'stage-1', component: Stage1Component, canActivate: [stageGuard], data : {animation: 0} },
  { path: 'stage-2', component: Stage2Component, canActivate: [stageGuard], data : {animation: 1} },
  { path: '**', redirectTo: '/stage-0' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
