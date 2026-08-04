import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllApiService } from '../../../_service/all-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrl } from '../../../_core/apiUrl';
import { AddEditBilling } from '../add-edit-billing/add-edit-billing';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchTransactionFilterPipe } from '../search-transaction-filter-pipe';
import { ManageBalance } from '../manage-balance/manage-balance';
import { PdfConverter } from '../pdf-converter/pdf-converter';
import { Spinner } from '../../../spinner/spinner';
import { CrcPdf } from '../crc-pdf/crc-pdf';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NewInvoiceBilling } from '../new-invoice-billing/new-invoice-billing';
import { DeleteEntryByTransactionId } from '../delete-entry-by-transaction-id/delete-entry-by-transaction-id';
@Component({
  selector: 'app-list-of-billing',
   imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule,SearchTransactionFilterPipe,Spinner],
  templateUrl: './list-of-billing.html',
  styleUrl: './list-of-billing.scss',
   providers: [DatePipe, CurrencyPipe]
})
export class ListOfBilling {

 genrateInvoiceIdForm!:FormGroup ;
 AccountName:any;
  submit = false ;
  alertMessage ="";
  messageSuccess = true;
  AccountID:any;
  listOfTransactions:any =[];
  showSpiner = true;
  Description ='';
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [10, 50, 100, 1000];
  userPermission:any;
  userPermissionList:any =[];
  employeePermission:any;
  pagePermission:any;
  savePermission:any;
  updatePermissin:any;
  deletePermission:any;
  LineName ='';
  TotalBalance='';
  submitFormAlert = true;
  searchCriteria = {
    ARDue: '',
  amount: '',
  enteredBy: '',
  GenerateInvoice: '',
  Child_EffectiveDate: '',
  Child_ExpirationDate:'',
  };
  
  constructor(private fb: FormBuilder,private http:AllApiService,private cRouter:ActivatedRoute,private router:Router,private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  private currencyPipe: CurrencyPipe,) { }

  ngOnInit(): void {
   this.AccountID = localStorage.getItem('AccountID') ;
   this.AccountName = localStorage.getItem('AccountName') ;
    
  
  // 🔥 Call API AFTER getting ID
  this.getAllTransationByAccountId();

    this.makeForm()
  
  }
  updateSearchCriteria(criteria: any) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria };
    this.cdr.markForCheck(); // Notify Angular that changes have occurred
  }

  
  
  onARDueChange(newARDue: string) {
    this.updateSearchCriteria({ ARDue: newARDue });
  }

  onAmountChange(newAmount: string) {
    this.updateSearchCriteria({ amount: newAmount });
  }
  
  
  

  onEnteredByChange(newEnteredBy: string) {
    this.updateSearchCriteria({ enteredBy: newEnteredBy });
  }

  onGenerateInvoiceChange(newGenerateInvoice: string) {
    this.updateSearchCriteria({ GenerateInvoice: newGenerateInvoice });
  }

  onChild_EffectiveDateChange(newChild_EffectiveDate: string) {
    this.updateSearchCriteria({ Child_EffectiveDate: newChild_EffectiveDate });
  }

  onChild_ExpirationDateChange(newChild_ExpirationDate: string) {
    this.updateSearchCriteria({ Child_ExpirationDate: newChild_ExpirationDate });
  }
  

 
getTooltip(data: any): string {

  const money = (value: any) =>
    this.currencyPipe.transform(Number(value || 0), 'USD', 'symbol', '1.2-2');

return (
  `Amount: ${money(data.Amount)}\n` +
  `Policy Fee: ${money(data.PolicyFee)}\n` +
  `Surplus Tax: ${data.SurpluxTax || 0}%\n` +
  `Manual Tax: ${data.SurpluxTax || 0}%\n` +
  `Stamping Fee: ${data.StamingFee || 0}%\n` +
  `TRIA: ${data.Tria || 0}%\n` +
  `Flat TRIA: ${money(data.Flat_Tira)}\n` +
  `Commission: ${data.Commission || 0}%\n` +
  `Total: ${money(data.Total)}\n` +
  `Received: ${money(data.TotalRecievedAmount)}\n` +
  `Opening Balance: ${money(data.OpeningBalance)}`
);
}

  

  // addEditTransactions(data?:any) {
  
  
  //   this.dialog.open(AddEditTransactionsComponent ,{
  //     width: '1800px',
  //     height:'1000px',
  //     data: {TransactionID:data.TransactionID  }

  //   });
  
   
  // }

  getAllTransationByAccountId(){
   
    this.http.getAllDataId(ApiUrl.getAllTransactionsByAccountId,this.AccountID).subscribe(
      data=>{
        this.showSpiner = false
       let response = JSON.stringify(data)
       let obj  = JSON.parse(response)
       
       this.listOfTransactions = obj.TransactionNews
       this.TotalBalance =obj.TotalBalance
       this.cdr.detectChanges(); // 🔥 force update

      }
    )
  }
  
 
  

  makeForm(){
    this.genrateInvoiceIdForm = this.fb.group({
    AccountID:[this.AccountID ,[Validators.required,]],
    TransactionIDs:this.fb.array([]),
    });
  }
  newLineList: any[] = [];

  cehckboxcehck(event: any) {
    const TransactionIDs = this.genrateInvoiceIdForm.get('TransactionIDs') as FormArray;
  
    if (event.target.checked) {
      TransactionIDs.push(this.fb.group({
        TransactionID: event.target.value.toString()
      }));
  
      console.log(TransactionIDs);
    } else {
      let index = -1;
      for (let i = 0; i < TransactionIDs.length; i++) {
        if (TransactionIDs.at(i).value.TransactionID === event.target.value) {
          index = i;
          break;
        }
      }
  
      if (index > -1) {
        TransactionIDs.removeAt(index);
        console.log('After Delete', TransactionIDs);
      }
    }
  }

  submitForm(){
    this.submit = true ; 
    this.submitFormAlert = false
    this.messageSuccess = false;
    if(!this.genrateInvoiceIdForm.valid){
      this.messageSuccess = true;
      return
    }


   
   let obj = JSON.parse(JSON.stringify(this.genrateInvoiceIdForm.value))

     

    this.http.addEditData(ApiUrl.addInvoiceId,obj).pipe().subscribe(
      data => {
        let response  = JSON.stringify(data)
        var obj = JSON.parse(response);
        this.alertMessage =obj.ErrorMessage;
      
       this.showSuccess();
       this.submitFormAlert = false

        console.log(obj)
        
      }
    
    )
   
  }


  changeLocation() {

    // save current route first
    let currentRoute = this.router.url;
    console.log("rute" , currentRoute)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }



 showSuccess() {
   
    this.messageSuccess = false;
    this.changeLocation()
  
  } 

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllTransationByAccountId();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllTransationByAccountId();
  }



  DeleteEntryByTransactionId(data:any){
    
    const dialogRef = this.dialog.open(DeleteEntryByTransactionId, {
    width: '95vw',
    maxWidth: '500px',
     height: '60vh',        // 👈 add this
     maxHeight: '60vh',
    data: {TransactionID:data.TransactionID  }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.getAllTransationByAccountId();
    }
  });
  }

 addEditData(data?: any) {
  const dialogRef = this.dialog.open(AddEditBilling, {
    width: '95vw',
    maxWidth: '1500px',
     height: '100vh',        // 👈 add this
  maxHeight: '100vh',
    data: {TransactionID:data.TransactionID  }
    // data: {
    //   TransactionID: data.TransactionID,   // ✅ always pass
    //   editData: data || null       // ✅ for update case
    // }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.getAllTransationByAccountId();
    }
  });
}
  addEditTransactions(data?:any) {
  
  
    // this.dialog.open(AddEditTransactionComponent ,{
    //   width: '1800px',
    //   height:'800px',
    //   data: {TransactionID:data.TransactionID  }

    // });
  
   
  }

    viewTransactions(data?:any) {
  
    // this.dialog.open(AddEditTransactionComponent ,{
    //   width: '1800px',
    //   height:'800px',
    //   data: {TransactionID:data.TransactionID,HideShowButtoon:'0' }

    // });
  
   
  }

  manageBalance(data?:any) {
    this.dialog.open(ManageBalance ,{
      width: '400px',
      height:'400px',
      data: {InvoiceID:data.InvoiceID,AccountID:data.AccountID,TransactionID:data.TransactionID
       }
    });
  }
 displayDataBrokerMG(data?:any) {
    // this.dialog.open(DisplayCarrierAndBrokerMGComponent ,{
    //   width: '400px',
    //   height:'260px',
    //   data: {broker:data.mGs,carriers:data.carriers
    //    }
    // });
  }



  addInvoice(data?:any) {
    this.dialog.open(PdfConverter,{
       width: '95vw',
    maxWidth: '1500px',
    height:'700px',
    maxHeight: '100vh',
      data: {InvoiceID:data.InvoiceID,AccountID:data.AccountID,Service:data.Service}
    });
  }


  addNewInvoice(data?:any) {
    this.dialog.open(NewInvoiceBilling,{
       width: '95vw',
    maxWidth: '1500px',
    height:'700px',
    maxHeight: '100vh',
      data: {InvoiceID:data.InvoiceID,AccountID:data.AccountID,Service:data.Service}
    });
  }

    crcPdfvoice(data?:any) {
    this.dialog.open(CrcPdf,{
       width: '95vw',
    maxWidth: '1500px',
    height:'700px',
    maxHeight: '100vh',
      data: {InvoiceID:data.InvoiceID,AccountID:data.AccountID,Service:data.Service,GenerateInvoice:data.GenerateInvoice}
    });
  }


  receipt(data?:any) {
    // this.dialog.open(ReceiptComponent,{
    //   width: '1800px',
    //   height:'1000px',
    //   data: {InvoiceID:data.InvoiceID,AccountID:data.AccountID}
    // });
  }



 goToAttachement() {
  this.router.navigateByUrl('/dashboard/billing/billingTransaction');
}

}
