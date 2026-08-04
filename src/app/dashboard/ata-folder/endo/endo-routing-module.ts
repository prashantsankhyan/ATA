import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Endo } from './endo';

const routes: Routes = [
  {
    path:'',component:Endo
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndoRoutingModule { }
