import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaFolderAgent } from './ata-folder-agent';
import { AtaAgentAttachement } from './ata-agent-attachement/ata-agent-attachement';

const routes: Routes = [
  {
    path:'',component:AtaFolderAgent
  },
   {
    path:'agentAttachemet',component:AtaAgentAttachement
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaFolderAgentRoutingModule { }
