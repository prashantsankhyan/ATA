import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaSlLicence } from './ata-sl-licence';

const routes: Routes = [
  {
    path:'',component:AtaSlLicence
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaSlLicenceRoutingModule { }
