import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-new-invoice-billing',
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule,FormsModule,NgxPrintModule],
  templateUrl: './new-invoice-billing.html',
  styleUrl: './new-invoice-billing.scss',
})
export class NewInvoiceBilling {
  
InvoiceID ='';
  AccountId ='';
  listOfData:any[] =[];
  listForPdf:any =[];
  TransactionID:any;
  currentDate =new Date()
  showSpinner = true;
  ListOfAllVehicle:any=[]
  Service:any;
  allNotes: string[] = [];

displayRows: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,private http:AllApiService,private router:ActivatedRoute,public dialog: MatDialog,private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    let data = this.data ;
    // this.InvoiceID = data.InvoiceID
    this.InvoiceID = data.InvoiceID ?? 0;
    // alert(this.InvoiceID)
    this.AccountId = data.AccountID
    this.Service = data.Service
    // this.AccountID = JSON.parse(localStorage.getItem('accountId')||'{}') 
    // this.getAllTransationByAccountId();
    this.getdetailOfAllData();
    this.getResultData()
    // this.makeForm()
  }
 getdetailOfAllData() {
  this.http.getAllDataByTwoId(ApiUrl.getDatForInvoice, this.AccountId, this.InvoiceID)
    .subscribe(data => {

      let obj = JSON.parse(JSON.stringify(data));

      this.listForPdf = obj.Detail || [];

      this.allNotes = [];

      this.listForPdf.forEach((outer: any) => {
        outer.Detail?.forEach((inner: any) => {
          if (inner.Notes) {
            this.allNotes.push(inner.Notes);
          }
        });
      });

      this.showSpinner = false;

      this.cdr.detectChanges(); // 🔥 THIS LINE FIXES ERROR
    });
}
// getCalculatedValues(data1: any) {

//   const amount = Number(data1?.Amount || 0);
//   const policyFee = Number(data1?.PolicyFee || 0);
//   const companyFinanced = Number(data1?.CompanyFinanced || 0);
//    const agencyFees = Number(data1?.AgencyFees || 0);
//   const surpluxPercent = Number(data1?.SurpluxTax || 0);
//   const stamingPercent = Number(data1?.StamingFee || 0);

//   const surpluxValue = (amount * surpluxPercent) / 100;
//   const stamingValue = (amount * stamingPercent) / 100;

//   const total =
//     amount + policyFee + agencyFees + surpluxValue + stamingValue + companyFinanced;

//   return {
//     surpluxValue,
//     stamingValue,
//     total
//   };
// }
getCalculatedValues(item: any) {

  const amount = Number(item?.Amount ?? 0);
  const policyFee = Number(item?.PolicyFee ?? 0);
  const agencyFees = Number(item?.AgencyFees ?? 0);
  const companyFinanced = Number(item?.CompanyFinanced ?? 0);
const agencyDiscount = Number(item?.AgencyDiscount ?? 0);
  const surpluxPercent = Number(item?.SurpluxTax ?? 0);
  const stampingPercent = Number(item?.StamingFee ?? 0);
  const commissionPercent = Number(item?.Commission ?? 0);

  // Tax Amounts
  const surpluxValue = Number(
    ((amount * surpluxPercent) / 100).toFixed(2)
  );

  const stamingValue = Number(
    ((amount * stampingPercent) / 100).toFixed(2)
  );

  // Total Premium (Display Only)
 const totalPremium = Number(
  (
    amount +
    policyFee +
    agencyFees +
    surpluxValue +
    stamingValue -
    companyFinanced -
    agencyDiscount
  ).toFixed(2)
);

  // Commission (on Premium Amount only)
  const commissionValue = Number(
    ((amount * commissionPercent) / 100).toFixed(2)
  );

  // Invoice Total after Commission (Display Only)
  const invoiceTotal = Number(
    (totalPremium - commissionValue).toFixed(2)
  );

  // Total Received
  const receivedAmount = (item?.TransactionDetails || []).reduce(
    (sum: number, payment: any) =>
      sum + Number(payment?.RecieveAmount ?? 0),
    0
  );

  // Final Due Amount from API
  const totalDue = Number(
    item?.OpeningBalance ??
    item?.Total ??
    (invoiceTotal - receivedAmount)
  );

 return {
  amount,
  policyFee,
  agencyFees,
  companyFinanced,
  agencyDiscount,
  surpluxValue,
  stamingValue,
  commissionPercent,
  commissionValue,
  totalPremium,
  invoiceTotal,
  receivedAmount,
  totalDue
};
}
 getResultData() {
  // Check if Service is not null, not empty string, and not zero
  if (this.Service !== null && this.Service !== '' && this.Service !== 0) {
    this.http.getAllDataByTwoId(ApiUrl.submitChangeRequestForDriverAndVehicle, this.AccountId, this.Service)
      .subscribe(data => {
        const obj = JSON.parse(JSON.stringify(data));
        this.ListOfAllVehicle = obj.Vehicles || [];
      });
  } else {
    // Optionally clear or set empty list if Service is invalid
    this.ListOfAllVehicle = [];
  }
}


// getDisplayRows(item: any): any[] {

//   const calc = this.getCalculatedValues(item);

//   return [

//     // Premium
//     {
//       company: item.Address,
//       classification: item.LineName,
//       transaction: 'New',
//       description: item.ChildPolicyName,
//       premium: calc.amount,
//       credit: 0
//     },

//     ...(calc.policyFee > 0 ? [{
//       company: 'BSR - TX',
//       classification: 'Technology Service Fee',
//       transaction: 'Fees',
//       description: item.ChildPolicyName,
//       premium: calc.policyFee,
//       credit: 0
//     }] : []),

//     ...(calc.agencyFees > 0 ? [{
//       company: 'BSR - TX',
//       classification: 'ATA Fee',
//       transaction: 'Fees',
//       description: item.ChildPolicyName,
//       premium: calc.agencyFees,
//       credit: 0
//     }] : []),

//     ...(calc.surpluxValue > 0 ? [{
//       company: 'California Department of Insurance',
//       classification: 'California Surplus Line Tax',
//       transaction: 'Taxes',
//       description: item.ChildPolicyName,
//       premium: calc.surpluxValue,
//       credit: 0
//     }] : []),

//     ...(calc.stamingValue > 0 ? [{
//       company: 'Surplus Line Association of California',
//       classification: 'California Stamping Fee',
//       transaction: 'Taxes',
//       description: item.ChildPolicyName,
//       premium: calc.stamingValue,
//       credit: 0
//     }] : []),

//     ...(calc.commissionValue > 0 ? [{
//       company: item.Address,
//       classification: item.LineName,
//       transaction: 'Commission',
//       description: `${calc.commissionPercent}% Commission`,
//       premium: 0,
//       credit: calc.commissionValue
//     }] : []),

//     {
//       company: '',
//       classification: '',
//       transaction: 'Total Premium',
//       description: '',
//       premium: calc.totalPremium,
//       credit: 0
//     },

//     {
//       company: '',
//       classification: '',
//       transaction: 'Amount Due',
//       description: '',
//       premium: 0,
//       credit: calc.totalDue
//     }

//   ];
// }


getDisplayRows(item: any): any[] {

  const calc = this.getCalculatedValues(item);

  const rows: any[] = [

    // Premium
    {
      company: item.Address,
      classification: item.LineName,
      transaction: item.TransCode,
      // description: item.ChildPolicyName,
      premium: calc.amount,
      credit: 0
    }
  ];

  // Policy Fee
  if (calc.policyFee > 0) {
    rows.push({
      company: 'ATA',
      classification: 'Polcy Fess',
      transaction: 'Fees',
      // description: item.ChildPolicyName,
      premium: calc.policyFee,
      credit: 0
    });
  }

  // ATA Fee
  if (calc.agencyFees > 0) {
    rows.push({
      company: 'ATA ',
      classification: 'Fee',
      transaction: 'Fees',
      // description: item.ChildPolicyName,
      premium: calc.agencyFees,
      credit: 0
    });
  }

  // Surplus Tax
  if (calc.surpluxValue > 0) {
    rows.push({
      company: ' Department of Insurance',
      classification: 'Surplus Line Tax',
      transaction: 'Taxes',
      // description: item.ChildPolicyName,
      premium: calc.surpluxValue,
      credit: 0
    });
  }

  // Stamping Fee
  if (calc.stamingValue > 0) {
    rows.push({
      company: 'Surplus Line Association of ',
      classification: ' Stamping Fee',
      transaction: 'Taxes',
      // description: item.ChildPolicyName,
      premium: calc.stamingValue,
      credit: 0
    });
  }

  // Commission
  if (calc.commissionValue > 0) {
    rows.push({
      company:'Commission',
      classification: item.LineName,
      transaction: `${calc.commissionPercent}% Commission`,
      // description: `${calc.commissionPercent}% Commission`,
      premium: 0,
      credit: calc.commissionValue
    });
  }

  if (Number(calc.companyFinanced) !== 0) {
  rows.push({
    company: '',
    classification: '',
    transaction: 'Company Financed',
    
    premium: 0,
    credit: Math.abs(calc.companyFinanced)
  });
}

// Agency Discount (Deduction)
if (Number(calc.agencyDiscount) > 0) {
  rows.push({
    company: '',
    classification: '',
    transaction: 'Agency Discount',
    description: '',
    premium: 0,
    credit: calc.agencyDiscount
  });
}
  // Total Premium
  rows.push({
    company: '',
    classification: '',
    transaction: 'Total Premium',
    description: '',
    premium: calc.totalPremium,
    credit: 0
  });

  // Payments Received
  if (item.TransactionDetails?.length) {

    item.TransactionDetails.forEach((payment: any) => {

      rows.push({
        company: '',
        classification: '',
        transaction: 'Payment',
        description: `${payment.Notes} (${new Date(payment.CurDate).toLocaleDateString('en-US')})`,
        premium: 0,
        credit: payment.RecieveAmount
      });

    });

  }

  // Total Received
  if (calc.receivedAmount > 0) {
    rows.push({
      company: '',
      classification: '',
      transaction: 'Total Received',
      description: '',
      premium: 0,
      credit: calc.receivedAmount
    });
  }

  // Amount Due
  rows.push({
    company: '',
    classification: '',
    transaction: 'Amount Due',
    description: '',
    premium: 0,
    credit: calc.totalDue
  });

  return rows;
}
 

}
