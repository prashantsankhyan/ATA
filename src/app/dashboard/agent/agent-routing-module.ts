import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Agent } from './agent';
import { AgentListAttachment } from './agent-list-attachment/agent-list-attachment';

const routes: Routes = [
  {
    path:'',component:Agent
  },
   {
    path:'agentAttachment',component:AgentListAttachment
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
