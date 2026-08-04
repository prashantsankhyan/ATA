import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgentAppointment } from './agent-appointment';


const routes: Routes = [
  {
    path:'',component:AgentAppointment
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentAppointmentRoutingModule { }
