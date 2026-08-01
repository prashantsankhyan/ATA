import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoveragesOffered } from './coverages-offered';

const routes: Routes = [
  {
    path:'',component:CoveragesOffered
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoveragesOfferedRoutingModule { }
