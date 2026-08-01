import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Carrier } from '../carrier/carrier';
import { Mg } from './mg';

const routes: Routes = [
  {
    path:'',component:Mg
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MgRoutingModule { }
