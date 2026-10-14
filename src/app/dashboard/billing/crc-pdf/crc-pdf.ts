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
  selector: 'app-crc-pdf',
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule,FormsModule,NgxPrintModule],
  templateUrl: './crc-pdf.html',
  styleUrl: './crc-pdf.scss',
})
export class CrcPdf {
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
GenerateInvoice:any;
invoiceDetails: any[] = [];
totalAmountInvoiced = 0;
totalCommissionPercent = 0;
totalCommissionAmount = 0;
totalNetDue = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,private http:AllApiService,private router:ActivatedRoute,public dialog: MatDialog,private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    let data = this.data ;
    // this.InvoiceID = data.InvoiceID
    this.InvoiceID = data.InvoiceID ?? 0;
    this.GenerateInvoice = data.GenerateInvoice

    // alert(this.InvoiceID)
    this.AccountId = data.AccountID
    this.Service = data.Service
    
    // this.AccountID = JSON.parse(localStorage.getItem('accountId')||'{}') 
    // this.getAllTransationByAccountId();
    this.getdetailOfAllData();
    this.getResultData()
    // this.makeForm()
  
  }

getdetailOfAllData(): void {
  this.showSpinner = true;

  this.http.getAllDataByTwoId(
    ApiUrl.getDatForInvoice,
    this.AccountId,
    this.InvoiceID
  ).subscribe({
    next: (data: any) => {

      // Account and invoice response
      this.listForPdf = data?.detail || [];

      // Notes from transaction details
      this.allNotes = [];

      this.listForPdf.forEach((outer: any) => {
        (outer?.detail || []).forEach((inner: any) => {
          if (inner?.notes) {
            this.allNotes.push(inner.notes);
          }
        });
      });

      // Get account and its transactions
      const account = this.listForPdf[0];

      const transactions = account?.detail || [];

      // Map transaction details
      this.invoiceDetails = transactions.map((item: any) => {

        const amount = Number(item?.amount) || 0;
        const policyFee = Number(item?.policyFee) || 0;

        const surplusTax = Number(item?.surpluxTax) || 0;
        const stampingFee = Number(item?.stamingFee) || 0;

        const commissionPercent = Number(item?.commission) || 0;

        const agencyDiscount = Number(item?.agencyDiscount) || 0;
        const agencyFees = Number(item?.agencyFees) || 0;

        const companyFinanced =
          Number(item?.companyFinanced) || 0;

        const triaRate = Number(item?.tria) || 0;
        const flatTira = Number(item?.flat_Tira) || 0;

        // TRIA percentage amount
        const triaAmount = amount * triaRate / 100;

        // Commission amount
        const commissionAmount =
          amount * commissionPercent / 100;

        // Use API total when provided.
        // Otherwise calculate total from transaction fields.
        const calculatedTotal =
          amount +
          policyFee +
          surplusTax +
          stampingFee +
          companyFinanced +
          triaAmount +
          flatTira -
          agencyDiscount +
          agencyFees;

        const total =
          item?.total !== null &&
          item?.total !== undefined &&
          item?.total !== ''
            ? Number(item.total) || 0
            : calculatedTotal;

        // Received amount
        const receivedAmount =
          Number(item?.receiveAmount) || 0;

        // Remaining balance
        const netDue = total - receivedAmount;

        return {
          TransactionID: item?.transactionID,
          InvoiceID: item?.invoiceID,
          LineName: item?.lineName,
          ARDue: item?.arDue,

          // API uses camelCase
          LineShortName:
            item?.lineShortName ?? item?.lineShortName,

          NAIC: item?.naic,
          Address: item?.address,

          Amount: amount,
          PolicyFee: policyFee,

          SurplusTax: surplusTax,
          StampingFee: stampingFee,

          Commission: commissionPercent,
          CommissionAmount: commissionAmount,

          AgencyDiscount: agencyDiscount,
          AgencyFees: agencyFees,

          Tria: triaRate,
          TriaAmount: triaAmount,
          FlatTira: flatTira,

          Total: total,
          ReceivedAmount: receivedAmount,
          NetDue: netDue,

          Notes: item?.notes || '',
          PaymentMode: item?.paymentMode || '',
          TransactionDate: item?.transactionDate
        };
      });

      // Total premium / amount
      this.totalAmountInvoiced =
        this.invoiceDetails.reduce(
          (sum: number, item: any) =>
            sum + item.Amount,
          0
        );

      // Total commission
      this.totalCommissionAmount =
        this.invoiceDetails.reduce(
          (sum: number, item: any) =>
            sum + item.CommissionAmount,
          0
        );

      // Total invoice amount
      const totalInvoiceAmount =
        this.invoiceDetails.reduce(
          (sum: number, item: any) =>
            sum + item.Total,
          0
        );

      // Total received
      const totalReceivedAmount =
        this.invoiceDetails.reduce(
          (sum: number, item: any) =>
            sum + item.ReceivedAmount,
          0
        );

      // Remaining balance
      this.totalNetDue =
        totalInvoiceAmount - totalReceivedAmount;

      // Overall commission percentage
      this.totalCommissionPercent =
        this.totalAmountInvoiced > 0
          ? (
              this.totalCommissionAmount /
              this.totalAmountInvoiced
            ) * 100
          : 0;

      // Debug logs
      console.log('Invoice Details:', this.invoiceDetails);
      console.log('Total Premium:', this.totalAmountInvoiced);
      console.log('Total Commission:', this.totalCommissionAmount);
      console.log('Total Invoice:', totalInvoiceAmount);
      console.log('Total Received:', totalReceivedAmount);
      console.log('Remaining Due:', this.totalNetDue);
      console.log(
        'Commission Percentage:',
        this.totalCommissionPercent
      );

      this.showSpinner = false;
      this.cdr.detectChanges();
    },

    error: (error: any) => {
      console.error(
        'Error fetching invoice details:',
        error
      );

      this.listForPdf = [];
      this.invoiceDetails = [];
      this.allNotes = [];

      this.totalAmountInvoiced = 0;
      this.totalCommissionAmount = 0;
      this.totalCommissionPercent = 0;
      this.totalNetDue = 0;

      this.showSpinner = false;
      this.cdr.detectChanges();
    }
  });
}

