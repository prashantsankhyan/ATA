import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverBilling } from './driver-billing';
import { ListOfDriverBilling } from './list-of-driver-billing/list-of-driver-billing';
import { ListOfDriverTransactionAttachment } from './list-of-driver-transaction-attachment/list-of-driver-transaction-attachment';

const routes: Routes = [
  {
    path:'',component:DriverBilling
  },
  {
    path:'listOfDriverBilling',component:ListOfDriverBilling
  },
  {
    path:'driverAttachment',component:ListOfDriverTransactionAttachment
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverBillingRoutingModule { }
