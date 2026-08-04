import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { W9 } from './w9';

const routes: Routes = [
  {
    path:'',component:W9
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class W9RoutingModule { }
