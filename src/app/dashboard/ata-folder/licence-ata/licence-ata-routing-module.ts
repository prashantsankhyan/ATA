import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenceAta } from './licence-ata';

const routes: Routes = [
  {
    path:'',component:LicenceAta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenceAtaRoutingModule { }
