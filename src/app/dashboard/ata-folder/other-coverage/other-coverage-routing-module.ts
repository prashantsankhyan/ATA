import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherCoverage } from './other-coverage';

const routes: Routes = [
  {
    path:'',component:OtherCoverage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherCoverageRoutingModule { }
