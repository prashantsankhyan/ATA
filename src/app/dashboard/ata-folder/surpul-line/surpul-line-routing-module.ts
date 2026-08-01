import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurpulLine } from './surpul-line';

const routes: Routes = [
  {
    path:'',component:SurpulLine
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurpulLineRoutingModule { }
