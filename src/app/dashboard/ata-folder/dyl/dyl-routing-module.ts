import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dyl } from './dyl';

const routes: Routes = [
  {
    path:'',component:Dyl
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DylRoutingModule { }
