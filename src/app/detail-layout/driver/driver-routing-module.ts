import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Driver } from './driver';

const routes: Routes = [
  {
    path:'',component:Driver
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
