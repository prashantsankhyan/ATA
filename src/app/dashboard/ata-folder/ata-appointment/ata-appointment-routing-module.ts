import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaAppointment } from './ata-appointment';


const routes: Routes = [
  {
    path:'',component:AtaAppointment
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaAppointmentRoutingModule { }
