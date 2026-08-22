import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaBond } from './ata-bond';

const routes: Routes = [
  {
    path:'',component:AtaBond
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaBondRoutingModule { }
