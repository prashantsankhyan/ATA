import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';

@Component({
  selector: 'app-add-edit-driver-billing',
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule,FormsModule ],
  templateUrl: './add-edit-driver-billing.html',
  styleUrl: './add-edit-driver-billing.scss',
   providers: [DatePipe]
})
export class AddEditDriverBilling {
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
  GenerateInvoice:any;
  ARDue:any;
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
  PolicyFee =0;
  StamingFee =0;
  SurpluxTax =0;
  Amount =0;
  Total =0;
  AgencyDiscount =0;
  AgencyFees =0;
  OpeningBalance =0;
  selectedIndex: number = -1;
  fileID:any;
  ChildPolicyID:any;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,private http:AllApiService ,private cRouter:ActivatedRoute, private datepipe: DatePipe,private router:Router,
   public dialog: MatDialog,
   private cd: ChangeDetectorRef,
  public dialogRef: MatDialogRef<AddEditDriverBilling>,) {
  
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
    let dte = new Date(this.setEffective)
    var month = dte.getUTCMonth() + 1; //months from 1-12
     var day = dte.getUTCDate() + 1;
     var year = dte.getUTCFullYear() ;
    
     this.EffectiveDate  =month + "/" + day + "/" + year
  
  }
  genrateInvoiceDate(){
    let dte = new Date(this.setGenerateInvoice)
    var month = dte.getUTCMonth() + 1; //months from 1-12
     var day = dte.getUTCDate() + 1;
     var year = dte.getUTCFullYear() ;
    
     this.GenerateInvoice  =month + "/" + day + "/" + year
  
  }


    subtractOrAddSimbe(){
      if (this.Amount  <0) {
    this.CompanyFinanced = Math.abs(this.Amount); // Use the absolute value of amount1
  } else if (this.Amount >0) {
    this.CompanyFinanced = -Math.abs(this.Amount); // Use the negative absolute value of amount1
  } else {
    // Set the agencyDiscount value for other cases
    // For example:
    this.CompanyFinanced = 0; // Set to some other value
  }
  }

addAmount(){
  this.CompanyFinanced = 0;
  this.PolicyFee =0;
  this.SurpluxTax =0 ;
  this.AgencyFees =0
  this.AgencyDiscount =0
  this.StamingFee =0

}


getTotal() {

  const amount = Number(this.addEditTransactionForm.value.Amount) || 0;
  const policyFee = Number(this.addEditTransactionForm.value.PolicyFee) || 0;
  const surpluxTaxRate = Number(this.addEditTransactionForm.value.SurpluxTax) || 0; // %
  const agencyDiscount = Number(this.addEditTransactionForm.value.AgencyDiscount) || 0;
  const agencyFees = Number(this.addEditTransactionForm.value.AgencyFees) || 0;
  const stampingRate = Number(this.addEditTransactionForm.value.StamingFee) || 0; // %

  // ✅ Convert percentage properly
  const surplusTaxAmount = amount * (surpluxTaxRate / 100);
  const stampingAmount = amount * (stampingRate / 100);

  console.log("Surplus Tax Amount:", surplusTaxAmount);
  console.log("Stamping Amount:", stampingAmount);

  this.Total =
      amount
    + surplusTaxAmount
    + stampingAmount
    + policyFee
    - agencyDiscount
    + agencyFees;

}



//   getOpeningBalance() {
  
//    if (this.Amount < 0) {
     
      
//         this.OpeningBalance = this.Total+this.CompanyFinanced
        

//     } else if (this.Amount > 0) {
//         this.addEditTransactionForm.patchValue({ CompanyFinanced: '-' + Math.abs(this.CompanyFinanced) });
//         this.OpeningBalance = this.Total - Math.abs(this.CompanyFinanced);
//     } else {
//          this.CompanyFinanced =0
//         // this.OpeningBalance = this.Total; 
//     }
// }


// getOpeningBalance() {

//   const amount = Number(this.addEditTransactionForm.get('Amount')?.value) || 0;
//   const total = Number(this.Total) || 0;
//   let companyFinanced = Number(this.addEditTransactionForm.get('CompanyFinanced')?.value) || 0;

//   if (amount < 0) {

//     this.OpeningBalance = total + companyFinanced;

//   } 
//   else if (amount > 0) {

//     const negativeValue = -Math.abs(companyFinanced);

//     // 🔥 Patch ONLY if value different
//     if (companyFinanced !== negativeValue) {
//       this.addEditTransactionForm.patchValue(
//         { CompanyFinanced: negativeValue },
//         { emitEvent: false }   // 🚀 prevents infinite loop
//       );
//       companyFinanced = negativeValue; // update local variable
//     }

//     this.OpeningBalance = total - Math.abs(companyFinanced);
   

//   } 
//   else {

//     this.OpeningBalance = total;

//   }
// }

getOpeningBalance() {

  const total = Number(this.Total) || 0;
  let companyFinanced = Number(
    this.addEditTransactionForm.get('CompanyFinanced')?.value
  ) || 0;

 
  const negativeValue = -Math.abs(companyFinanced);

  if (companyFinanced !== negativeValue) {
    this.addEditTransactionForm.patchValue(
      { CompanyFinanced: negativeValue },
      { emitEvent: false }
    );

    companyFinanced = negativeValue;
  }


  this.OpeningBalance = total + companyFinanced;
  
 
}


// getOpeningBalance() {

//   const total = Number(this.Total) || 0;

//   let companyFinanced = Number(
//     this.addEditTransactionForm.get('CompanyFinanced')?.value
//   ) || 0;

//   // Always keep negative
//   const negativeValue = -Math.abs(companyFinanced);

//   if (companyFinanced !== negativeValue) {
//     this.addEditTransactionForm.patchValue(
//       { CompanyFinanced: negativeValue },
//       { emitEvent: false }
//     );
//     companyFinanced = negativeValue;
//   }

//   const openingBalance = total + companyFinanced;

//   // ✅ Update FORM CONTROL (not variable)
//   this.addEditTransactionForm
//       .get('OpeningBalance')
//       ?.setValue(openingBalance, { emitEvent: false });
// }

  // getOpeningBalance(){
    
  //   this.OpeningBalance = this.Total+this.CompanyFinanced
  // }
  

 

getAllPolicyListByAccontId() {
  this.http.getAllDataId(ApiUrl.getPolicByAccountId,this.AccountID)
    .subscribe(data => {

      this.listOfPolicy = data?.ChildPolicys || [];
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

      const data = res?.TransactionNews || [];
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
        TransactionID: first.TransactionID,
        AccountID: first.AccountID,
        InvoiceID: first.InvoiceID,
        MarkedPolicyID: first.MarkedPolicyID,
        GenerateInvoice: formatDate(first.GenerateInvoice),
        ARDue: formatDate(first.ARDue),
        AccountMonth: new Date(first.AccountMonth),
        ProductionMonth: new Date(first.ProductionMonth),
        UpdatedBy: this.LoginUserName,
        Department: first.Department,
        Amount: first.Amount,
        TransCode: first.TransCode,
        PolicyFee: first.PolicyFee,
        SurpluxTax: first.SurpluxTax,
        AgencyDiscount: first.AgencyDiscount,
        AgencyFees: first.AgencyFees,
        PaymentMode: first.PaymentMode,
        State: first.State,
        StamingFee: first.StamingFee,
        Notes: first.Notes,
        CompanyFinanced: first.CompanyFinanced,
        Total: first.Total,
        OpeningBalance: first.OpeningBalance,
        Service: first.Service || '',
        Driverservice: first.DriverService || ''
      });

      // ================= VEHICLES =================
     
      // ================= DRIVERS =================
  // ================= DRIVERS =================
this.http.getAllDataId(ApiUrl.driverGetForService, this.Policy)
  .subscribe((drvRes: any) => {

    this.listOfDrviverSevices = drvRes?.Vehicles || [];

    console.log('DB DriverService:', first.DriverService);
    console.log('DB Service:', first.Service);

    // fallback to Service if DriverService is 0
    this.driverService = Number(
      first.DriverService || first.Service
    );

    this.fileID = this.driverService;

    this.selectedIndex =
      this.listOfDrviverSevices.findIndex(
        (x: any) =>
          Number(x.fileID) === this.driverService
      );

    this.addEditTransactionForm.patchValue({
      Driverservice: this.driverService
    });

    console.log('Selected Driver:', this.driverService);
    console.log('Selected Index:', this.selectedIndex);

    this.cd.detectChanges();
  });
      // ================= LOCAL VARIABLES =================
     
     

     

    });
}
 

 showSpinnerOnLoadEndroesement  = false
  getServiceId(data:any){

    // this.MarkedPolicyID  = data.MarkedPolicyID
    this.Policy = data.ChildPolicyID;
   
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

onRowSelect(data: any, idx: number) {

  this.selectedIndex = idx;

  this.fileID = data.fileID;
  this.driverService = data.fileID;

  this.addEditTransactionForm.patchValue({
    Driverservice: this.driverService
  });

  console.log(this.driverService);
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
    Driverservice: this.Service
  });

  console.log('Selected ID:', this.fileID);
  console.log('Service:', this.Service);
}



  getDriverIDData(data:any){
     this.fileID = data.fileID
     this.driverService = data.fileID;
     this.addEditTransactionForm.patchValue({
     Driverservice: this.driverService
  });

  }
  
changeTableRowColor(index: number) {
  this.selectedIndex = index;
}
 
  getAllEndrosementByMarkedPolicyById(){
    
    this.http.getAllDataId(ApiUrl.getAllVehcileDetailsByPolicyId,this.Policy).subscribe(
      data=>{
        this.showSpinnerOnLoadEndroesement = false
        let respone  = JSON.stringify(data)
        let obj = JSON.parse(respone)
        this.listOfSevices = obj.Vehicles || [];
        this.cd.detectChanges(); // 🔥 force update
        console.log("Vehicles Data:", this.listOfSevices);
      }
    )
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


//    getAllDriverForServieById() {

//   this.http.getAllDataId(ApiUrl.driverGetForService, this.Policy)
//     .subscribe(data => {

//       this.showSpinnerOnLoadEndroesement = false;

//       let response = JSON.stringify(data);
//       let obj = JSON.parse(response);

//       let policyRow = [];

//       // Add child_Policies as first row
//       if (obj.child_Policies) {
//         policyRow.push({
//           isPolicy: true,
//           VehicleDescription: obj.child_Policies.ChildPolicyName,
//           FileName: obj.child_Policies.StageType,
//           EndorsementID: '',
//           ChildPolicyID: obj.child_Policies.ChildPolicyID,
//           Effective: obj.child_Policies.Effective,
//           fileID: 'policyRow'
//         });
//       }

//       // Add vehicles below
//       this.listOfDrviverSevices = [
//         ...policyRow,
//         ...(obj.Vehicles || []).map((x: any) => ({
//           ...x,
//           isPolicy: false
//         }))
//       ];

//       this.cd.detectChanges();

//       console.log("Final Data:", this.listOfDrviverSevices);
//     });
// }
 


  setArDate(){
    this.GenerateInvoice
    let dte = new Date(this.GenerateInvoice)
    let newdate  = dte.setDate(dte.getDate() +7) 
    let arDate= new Date(newdate )
   
    this.ARDue = this.formatDate(arDate)
    
    
    
   
     
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

onStateChange(state: string) {

  const selected = this.stateData[state];

  if (selected) {
    this.addEditTransactionForm.patchValue({
      SurpluxTax: selected.taxRate,
      StamingFee: selected.stampingFee
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

  makeForm(){
   
    this.addEditTransactionForm = this.fb.group({
      TransactionID:['0'],
      MarkedPolicyID:[this.MarkedPolicyID],
      AccountID:[this.AccountID],
      InvoiceID:[''],
      GenerateInvoice:[''],
      AccountMonth:[this.AccountMonth],
      ARDue:[''],
      BillingEffective:[''],
      Department:['COMMERCIAL Line'],
      ProductionMonth:[this.ProductionMonth],
      EnteredBy:[this.LoginUserName],

      UpdatedBy:[''],
      Amount:[''],
      Policy:[''],
      Driverservice:[''],
      Service:[''],
      TransCode:[''],
      PaymentMode:[''],
      State:[''],
      StamingFee:[''],
      Notes:[''],
      PolicyFee:[''],
      SurpluxTax:[''],
      AgencyFees:[''],
      CompanyFinanced:[''],
      AgencyDiscount:[''],
      EffectiveDate:[''],
      Total:[''],
      OpeningBalance:[''],
    });
  }



  onSubmit() {
    this.submit = true ; 
    this.messageSuccess = false;
    if(!this.addEditTransactionForm.valid){
      this.messageSuccess = true
      
      return
    }
   

   let obj = JSON.parse(JSON.stringify(this.addEditTransactionForm.value))

   if(this.TransactionID){
    obj['TransactionID'] = this.TransactionID
  }

    this.http.addEditData(ApiUrl.addEditNewTransaction,obj).pipe().subscribe(
      data => {
        let response  = JSON.stringify(data)
        var obj = JSON.parse(response);
        this.dataResponse =obj.Data.Response;
        
       
        if(this.dataResponse == '0'){
          this.errorMessage = obj.Data.ErrorMessage
          this.error()
        
        }
        else{
          this.alertMessage = obj.Data.ErrorMessage
          this.showSuccess()
        }
     
        this.onNoClick1()
        console.log(obj)
        
      }
    
    )
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
