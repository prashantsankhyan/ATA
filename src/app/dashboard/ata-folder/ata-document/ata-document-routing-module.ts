import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaDocument } from './ata-document';

const routes: Routes = [
  {
    path:'',component:AtaDocument
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaDocumentRoutingModule { }
