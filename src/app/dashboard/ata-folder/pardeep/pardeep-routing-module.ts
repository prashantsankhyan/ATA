import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pardeep } from './pardeep';

const routes: Routes = [
  {
    path:'',component:Pardeep
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PardeepRoutingModule { }
