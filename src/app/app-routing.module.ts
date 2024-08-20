import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Stage1Component } from './stage1/stage1.component';
import { Stage0Component } from './stage0/stage0.component';
import { stageGuard } from './stage.guard';
import { Stage2Component } from './stage2/stage2.component';
import { Stage3Component } from './stage3/stage3.component';
import { Stage4Component } from './stage4/stage4.component';
import { Stage5Component } from './stage5/stage5.component';


const routes: Routes = [
  { path: 'stage-0', component: Stage0Component, canActivate: [stageGuard] },
  { path: 'stage-1', component: Stage1Component, canActivate: [stageGuard], data : {animation: 1} },
  { path: 'stage-2', component: Stage2Component, canActivate: [stageGuard], data : {animation: 2} },
  { path: 'stage-3', component: Stage3Component, canActivate: [stageGuard], data : {animation: 3} },
  { path: 'stage-4', component: Stage4Component, canActivate: [stageGuard], data : {animation: 4} },
  { path: 'stage-5', component: Stage5Component, canActivate: [stageGuard], data : {animation: 5} },
  { path: '**', redirectTo: '/stage-0' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
