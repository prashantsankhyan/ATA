import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Policy } from './policy';
import { ListOfPolicyAttachemnt } from './list-of-policy-attachemnt/list-of-policy-attachemnt';
import { FileATA } from './file-ata/file-ata';
import { MonthlyReportingInvoice } from './monthly-reporting-invoice/monthly-reporting-invoice';
import { ExtandPolicyInvoice } from './extand-policy-invoice/extand-policy-invoice';

const routes: Routes = [
  {
    path:'',component:Policy,

  },
  {
    path:'policyAttachment',component:ListOfPolicyAttachemnt
  },
  
  {
    path:'file/:id',component:FileATA
  },
   {
    path:'monthy/:id',component:MonthlyReportingInvoice
  },
   {
    path:'extance/:id',component:ExtandPolicyInvoice
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
