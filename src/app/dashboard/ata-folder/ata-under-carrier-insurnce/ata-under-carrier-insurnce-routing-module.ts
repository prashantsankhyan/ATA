import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaUnderCarrierInsurnce } from './ata-under-carrier-insurnce';

const routes: Routes = [
  {
    path:'',component:AtaUnderCarrierInsurnce
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaUnderCarrierInsurnceRoutingModule { }