getCalculatedValues(data1: any) {

  const amount = Number(data1?.amount || 0);
  const policyFee = Number(data1?.policyFee || 0);
  const companyFinanced = Number(data1?.companyFinanced || 0);

  const surpluxPercent = Number(data1?.surpluxTax || 0);
  const stamingPercent = Number(data1?.stamingFee || 0);

  const surpluxValue = (amount * surpluxPercent) / 100;
  const stamingValue = (amount * stamingPercent) / 100;

  const total =
    amount + policyFee + surpluxValue + stamingValue + companyFinanced;

  return {
    surpluxValue,
    stamingValue,
    total
  };
}

 getResultData() {
  // Check if Service is not null, not empty string, and not zero
  if (this.Service !== null && this.Service !== '' && this.Service !== 0) {
    this.http.getAllDataByTwoId(ApiUrl.submitChangeRequestForDriverAndVehicle, this.AccountId, this.Service)
      .subscribe(data => {
        const obj = JSON.parse(JSON.stringify(data));
        this.ListOfAllVehicle = obj.vehicles || [];
      });
  } else {
    // Optionally clear or set empty list if Service is invalid
    this.ListOfAllVehicle = [];
  }
}

  // public exportHtmlToPDF(){
  //   let list:any = document.getElementById('htmltable');
      
  //     html2canvas(list).then(canvas => {
          
  //         let docWidth = 204;
  //         let docHeight = canvas.height * docWidth / canvas.width;
          
  //         const contentDataURL = canvas.toDataURL('image/png')
  //         let doc = new jsPDF('p', 'mm', 'a4');
  //         let position = 10;
  //         doc.addImage(contentDataURL, 'PNG', 10, position, docWidth, docHeight)
          
  //         doc.save('exportedPdf.pdf');
  //     });
  // }


//   public exportHtmlToPDF(): void {
    
//     let DATA: any = document.getElementById('htmltable');
// html2canvas(DATA, { scale: 3 }).then((canvas) => {
//   let fileWidth = 208;
//   let fileHeight = (canvas.height * fileWidth) / canvas.width;
//   const FILEURI = canvas.toDataURL('image/png');
//   let PDF = new jsPDF('p', 'mm', 'a4');
//   let position = 0;
//   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
//   PDF.save('invoice.pdf');
// });
//   }
 

}
