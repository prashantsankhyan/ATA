import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaTax } from './ata-tax';

const routes: Routes = [
  {
    path:'',component:AtaTax
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaTaxRoutingModule { }
