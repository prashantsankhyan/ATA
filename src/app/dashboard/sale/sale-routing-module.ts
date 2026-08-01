import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sale } from './sale';
import { SaleAttachement } from './sale-attachement/sale-attachement';
import { ListOfSaleAttachemnt } from './list-of-sale-attachemnt/list-of-sale-attachemnt';
import { ListOfBor } from './list-of-bor/list-of-bor';

const routes: Routes = [
  {
    path:'',component:Sale
  },
   {
    path:'attahment',component:ListOfSaleAttachemnt
  },
  {
    path:'bor',component:ListOfBor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
