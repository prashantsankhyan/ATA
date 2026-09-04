import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PardeepSlLicenses } from './pardeep-sl-licenses';

const routes: Routes = [
  {
    path:'',component:PardeepSlLicenses
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PardeepSlLicensesRoutingModule { }
