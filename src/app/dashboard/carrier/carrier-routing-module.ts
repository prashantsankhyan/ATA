import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Carrier } from './carrier';
import { ListOfCarrierAttachemnt } from './list-of-carrier-attachemnt/list-of-carrier-attachemnt';

const routes: Routes = [
  {
    path:'',component:Carrier
  },
  {
    path:'carrierAttachment',component:ListOfCarrierAttachemnt
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierRoutingModule { }
