import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaInformation } from './ata-information';

const routes: Routes = [
  {
    path:'',component:AtaInformation
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaInformationRoutingModule { }
