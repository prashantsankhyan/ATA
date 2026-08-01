import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Stuff } from './stuff';

const routes: Routes = [
  {
    path:'',component:Stuff
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StuffRoutingModule { }
