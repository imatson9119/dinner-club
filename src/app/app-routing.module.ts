import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { stageGuard } from './stage.guard';
import { Stage1Component } from './stage1/stage1.component';
import { Stage2Component } from './stage2/stage2.component';
import { Stage3Component } from './stage3/stage3.component';
import { Stage4Component } from './stage4/stage4.component';
import { Stage5Component } from './stage5/stage5.component';
import { Stage6Component } from './stage6/stage6.component';


const routes: Routes = [
  { path: 'stage-1', component: Stage1Component, canActivate: [stageGuard] },
  { path: 'stage-2', component: Stage2Component, canActivate: [stageGuard], data : {animation: 1} },
  { path: 'stage-3', component: Stage3Component, canActivate: [stageGuard], data : {animation: 2} },
  { path: 'stage-4', component: Stage4Component, canActivate: [stageGuard], data : {animation: 3} },
  { path: 'stage-5', component: Stage5Component, canActivate: [stageGuard], data : {animation: 4} },
  { path: 'stage-6', component: Stage6Component, canActivate: [stageGuard], data : {animation: 5} },
  { path: '**', redirectTo: '/stage-1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
