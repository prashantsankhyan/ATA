import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiUrl } from '../../../_core/apiUrl';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-add-edit-submission',
  imports: [CommonModule,MaterialModule,RouterModule,FormsModule, ReactiveFormsModule,],
  templateUrl: './add-edit-submission.html',
  styleUrl: './add-edit-submission.scss',
})
export class AddEditSubmission {
   showSpiner = true;
  submit = false ;
  ChildPolicyID ='';
   isLoading = false;
  alertMessage =''
 addEditPolicyForm!: FormGroup;
listOfMarkedPolicyById:any[]=[];
  listOfSale: any[] = [];
  listOFLineName:any[]=[];
  filteredList: any[] = [];
  listOfCarrier:any[]=[];
  listOfSubCarrier:any[]=[];
  listOfBroker:any[]=[];
  selectedAccountId: any;
  searchText: string = '';
    Effective:any;
  Expiration:any;
setEffective = new Date(); 
selectedAccountName: string = '';
LoginUserName:any;

  searchCtrl = new FormControl<string>('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: AllApiService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddEditSubmission>
  ) {}

  ngOnInit(): void {
    this.LoginUserName = sessionStorage.getItem('UserName');
    
       this.makeForm();
     this.update(); 
    this.getlistOfSale();
    this.getLineName();
    this.getListOfBroker();
    this.getListOfCarrier();
    this.initSearch();
   
 
  }

  // ✅ SEARCH (ONLY ONE LOGIC)
  initSearch() {
    this.searchCtrl.valueChanges.subscribe(value => {
      const search = (value ?? '').toLowerCase().trim();

      this.filteredList = !search
        ? [...this.listOfSale]
        : this.listOfSale.filter(x =>
            x.AccountName?.toLowerCase().includes(search)
          );
    });
  }

  // ✅ API
getlistOfSale() {
  this.http.getAllData(ApiUrl.getAllAccountDetail).subscribe({
    next: (res: any) => {
      this.listOfSale = res?.Accounts || [];
      this.filteredList = [...this.listOfSale];
    },
    error: () => {
      this.listOfSale = [];
      this.filteredList = [];
    }
  });
}
applyFilter(value: string) {
  const search = (value ?? '').toLowerCase().trim();

  this.filteredList = this.listOfSale.filter(item =>
    item.AccountName?.toLowerCase().includes(search)
  );
}
onSelectAccount(event: any) {
  const selected = this.listOfSale.find(x => x.AccountID == event.value);

  this.selectedAccountId = selected?.AccountID;
 
  this.selectedAccountName = selected?.AccountName;
}



getLineName() {
  this.http.getAllData(ApiUrl.getAllLineName).subscribe({
    next: (res: any) => {
      this.listOFLineName = res?.LineNames || [];
    },
    error: () => {
      this.listOFLineName = [];
    }
  });
}

 getListOfBroker() {
  this.http.getAllData(ApiUrl.getAllBroker).subscribe({
    next: (res: any) => {

      if (res?.Response === 1) {
        this.listOfBroker = res.Brokers || [];
        
      } else {
        this.listOfBroker = [];
      }

    

      this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
    },
    error: () => {
     
      this.listOfBroker = [];

      this.cdr.detectChanges(); // 🔥 IMPORTANT
    }
  });
}

getListOfCarrier() {
 

  this.http.getAllData(ApiUrl.getAllCarrier).subscribe({
    next: (res: any) => {

      if (res && res.Response === 1 && Array.isArray(res.Carrier)) {
        this.listOfCarrier = res.Carrier;
      
      } else {
        this.listOfCarrier = [];
      
      }

     
      this.cdr.detectChanges(); // force UI refresh
    },

    error: (err) => {
      console.error('API Error:', err);

      
      this.listOfCarrier = [];
    

      this.cdr.detectChanges();
    }
  });
}
getListOfSuCarrierb(subCarrierId?: any) {

  const carrierId = this.addEditPolicyForm.get('CarrierSubmissionID')?.value;

  if (!carrierId) {
    this.listOfSubCarrier = [];
    return;
  }

  this.http.getAllDataId(ApiUrl.suCarrierByCarrier, carrierId)
    .subscribe({
      next: (res: any) => {

        this.listOfSubCarrier =
          res?.Response === 1 ? res.SubCarrier : [];

        // Select value after dropdown is loaded
        if (subCarrierId != null) {
          this.addEditPolicyForm.patchValue({
            SubCarrierID: subCarrierId
          });
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.listOfSubCarrier = [];
      }
    });
}






  

showMarketDropdown = false;

availableMarkets = [
  { name: 'Lloyds of London', NAIC: 15792 },
  { name: 'Fortegra Specialty Insurance Company', NAIC: 16823 },
  { name: 'American Safety Insurance Company', NAIC: 33103 },
  { name: 'Hartwell Insurance Company', NAIC: 17616 },
  { name: 'Dellwood Specialty Insurance Company', NAIC: 17332 },
  { name: 'Southlake Specialty Insurance Company', NAIC: 16999 },
  { name: 'Clear Blue Specialty Insurance Company', NAIC: 37745 },
  { name: 'Highlander Specialty Insurance Company', NAIC: 16777 },
  { name: 'Palomar Excess and Surplus Insurance Company', NAIC: 16823 }
];








update() {

  this.ChildPolicyID = this.data?.ChildPolicyID;

  if (!this.ChildPolicyID || this.ChildPolicyID == '0') {
    return;
  }

  this.http.getAllDataId(
    ApiUrl.getPolicyByChildPolcyId,
    this.ChildPolicyID
  ).subscribe({
    next: (res: any) => {

      const policy = res?.ChildPolicys?.[0];

      if (!policy) {
        return;
      }

      this.addEditPolicyForm.patchValue({
        ChildPolicyID: policy.ChildPolicyID,
        AccountID: policy.AccountID,
        EndorsementId: policy.EndorsementId,
        CarrierSubmissionID: policy.CarrierSubmissionID,
        SubPolicy: policy.SubPolicy,
        Type: policy.Type,
        LineID: policy.LineID,
        Description: policy.Description,
        ChildPolicyName: policy.ChildPolicyName,
        BrokerID: policy.BrokerID,
        IssuingCompany: policy.IssuingCompany,
        Policy_Status: policy.Policy_Status,
        BillType: policy.BillType,
        City: policy.City,
        IsDeleted: false,
        Effective: this.formatDate(policy.Effective),
        Expiration: this.formatDate(policy.Expiration)
      });

      this.selectedAccountId = policy.AccountID;
      this.selectedAccountName = policy.AccountName;

      console.log('SubCarrierID =', policy.SubCarrierID);

      // Load sub-carrier list and select current value
      this.getListOfSuCarrierb(policy.SubCarrierID);

    },
    error: (err) => {
      console.error('Update API error:', err);
    }
  });

}
 currentDate(){
    let dte = new Date(this.setEffective)
    var month = dte.getUTCMonth() + 1; //months from 1-12
     var day = dte.getUTCDate();
     var year = dte.getUTCFullYear() ;
    
     this.Effective  =month + "/" + day + "/" + year
  }
  changeNextDate(){
    this.Effective
    
    let dte = new Date(this.Effective)
     var month = dte.getUTCMonth() + 1; //months from 1-12
     var day = dte.getUTCDate();
     var year = dte.getUTCFullYear() +1;
     let newdate  =month + "/" + day + "/" + year
     this.Expiration = newdate 
  }
formatDate(date: Date): string {
  const d = new Date(date);

  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
}
onEffectiveChange() {
  const value = this.addEditPolicyForm.get('Effective')?.value;

  if (!value) return;

  const d = new Date(value);
  d.setFullYear(d.getFullYear() + 1);

  this.addEditPolicyForm.patchValue({
    Expiration: this.formatDate(d)
  });
}
  // ✅ FORM
  makeForm(){
  //    const today = new Date();

  // const effectiveDate = this.formatDate(today);

  // const expirationDate = this.formatDate(
  //   new Date(today.setFullYear(today.getFullYear() + 1))
  // );
    const today = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles'
    })
  );

  // Effective date
  const effectiveDate = this.formatDate(today);

  // Expiration date = 1 year later
  const expirationDateObj = new Date(today);
  expirationDateObj.setFullYear(expirationDateObj.getFullYear() + 1);

  const expirationDate = this.formatDate(expirationDateObj);
    this.addEditPolicyForm = this.fb.group({
      ChildPolicyID:['0'],
      EndorsementId:['0'],
      AccountID:[''],
      CarrierSubmissionID:[''],
      MarkedPolicyID:['',],
      PremiumPayableID:['4'],
      SelectPayableID:['4',],
      LineID:[''],
      ChildPolicyName:['',],
      Description:['',],
       Effective: [effectiveDate],
      Expiration: [expirationDate],
      IssuingCompany:[''],
      Source:['any'],
      SubmitType:['Pro'],
      Policy_Status:['New'],
      Type:[''],
      SubPolicy:[''],
      City:[''],
      BrokerID:[''],
      SubCarrierID:[''],

      BillType:['',],
      StageType:['In-Process',],
      EnteredBy:[this.LoginUserName],
      IsDeleted:[''],
      UpdatedBy:[''],
      
      
      
    });
  }
 onSubmit() {
  this.submit = true;

  if (!this.addEditPolicyForm.valid) {
    return;
  }

  let obj = this.addEditPolicyForm.getRawValue();

  if (this.ChildPolicyID) {
    obj['ChildPolicyID'] = this.ChildPolicyID; // UPDATE
  }
this.isLoading = true; 
  this.http.addEditData(ApiUrl.addEditPolicy, obj).subscribe({
    next: (data: any) => {

      const response = data?.Data;

      if (response?.Response == 1) {

        // ✅ SUCCESS MESSAGE
        this.alertMessage = response.ErrorMessage;

        // (optional) snackbar instead of alertMessage
        // this.snackBar.open(response.ErrorMessage, 'Close', { duration: 3000 });

        // ✅ CLOSE DIALOG AFTER SUCCESS
        this.dialogRef.close(true);
      }
      else {
        this.alertMessage = response?.ErrorMessage || 'Something went wrong';
      }

    },

    error: (err) => {
      console.error(err);
      this.alertMessage = 'Server error occurred';
    }
  });
}
  closeModel() {
    this.dialogRef.close(true);
  }
}
