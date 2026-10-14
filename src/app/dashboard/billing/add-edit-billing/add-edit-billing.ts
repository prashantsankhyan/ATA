import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiUrl } from '../../../_core/apiUrl';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-add-edit-billing',
    imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule,FormsModule ],
  templateUrl: './add-edit-billing.html',
  styleUrl: './add-edit-billing.scss',
    providers: [DatePipe]
})
export class AddEditBilling {
 @ViewChild('descInput') descInput!: ElementRef;

 
  @ViewChild('firstRow') firstRow!: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Ensure input doesn't auto-focus
      this.descInput?.nativeElement?.blur();
      
      // Focus first table row (or any other element)
      this.firstRow?.nativeElement?.focus();
    }, 0);
  }
  showSpiner = true;
  
  addEditTransactionForm!:FormGroup ;
  submit = false ;
  AccountID:any;
  AccountName:any;
  listOfCombineMoveResSubPolicy:any =[];
  listOfPolicyLine:any =[];
  listOfServicePolicy:any =[];

  // markedPolicyID ='';
 
  TransactionID ='';
  HideShowButtoon:any
  Flag='';
  Id =''

  showPolicyAndService = false;
  toggle = true;
  status = 'Enable';
  userPermission:any ;
  userPermissionList:any =[];
  IsSaveAllowed= true;
  alertMessage =''
 
  dataResponse:any;
  errorMessage ='';
  DateofBirth = new Date()
  DateofHired = new Date();

  messageSuccess = true;
  listTransationCode:any =[]
  pipe = new DatePipe('en-US');
  Description:any;
  description2:any;
  
  setEffective= new Date(); 
  EffectiveDate:any ;
  Date2:any
  Date1 =new Date()
  setGenerateInvoice= new Date();
  generateInvoice:any;
  arDue:any;
  BillingEffective:any;
  CompFin_EffectiveDate:any;
  CompFin_Description:any;

  AccountMonth  =  new Date();  
  ProductionMonth = new Date()
  listOfPolicy:any[] =[]
  listForUpdateData:any =[];
  Policy:any;
  Service:any;
  driverService:any;
  ServiceMultiple: number[] = [];
  MarkedPolicyID:any
  selectionModel:any;
  EndorsementID:any;
  listOfSevices:any[] =[];
  listOfDrviverSevices:any[]=[];
  LoginUserName:any;
  CompanyFinanced =0;
  policyFee =0;
  stamingFee =0;
  surpluxTax =0;
  amount =0;
  total =0;
  agencyDiscount =0;
  agencyFees =0;
  openingBalance =0;
  selectedIndex: number = -1;
  fileID:any;
  ChildPolicyID:any;
  surplusTaxAmount = 0;
stampingAmount = 0;
commissionAmount = 0;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,private http:AllApiService ,private cRouter:ActivatedRoute, private datepipe: DatePipe,private router:Router,
   public dialog: MatDialog,
   private cd: ChangeDetectorRef,
  public dialogRef: MatDialogRef<AddEditBilling>,) {
  
   }

  ngOnInit(): void {
     this.AccountID = localStorage.getItem('AccountID') ;
   this.AccountName = localStorage.getItem('AccountName') ;
    this.LoginUserName = sessionStorage.getItem('UserName');
    this.data
     
   
    this.getAllCode()
    this.makeForm()
    this.getAllPolicyListByAccontId()
    this.currentDate()
    this.genrateInvoiceDate()
    this.HideShowButtoon = this.data.HideShowButtoon
   console.log('Route ID:', this.data.id);
    
    this.TransactionID = this.data.TransactionID
   
    
   if (this.TransactionID && this.TransactionID !== '0') {
  this.getDataToUdateById();

}
 this.addEditTransactionForm.valueChanges.subscribe(() => {
    this.getTotal();
    this.getOpeningBalance();
  });
  }


  
    viewSubmitChangeRequest(data:any){
      // this.dialog.open(ViewSubmitChangeRequsestDriverAndVehicleComponent ,{
      //   width: '1800px',
      //   height:'900px',
      //  data: {ChildPolicyID:data.ChildPolicyID,EndorsementID:data.EndorsementID,AccountID:data.AccountID,EffectiveDateChange:data.EffectiveDateChange,
      //   IDBasedOnAMC:data.IDBasedOnAMC,LineShortName:data.LineShortName,LineName:data.LineName,EnteredBy:data.EnteredBy
  
      //   }
      // });
    }


  currentDate(){
    // let dte = new Date(this.setEffective)
    // var month = dte.getUTCMonth() + 1; 
    //  var day = dte.getUTCDate() + 1;
    //  var year = dte.getUTCFullYear() ;
    
    //  this.EffectiveDate  =month + "/" + day + "/" + year
    //  this.onEffectiveDateChange(dte);
  const californiaDate = this.getCaliforniaDate();

  this.EffectiveDate = this.formatDate(californiaDate);

  this.addEditTransactionForm.patchValue({
    EffectiveDate: this.EffectiveDate
  });

  this.onEffectiveDateChange(californiaDate);
  }
  genrateInvoiceDate(){
    // let dte = new Date(this.setGenerateInvoice)
    // var month = dte.getUTCMonth() + 1; //months from 1-12
    //  var day = dte.getUTCDate() + 1;
    //  var year = dte.getUTCFullYear() ;
    
    //  this.GenerateInvoice  =month + "/" + day + "/" + year

      const californiaDate = this.getCaliforniaDate();

  this.generateInvoice = this.formatDate(californiaDate);

  this.addEditTransactionForm.patchValue({
    generateInvoice: this.generateInvoice
  });
  
  }


    subtractOrAddSimbe(){
      if (this.amount  <0) {
    this.CompanyFinanced = Math.abs(this.amount); // Use the absolute value of amount1
  } else if (this.amount >0) {
    this.CompanyFinanced = -Math.abs(this.amount); // Use the negative absolute value of amount1
  } else {
    // Set the agencyDiscount value for other cases
    // For example:
    this.CompanyFinanced = 0; // Set to some other value
  }
  }

addAmount(){
  this.CompanyFinanced = 0;
  this.policyFee =0;
  this.surpluxTax =0 ;
  this.agencyFees =0
  this.agencyDiscount =0
  this.stamingFee =0

}

//without tira //

// getTotal() {

//   const amount = Number(this.addEditTransactionForm.value.Amount) || 0;
//   const policyFee = Number(this.addEditTransactionForm.value.policyFee) || 0;
//   const surpluxTaxRate = Number(this.addEditTransactionForm.value.SurpluxTax) || 0; // %
//   const agencyDiscount = Number(this.addEditTransactionForm.value.AgencyDiscount) || 0;
//   const agencyFees = Number(this.addEditTransactionForm.value.AgencyFees) || 0;
//   const stampingRate = Number(this.addEditTransactionForm.value.StamingFee) || 0; // %

  
//   const surplusTaxAmount = amount * (surpluxTaxRate / 100);
//   const stampingAmount = amount * (stampingRate / 100);

//   console.log("Surplus Tax Amount:", surplusTaxAmount);
//   console.log("Stamping Amount:", stampingAmount);

//   this.Total =
//       amount
//     + surplusTaxAmount
//     + stampingAmount
//     + policyFee
//     - agencyDiscount
//     + agencyFees;

// }



//with tira//

// getTotal() {

//   const amount = Number(this.addEditTransactionForm.value.Amount) || 0;
//   const policyFee = Number(this.addEditTransactionForm.value.policyFee) || 0;
//   const surpluxTaxRate = Number(this.addEditTransactionForm.value.SurpluxTax) || 0;
//   const agencyDiscount = Number(this.addEditTransactionForm.value.AgencyDiscount) || 0;
//   const agencyFees = Number(this.addEditTransactionForm.value.AgencyFees) || 0;
//   const stampingRate = Number(this.addEditTransactionForm.value.StamingFee) || 0;

//   // TRIA %
//   const triaRate = Number(this.addEditTransactionForm.value.Tria) || 0;

//   // TRIA Amount
//   const triaAmount = amount * (triaRate / 100);

//   // Flat TRIA entered manually
//   const flatTira = Number(this.addEditTransactionForm.value.Flat_Tira) || 0;

//   // const surplusTaxAmount = amount * (surpluxTaxRate / 100);
//   // const stampingAmount = amount * (stampingRate / 100);
// this.surplusTaxAmount = amount * (surpluxTaxRate / 100);
// this.stampingAmount = amount * (stampingRate / 100);

//   this.Total =
//       amount
//    + this.surplusTaxAmount
//   + this.stampingAmount
//     + policyFee
//     + triaAmount
//     + flatTira
//     - agencyDiscount
//     + agencyFees;

//   this.addEditTransactionForm.patchValue(
//     {
//       Total: this.Total.toFixed(2)
//     },
//     { emitEvent: false }
//   );
// }


getTotal() {

  const amount = Number(this.addEditTransactionForm.value.amount) || 0;
  const policyFee = Number(this.addEditTransactionForm.value.policyFee) || 0;
  const surpluxTaxRate = Number(this.addEditTransactionForm.value.surpluxTax) || 0;
  const agencyDiscount = Number(this.addEditTransactionForm.value.agencyDiscount) || 0;
  const agencyFees = Number(this.addEditTransactionForm.value.agencyFees) || 0;
  const stampingRate = Number(this.addEditTransactionForm.value.stamingFee) || 0;

  // Commission %
  const commissionRate = Number(this.addEditTransactionForm.value.commission) || 0;

  // TRIA %
  const triaRate = Number(this.addEditTransactionForm.value.tria) || 0;

  // TRIA Amount
  const triaAmount = amount * (triaRate / 100);

  // Flat TRIA entered manually
  const flatTira = Number(this.addEditTransactionForm.value.flat_Tira) || 0;

  // Tax Amounts
  this.surplusTaxAmount = amount * (surpluxTaxRate / 100);
  this.stampingAmount = amount * (stampingRate / 100);

  // Total Before Commission
  const totalBeforeCommission =
      amount
    + this.surplusTaxAmount
    + this.stampingAmount
    + policyFee
    + triaAmount
    + flatTira
    - agencyDiscount
    + agencyFees;

  // Commission Amount
 this.commissionAmount = amount * (commissionRate / 100);

  // Final Total
  this.total = totalBeforeCommission - this.commissionAmount;

  this.addEditTransactionForm.patchValue(
    {
      total: this.total.toFixed(2)
    },
    { emitEvent: false }
  );
}

// getTotal() {
//   const form = this.addEditTransactionForm;

//   const amount = Number(form.get('amount')?.value) || 0;
//   const policyFee = Number(form.get('policyFee')?.value) || 0;
//   const surpluxTaxRate = Number(form.get('surpluxTax')?.value) || 0;
//   const agencyDiscount = Number(form.get('agencyDiscount')?.value) || 0;
//   const agencyFees = Number(form.get('agencyFees')?.value) || 0;
//   const stampingRate = Number(form.get('stamingFee')?.value) || 0;
//   const commissionRate = Number(form.get('commission')?.value) || 0;
//   const triaRate = Number(form.get('tria')?.value) || 0;
//   const flatTira = Number(form.get('flat_Tira')?.value) || 0;

//   this.surplusTaxAmount = amount * surpluxTaxRate / 100;
//   this.stampingAmount = amount * stampingRate / 100;

//   const triaAmount = amount * triaRate / 100;

//   const totalBeforeCommission =
//     amount +
//     this.surplusTaxAmount +
//     this.stampingAmount +
//     policyFee +
//     triaAmount +
//     flatTira -
//     agencyDiscount +
//     agencyFees;

//   this.commissionAmount = amount * commissionRate / 100;
//   this.total = totalBeforeCommission - this.commissionAmount;

//   form.patchValue({
//     total: this.total.toFixed(2)
//   }, { emitEvent: false });
// }



// getOpeningBalance() {

//   const total = Number(this.Total) || 0;
//   let companyFinanced = Number(
//     this.addEditTransactionForm.get('CompanyFinanced')?.value
//   ) || 0;

 
//   const negativeValue = -Math.abs(companyFinanced);

//   if (companyFinanced !== negativeValue) {
//     this.addEditTransactionForm.patchValue(
//       { CompanyFinanced: negativeValue },
//       { emitEvent: false }
//     );

//     companyFinanced = negativeValue;
//   }


//   this.OpeningBalance = total + companyFinanced;
  
 
// }



getOpeningBalance() {
  const form = this.addEditTransactionForm;

  const total = Number(form.get('total')?.value) || 0;
  let companyFinanced =
    Number(form.get('companyFinanced')?.value) || 0;

  companyFinanced = -Math.abs(companyFinanced);

  if (Number(form.get('companyFinanced')?.value) !== companyFinanced) {
    form.patchValue({
      companyFinanced
    }, { emitEvent: false });
  }

  this.openingBalance = total + companyFinanced;

  form.patchValue({
    openingBalance: this.openingBalance
  }, { emitEvent: false });
}




  

 onEffectiveDateChange(date: any) {
  if (!date) return;

  const selectedDate = new Date(date);

  // ✅ Add 15 days
  selectedDate.setDate(selectedDate.getDate() + 15);

  // ✅ Format using your existing method
  this.arDue = this.formatDate(selectedDate);

  // ✅ Sync with reactive form (important)
  this.addEditTransactionForm.patchValue({
    arDue: this.arDue
  });
}

// getAllPolicyListByAccontId() {
//   this.http.getAllDataId(ApiUrl.getPolicByAccountId,this.AccountID)
//     .subscribe(data => {

//       this.listOfPolicy = data?.ChildPolicys || [];
//       this.showSpiner = false;

//       this.cd.detectChanges();
//     });
// }
getAllPolicyListByAccontId() {
  this.http.getAllDataId(ApiUrl.getPolicByAccountId, this.AccountID)
    .subscribe(data => {

      this.listOfPolicy = (data?.childPolicys || []).filter(
        (policy: any) => policy.stageType === 'Issue'
      );

      this.showSpiner = false;
      this.cd.detectChanges();
    });
}
  
 getDataToUdateById() {
  this.TransactionID = this.data.TransactionID;
  this.showSpiner = true;

  this.http.getAllDataId(ApiUrl.getTracnsagionByUpdate,this.TransactionID)
    .subscribe((res: any) => {

      this.showSpiner = false;

      const data = res?.transactionNews || [];
      if (!data.length) return;

      const first = data[0];
      this.listForUpdateData = data;

      // ================= POLICY =================
      this.Policy = first.Policy;

      // ================= DATE FORMAT =================
      const formatDate = (date: any) => {
        if (!date) return null;
        const d = new Date(date);
        return `${d.getUTCMonth() + 1}/${d.getUTCDate() + 1}/${d.getUTCFullYear()}`;
      };

      // ================= FORM PATCH =================
    this.addEditTransactionForm.patchValue({
  transactionID: first.transactionID ?? '0',
  accountID: first.accountID ?? this.AccountID,
  invoiceID: first.invoiceID ?? null,
  markedPolicyID: first.markedPolicyID ?? null,

  effectiveDate: first.effectiveDate
    ? this.formatDate(new Date(first.effectiveDate))
    : '',

  generateInvoice: first.generateInvoice
    ? this.formatDate(new Date(first.generateInvoice))
    : '',

  arDue: first.arDue
    ? this.formatDate(new Date(first.arDue))
    : '',

  accountMonth: first.accountMonth
    ? new Date(first.accountMonth)
    : null,

  productionMonth: first.productionMonth
    ? new Date(first.productionMonth)
    : null,

  updatedBy: this.LoginUserName,
  department: first.department ?? 'COMMERCIAL Line',
  amount: first.amount ?? 0,
  policy: first.policy ?? '',
  transCode: first.transCode ?? '',
  policyFee: first.policyFee ?? 0,
  surpluxTax: first.surpluxTax ?? 0,
  agencyDiscount: first.agencyDiscount ?? 0,
  agencyFees: first.agencyFees ?? 0,
  paymentMode: first.paymentMode ?? '',
  state: first.state ?? '',
  stamingFee: first.stamingFee ?? 0,
  notes: first.notes ?? '',
  commission: first.commission ?? 0,
  tria: first.tria ?? 0,
  flat_Tira: first.flat_Tira ?? 0,
  companyFinanced: first.companyFinanced ?? 0,
  total: first.total ?? 0,
  openingBalance: first.openingBalance ?? 0,
  service: first.service ?? '',
  driverservice: first.driverservice ?? first.driverService ?? null
});

      // ================= VEHICLES =================
this.http.getAllDataId(ApiUrl.getAllVehcileDetailsByPolicyId, this.Policy)
.subscribe((vehRes: any) => {

  let policyRow: any[] = [];

  if (vehRes.child_Policies) {
    policyRow.push({
      isPolicy: true,
      VehicleDescription: vehRes.child_Policies.ChildPolicyName,
      FileName: vehRes.child_Policies.StageType,
      EndorsementID: '',
      ChildPolicyID: vehRes.child_Policies.ChildPolicyID,
      Effective: vehRes.child_Policies.Expiration,
      fileID: 'policyRow'
    });
  }

  this.listOfSevices = [
    ...policyRow,
    ...(vehRes.vehicles || []).map((x: any) => ({
      ...x,
      isPolicy: false
    }))
  ];

  console.log('Saved Service:', first.service);
  console.log('Vehicle List:', this.listOfSevices);

  if (first.service) {

    const selectedIdx = this.listOfSevices.findIndex(
      (x: any) =>
        String(x.fileID) === String(first.service) ||
        String(x.childPolicyID) === String(first.service)
    );

    console.log('Selected Index:', selectedIdx);

    if (selectedIdx !== -1) {
      this.selectedIndex = selectedIdx;

      this.Service = first.service;

      this.addEditTransactionForm.patchValue({
        service: first.service
      });

      this.cd.detectChanges();
    }
  }
});
      // ================= DRIVERS =================
      this.http.getAllDataId(ApiUrl.driverGetForService, this.Policy)
        .subscribe((drvRes: any) => {
          this.listOfDrviverSevices = drvRes?.vehicles || [];
          this.cd.detectChanges();
        });

      // ================= LOCAL VARIABLES =================
      this.Service = first.service;
      this.driverService = first.DriverService;

      // ================= OPTIONAL LOGIC =================
      if (this.Service) {
        this.fileID = this.Service;
      }

    });
}
 

 showSpinnerOnLoadEndroesement  = false
  getServiceId(data:any){

    // this.MarkedPolicyID  = data.MarkedPolicyID
    this.Policy = data.childPolicyID;
   
    // this.showSpinnerOnLoadEndroesement = true;
    this.getAllEndrosementByMarkedPolicyById();
    this.getAllDriverForServieById();
 
  }

  // getIdFromData(data:any){
  //   this.fileID = data.fileID
  //   this.Service = data.fileID;

  //    this.addEditTransactionForm.patchValue({
  //   Service: this.Service
  // });

  // }


// 

onRowSelect(data: any, idx: number) {

  this.selectedIndex = idx; // row highlight

  this.getIdFromData(data); // always call
}
getIdFromData(data: any) {

  if (data.isPolicy) {
    this.fileID = data.ChildPolicyID;
  } else {
    this.fileID = data.fileID || data.ChildPolicyID;
  }

  this.ChildPolicyID = data.ChildPolicyID;
  this.Service = this.fileID;

  this.addEditTransactionForm.patchValue({
    service: this.Service
  });

  console.log('Selected ID:', this.fileID);
  console.log('Service:', this.Service);
}


  getDriverIDData(data:any){
     this.fileID = data.fileID
     this.driverService = data.fileID;
     this.addEditTransactionForm.patchValue({
     driverservice: this.driverService
  });

  }
  
changeTableRowColor(index: number) {
  this.selectedIndex = index;
}
 

getAllEndrosementByMarkedPolicyById() {
  this.http
    .getAllDataId(ApiUrl.getAllVehcileDetailsByPolicyId, this.Policy)
    .subscribe({
      next: (data: any) => {
        this.showSpinnerOnLoadEndroesement = false;

        // API response directly use karein
        const obj = data;

        const policyRow: any[] = [];

        // Child policy ko first row mein show karein
        if (obj?.child_Policies) {
          const policy = obj.child_Policies;

          policyRow.push({
            isPolicy: true,
            VehicleDescription: policy.childPolicyName,
            FileName: policy.stageType,
            EndorsementID: policy.endorsementId,
            ChildPolicyID: policy.childPolicyID,
            Effective: policy.expiration,
            fileID: 'policyRow'
          });
        }

        // Vehicles ko policy row ke neeche show karein
        this.listOfSevices = [
          ...policyRow,
          ...(Array.isArray(obj?.vehicles)
            ? obj.vehicles.map((x: any) => ({
                ...x,
                isPolicy: false
              }))
            : [])
        ];

        console.log('Final Data:', this.listOfSevices);

        this.cd.detectChanges();
      },
      error: (err: any) => {
        this.showSpinnerOnLoadEndroesement = false;
        console.error('Error loading policy and vehicles:', err);
      }
    });
}


  getAllDriverForServieById(){
    this.http.getAllDataId(ApiUrl.driverGetForService,this.Policy).subscribe(
      data=>{
        this.showSpinnerOnLoadEndroesement = false
        let respone  = JSON.stringify(data)
        let obj = JSON.parse(respone)
        this.listOfDrviverSevices = obj.Vehicles || [];
        this.cd.detectChanges(); // 🔥 force update
        console.log("Driver Data:", this.listOfDrviverSevices);
      }
    )
  }
 


  // setArDate(){
  //   this.GenerateInvoice
  //   let dte = new Date(this.GenerateInvoice)
  //   let newdate  = dte.setDate(dte.getDate() +7) 
  //   let arDate= new Date(newdate )
   
  //   this.ARDue = this.formatDate(arDate)
    
    
    
   
     
  // }

  // if you still need it
setArDate(){
  let dte = new Date(this.generateInvoice);
  let newdate  = dte.setDate(dte.getDate() + 15); // ✅ FIXED
  let arDate= new Date(newdate);
  this.arDue = this.formatDate(arDate);
}

  formatDate(date: Date): string {
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();

    // Pad single digits with leading zeros
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    return `${formattedMonth}/${formattedDay}/${year}`;
  }
 




  // rowClicked:any
  // changeTableRowColor(id: any) { 
   
  //   if(this.rowClicked === id) {
     
  //     this.rowClicked = 1;
     
  //   }
  //   else this.rowClicked = id;
  //   this.markedPolicyID = id.MarkedPolicyID
  
  //   this.showPolicyAndService = true
   
    
  // }

  stateData: any = {
     TaxManual: { taxRate: 0.000, stampingFee: 0.000 },
  AK: { taxRate: 2.700, stampingFee: 1.000 },
  AL: { taxRate: 6.000, stampingFee: 0.175 },
  AR: { taxRate: 4.000, stampingFee: 0.000 },
  AZ: { taxRate: 3.000, stampingFee: 0.200 },
  CA: { taxRate: 3.000, stampingFee: 0.180 },
  CO: { taxRate: 3.000, stampingFee: 0.175 },
  CT: { taxRate: 4.000, stampingFee: 0.000 },
  DC: { taxRate: 2.000, stampingFee: 0.000 },
  DE: { taxRate: 3.000, stampingFee: 0.000 },
  FL: { taxRate: 4.940, stampingFee: 0.060 },
  GA: { taxRate: 4.000, stampingFee: 0.000 },
  HI: { taxRate: 4.680, stampingFee: 0.000 },
  IA: { taxRate: 0.925, stampingFee: 0.000 },
  ID: { taxRate: 1.500, stampingFee: 0.500 },
  IL: { taxRate: 3.500, stampingFee: 0.040 },
  IN: { taxRate: 2.500, stampingFee: 0.000 },
  KS: { taxRate: 3.000, stampingFee: 0.000 },
  KY: { taxRate: 3.000, stampingFee: 0.000 },
  LA: { taxRate: 4.850, stampingFee: 0.000 },
  MA: { taxRate: 4.000, stampingFee: 0.000 },
  MD: { taxRate: 3.000, stampingFee: 0.000 },
  ME: { taxRate: 3.000, stampingFee: 0.000 },
  MI: { taxRate: 2.500, stampingFee: 0.000 },
  MN: { taxRate: 3.000, stampingFee: 0.040 },
  MO: { taxRate: 5.000, stampingFee: 0.000 },
  MS: { taxRate: 4.000, stampingFee: 0.250 },
  MT: { taxRate: 2.750, stampingFee: 0.175 },
  NC: { taxRate: 5.000, stampingFee: 0.300 },
  ND: { taxRate: 1.750, stampingFee: 0.000 },
  NE: { taxRate: 3.000, stampingFee: 0.000 },
  NH: { taxRate: 3.000, stampingFee: 0.000 },
  NJ: { taxRate: 5.000, stampingFee: 0.000 },
  NM: { taxRate: 3.003, stampingFee: 0.000 },
  NV: { taxRate: 3.500, stampingFee: 0.400 },
  NY: { taxRate: 3.600, stampingFee: 0.150 },
  OH: { taxRate: 5.000, stampingFee: 0.000 },
  OK: { taxRate: 6.000, stampingFee: 0.175 },
  OR: { taxRate: 2.000, stampingFee: 10 },   // Flat fee
  PA: { taxRate: 3.000, stampingFee: 20 },   // Flat fee
  PR: { taxRate: 9.000, stampingFee: 0.000 },
  RI: { taxRate: 4.000, stampingFee: 0.000 },
  SC: { taxRate: 6.000, stampingFee: 0.000 },
  SD: { taxRate: 2.500, stampingFee: 0.175 },
  TN: { taxRate: 5.000, stampingFee: 0.175 },
  TX: { taxRate: 4.850, stampingFee: 0.040 },
  UT: { taxRate: 4.250, stampingFee: 0.180 },
  VA: { taxRate: 2.250, stampingFee: 0.035 },
  VI: { taxRate: 5.000, stampingFee: 0.000 },
  VT: { taxRate: 3.000, stampingFee: 0.000 },
  WA: { taxRate: 2.000, stampingFee: 0.300 },
  WI: { taxRate: 3.000, stampingFee: 0.000 },
  WV: { taxRate: 4.550, stampingFee: 0.000 },
  WY: { taxRate: 3.000, stampingFee: 0.175 }
};

// onStateChange(state: string) {

//   const selected = this.stateData[state];

//   if (selected) {
//     this.addEditTransactionForm.patchValue({
//       SurpluxTax: selected.taxRate,
//       StamingFee: selected.stampingFee
//     });
//   }
// }

// onStateChange(state: string) {

//   if (state === 'TaxManual') {

//     this.addEditTransactionForm.patchValue({
//       SurpluxTax: 0,
//       StamingFee: 0
//     });

//     return;
//   }

//   const selected = this.stateData[state];

//   if (selected) {
//     this.addEditTransactionForm.patchValue({
//       SurpluxTax: selected.taxRate,
//       StamingFee: selected.stampingFee
//     });
//   }
// }

onStateChange(state: string) {
  if (state === 'TaxManual') {
    this.addEditTransactionForm.patchValue({
      surpluxTax: 0,
      stamingFee: 0
    });
    return;
  }

  const selected = this.stateData[state];

  if (selected) {
    this.addEditTransactionForm.patchValue({
      surpluxTax: selected.taxRate,
      stamingFee: selected.stampingFee
    });
  }
}




  getAllCode(){
    this.http.getAllData(ApiUrl.getAllTransationCode).subscribe(data=>{
      this.showSpiner = false
      let response = JSON.stringify(data);
      let obj  = JSON.parse(response);
      this.listTransationCode = obj.Transaction_Codes
    })
  }

  
  
  
 
  clickOnCommodity(data?:any){

   this.Flag = data.Description ;
   this.Id = data.CommodityID;
   let date =this.datepipe.transform(data.Effective, 'yyy-MM-dd')
   this.Description = data.Action + data.Description + data.Stage + date;
   this.CompFin_Description = data.Description
   
   this.Date1 = new Date(data.Effective)  
   let latest_date =this.datepipe.transform(this.Date1,'yyy-MM-dd')
   this.Date2 = latest_date;
   this.BillingEffective = latest_date;
   this.CompFin_EffectiveDate = latest_date

   
   console.log('Description',this.Description)
   

  }
  clickOnVehicle(data?:any){
    this.Flag = data.Description
    
    this.Id = data.VehicleID;
    let date =this.datepipe.transform(data.Effective, 'yyyy-MM-dd')
   this.Description = data.Action + data.Description + data.Stage + date;
   this.CompFin_Description = data.Description
   this.Date1 = new Date(data.Effective)  ;
   
   let latest_date =this.datepipe.transform(this.Date1,'yyyy-MM-dd')
   this.Date2 = latest_date;
   this.BillingEffective = latest_date;
   this.CompFin_EffectiveDate =latest_date
   }
   clickOnDriver(data?:any){
    this.Flag = data.Description
    this.Id = data.DriverID;
    let date =this.datepipe.transform(data.Effective, 'yyy-MM-dd')
   this.Description = data.Action+data.Description + data.Stage + date;
   this.CompFin_Description = data.Description
   this.Date1 = new Date(data.Effective)  
   let latest_date =this.datepipe.transform(this.Date1,'yyyy-MM-dd')
   this.Date2 = latest_date;
   this.BillingEffective = latest_date;
   this.CompFin_EffectiveDate = latest_date

   }

   getCaliforniaDate(): Date {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles'
    })
  );
}



  // makeForm(){
   
  //   this.addEditTransactionForm = this.fb.group({
  //     TransactionID:['0'],
  //     MarkedPolicyID:[this.MarkedPolicyID],
  //     AccountID:[this.AccountID],
  //     InvoiceID:[''],
  //     GenerateInvoice:[''],
  //     AccountMonth:[this.AccountMonth],
  //     ARDue:[''],
  //     BillingEffective:[''],
  //     Department:['COMMERCIAL Line'],
  //     ProductionMonth:[this.ProductionMonth],
  //     EnteredBy:[this.LoginUserName],

  //     UpdatedBy:[''],
  //     Amount:[''],
  //     Policy:[''],
  //     Driverservice:[''],
  //     Service:[''],
  //     TransCode:[''],
  //     PaymentMode:[''],
  //     State:[''],
  //     StamingFee:[''],
  //     Notes:[''],
  //     Commission:[''],
  //     policyFee:[''],
  //     SurpluxTax:[''],
  //     AgencyFees:[''],
  //     Flat_Tira:[''],
  //     Tria:[''],
  //     CompanyFinanced:[''],
  //     AgencyDiscount:[''],
  //     EffectiveDate:[''],
  //     Total:[''],
  //     OpeningBalance:[''],
  //   });
  // }

 
makeForm() {
  this.addEditTransactionForm = this.fb.group({
    transactionID: ['0'],
    markedPolicyID: [this.MarkedPolicyID],
    accountID: [this.AccountID, Validators.required],

    invoiceID: [null],
    generateInvoice: ['', Validators.required],
    accountMonth: [this.AccountMonth],
    arDue: ['', Validators.required],
    billingEffective: [this.BillingEffective,],
    department: ['COMMERCIAL Line'],
    productionMonth: [this.ProductionMonth],
    enteredBy: [this.LoginUserName],
    updatedBy: [''],

    amount: ['',],
    policy: ['',],
    driverservice: [''],
    service: ['',],
    transCode: ['', ],
    paymentMode: [''],
    state: ['',],
    stamingFee: [''],
    notes: [''],
    commission: [''],
    policyFee: [0],
    surpluxTax: [''],
    agencyFees: [''],
    flat_Tira: [''],
    tria: [0],
    companyFinanced: [''],
    agencyDiscount: [''],
    effectiveDate: ['', ],
    total: [''],
    openingBalance: [0],
  });
}





  // onSubmit() {
  //   this.submit = true ; 
  //   this.messageSuccess = false;
  //   console.log('Submit clicked'); console.log('Form valid:', this.addEditTransactionForm.valid); console.log('Form values:', this.addEditTransactionForm.getRawValue());
  //   if (this.addEditTransactionForm.invalid) { this.addEditTransactionForm.markAllAsTouched(); console.log('Invalid controls:'); Object.keys(this.addEditTransactionForm.controls).forEach(key => { const control = this.addEditTransactionForm.get(key); if (control?.invalid) { console.log(key, control.errors, control.value); } }); this.messageSuccess = true; return; }
   

  //  let obj = JSON.parse(JSON.stringify(this.addEditTransactionForm.value))

  //  if(this.TransactionID){
  //   obj['TransactionID'] = this.TransactionID
  // }

  //   this.http.addEditData(ApiUrl.addEditNewTransaction,obj).pipe().subscribe(
  //     data => {
  //       let response  = JSON.stringify(data)
  //       var obj = JSON.parse(response);
  //       this.dataResponse =obj.Data.Response;
        
       
  //       if(this.dataResponse == '0'){
  //         this.errorMessage = obj.Data.ErrorMessage
  //         this.error()
        
  //       }
  //       else{
  //         this.alertMessage = obj.Data.ErrorMessage
  //         this.showSuccess()
  //       }
     
  //       this.onNoClick1()
  //       console.log(obj)
        
  //     }
    
  //   )
  // }

private toApiDate(value: any): string | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}



onSubmit() {
  this.submit = true;
  this.messageSuccess = false;

  const form = this.addEditTransactionForm;

  console.log('Submit clicked');
  console.log('Form valid:', form.valid);
  console.log('Form values:', form.getRawValue());

  // 1. Validate Angular form
  if (form.invalid) {
    form.markAllAsTouched();

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);

      if (control?.invalid) {
        console.error(
          'Invalid control:',
          key,
          control.errors,
          control.value
        );
      }
    });

    this.messageSuccess = true;
    return;
  }

  // 2. Build a separate API payload
  const obj: any = {
    ...form.getRawValue()
  };

  // 3. Convert date fields
  const dateFields = [
    'generateInvoice',
    'arDue',
    'billingEffective',
    'effectiveDate',
    'accountMonth',
    'productionMonth'
  ];

  for (const field of dateFields) {
    const value = obj[field];

    if (value === '' || value === null || value === undefined) {
      obj[field] = null;
      continue;
    }

    const convertedDate = this.toApiDate(value);

    if (!convertedDate) {
      console.error('Invalid date:', field, value);
      this.errorMessage = `Please enter a valid date for ${field}.`;
      this.error();
      return;
    }

    obj[field] = convertedDate;
  }

  // 4. Convert integer fields
  const integerFields = [
    'transactionID',
    'markedPolicyID',
    'accountID',
    'invoiceID',
    'driverservice',
    'service'
  ];

  for (const field of integerFields) {
    const value = obj[field];

    if (value === '' || value === null || value === undefined) {
      obj[field] = null;
      continue;
    }

    const numberValue = Number(value);

    if (!Number.isSafeInteger(numberValue)) {
      console.error('Invalid integer field:', field, value);
      this.errorMessage = `${field} must be a valid integer.`;
      this.error();
      return;
    }

    obj[field] = numberValue;
  }

  // 5. Convert numeric fields
  // flat_Tira and tria are excluded because the API expects strings.
  const numericFields = [
    'amount',
    'policyFee',
    'surpluxTax',
    'agencyFees',
    'commission',
    'companyFinanced',
    'agencyDiscount',
    'total',
    'openingBalance',
    'stamingFee'
  ];

  for (const field of numericFields) {
    const value = obj[field];

    if (value === '' || value === null || value === undefined) {
      obj[field] = null;
      continue;
    }

    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      console.error('Invalid numeric field:', field, value);
      this.errorMessage = `${field} must be a valid number.`;
      this.error();
      return;
    }

    obj[field] = numberValue;
  }

  // 6. Convert string fields expected by the API
  const stringFields = [
    'flat_Tira',
    'tria',
    'companyFinanced'
  ];

  for (const field of stringFields) {
    const value = obj[field];

    if (value === null || value === undefined || value === '') {
      obj[field] = null;
    } else {
      obj[field] = String(value);
    }
  }

  // 7. Ensure the correct transaction ID when editing
  if (
    this.TransactionID !== null &&
    this.TransactionID !== undefined &&
    String(this.TransactionID).trim() !== '' &&
    String(this.TransactionID) !== '0'
  ) {
    const id = Number(this.TransactionID);

    if (!Number.isSafeInteger(id)) {
      console.error('Invalid TransactionID:', this.TransactionID);
      this.errorMessage = 'Invalid Transaction ID.';
      this.error();
      return;
    }

    obj.transactionID = id;
  }

  // 8. Log payload and data types
  console.log('Final API payload:', obj);
  console.log('Payload JSON:', JSON.stringify(obj));

  console.log('Field types:', {
    transactionID: typeof obj.transactionID,
    markedPolicyID: typeof obj.markedPolicyID,
    accountID: typeof obj.accountID,
    invoiceID: typeof obj.invoiceID,
    driverservice: typeof obj.driverservice,
    service: typeof obj.service,
    flat_Tira: typeof obj.flat_Tira,
    tria: typeof obj.tria,
    commission: typeof obj.commission,
    companyFinanced: typeof obj.companyFinanced
  });

  // 9. Submit to API
  this.http.addEditData(ApiUrl.addEditNewTransaction, obj)
    .subscribe({
      next: (data: any) => {
        console.log('API response:', data);

        const result = data?.Data ?? data?.data ?? data;

        this.dataResponse =
          result?.Response ?? result?.response;

        if (
          this.dataResponse !== undefined &&
          String(this.dataResponse) === '0'
        ) {
          this.errorMessage =
            result?.ErrorMessage ??
            result?.errorMessage ??
            'Unable to save transaction.';

          this.error();
          return;
        }

        this.alertMessage =
          result?.ErrorMessage ??
          result?.errorMessage ??
          'Transaction saved successfully.';

        this.showSuccess();
        this.onNoClick1();
      },

      error: (err: any) => {
        console.error('API status:', err?.status);
        console.error('Full API error:', err?.error);

        const errors = err?.error?.errors;
        const messages: string[] = [];

        if (errors) {
          Object.entries(errors).forEach(([field, value]) => {
            const message = Array.isArray(value)
              ? value.join(', ')
              : String(value);

            console.error(`${field}: ${message}`);
            messages.push(`${field}: ${message}`);
          });
        }

        this.errorMessage =
          messages.join('\n') ||
          err?.error?.title ||
          err?.error?.message ||
          err?.message ||
          'Failed to save transaction.';

        this.error();
      }
    });
}







  showSuccess() {
   
    this.changeLocation()
  
  } 
  getService(data:any){

  }

  error() {
   
    this.changeLocation()
  }
  get f() {
    return this.addEditTransactionForm.controls;
    
  }


  onNoClick1(): void {
    this.dialogRef.close();
   
  }

//  addCompanyFinanced() {
  
  
//     this.dialog.open(CompanyFinancedComponent ,{
//       width: '1400px',
//       height:'800px',
    
//     });
  
   
//   }

 

  scrollToTop(el:any) {
    el.scrollTop = 0;
  }
  


  changeLocation() {

    // save current route first
    let currentRoute = this.router.url;
    console.log("rute" , currentRoute)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }

}
