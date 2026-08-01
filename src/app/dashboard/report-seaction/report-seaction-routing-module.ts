import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportSeaction } from './report-seaction';

const routes: Routes = [
  {
    path:'',component:ReportSeaction
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSeactionRoutingModule { }
