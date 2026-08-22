import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaFolderCarrier } from './ata-folder-carrier';
import { ListAtaCarrierAttachemet } from './list-ata-carrier-attachemet/list-ata-carrier-attachemet';

const routes: Routes = [
  {
    path:'',component:AtaFolderCarrier
  },
   {
    path:'ataCarrierAttachment',component:ListAtaCarrierAttachemet
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaFolderCarrierRoutingModule { }
