import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionAttachment } from './transaction-attachment';

const routes: Routes = [
  {
    path:'',component:TransactionAttachment
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionAttachmentRoutingModule { }
