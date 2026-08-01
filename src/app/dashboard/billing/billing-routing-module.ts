import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Billing } from './billing';
import { ListOfBilling } from './list-of-billing/list-of-billing';
import { TransactionAttachment } from './transaction-attachment/transaction-attachment';
import { PdfConverter } from './pdf-converter/pdf-converter';
import { CrcPdf } from './crc-pdf/crc-pdf';

const routes: Routes = [
  {
    path:'',component:Billing
  },
  {
    path:'listOfBilling',component:ListOfBilling
  },
  {
    path:'billingTransaction',component:TransactionAttachment
  },
  {
    path:'pdfBilling',component:PdfConverter
  },
  {
    path:'crcPdf',component:CrcPdf
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
