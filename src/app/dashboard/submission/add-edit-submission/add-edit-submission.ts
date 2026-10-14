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
            x.accountName?.toLowerCase().includes(search)
          );
    });
  }

  // ✅ API
getlistOfSale(): void {
  this.http.getAllData(ApiUrl.getAllAccountDetail).subscribe({
    next: (res: any) => {
      if (res?.response === 1 && Array.isArray(res.accounts)) {
        this.listOfSale = res.accounts;
        this.filteredList = [...this.listOfSale];

        const accountId = this.addEditPolicyForm.get('accountID')?.value;

        if (accountId != null) {
          this.addEditPolicyForm.get('accountID')?.setValue(
            Number(accountId)
          );
        }
      } else {
        this.listOfSale = [];
        this.filteredList = [];
      }
    },
    error: (err: any) => {
      console.error('Account list error:', err);
      this.listOfSale = [];
      this.filteredList = [];
    }
  });
}
applyFilter(value: string): void {

  const search = (value ?? '').toLowerCase().trim();

  if (!search) {
    this.filteredList = [...this.listOfSale];
    return;
  }

  this.filteredList = this.listOfSale.filter((item: any) =>

    (item.accountName ?? '')
      .toLowerCase()
      .includes(search)

  );
}
onSelectAccount(event: any) {
  const selected = this.listOfSale.find(x => x.accountID == event.value);

  this.selectedAccountId = selected?.accountID;
 
  this.selectedAccountName = selected?.accountName;
}



getLineName() {
  this.http.getAllData(ApiUrl.getAllLineName).subscribe({
    next: (res: any) => {
      this.listOFLineName = res?.lineNames || [];
    },
    error: () => {
      this.listOFLineName = [];
    }
  });
}

 getListOfBroker() {
  this.http.getAllData(ApiUrl.getAllBroker).subscribe({
    next: (res: any) => {

      if (res?.response === 1) {
        this.listOfBroker = res.brokers || [];
        
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


getListOfCarrier(): void {
  this.http.getAllData(ApiUrl.getAllCarrier).subscribe({
    next: (res: any) => {
      this.listOfCarrier =
        res?.response === 1 && Array.isArray(res.carrier)
          ? res.carrier
          : [];
    },
    error: (err: any) => {
      console.error('Carrier API Error:', err);
      this.listOfCarrier = [];
    }
  });
}

getListOfSuCarrierb(subCarrierId?: any): void {
  const id = this.addEditPolicyForm.get('carrierSubmissionID')?.value;

  console.log('CarrierSubmissionID:', id);

  if (!id) {
    this.listOfSubCarrier = [];
    this.addEditPolicyForm.patchValue({ subCarrierID: '' });
    return;
  }

  this.http.getAllDataId(ApiUrl.suCarrierByCarrier, id).subscribe({
    next: (res: any) => {
      this.listOfSubCarrier =
        res?.response === 1 && Array.isArray(res.subCarrier)
          ? res.subCarrier
          : [];

      if (subCarrierId != null) {
        this.addEditPolicyForm.patchValue({
          subCarrierID: Number(subCarrierId)
        });
      }
    },
    error: (err: any) => {
      console.error('Sub-carrier API Error:', err);
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









update(): void {

  this.ChildPolicyID = this.data?.childPolicyID;

  if (!this.ChildPolicyID || this.ChildPolicyID == '0') {
    return;
  }

  this.http.getAllDataId(
    ApiUrl.getPolicyByChildPolcyId,
    this.ChildPolicyID
  ).subscribe({
    next: (res: any) => {

      const policy = res?.childPolicys?.[0];

      if (res?.response !== 1 || !policy) {
        console.error('Policy data not found:', res);
        return;
      }

      this.addEditPolicyForm.patchValue({
        childPolicyID: policy.childPolicyID,
        accountID: policy.accountID,
        endorsementId: policy.endorsementId,
        carrierSubmissionID: policy.carrierSubmissionID,
        subPolicy: policy.subPolicy,
        type: policy.type,
        lineID: policy.lineID,
        description: policy.description,
        childPolicyName: policy.childPolicyName,
        brokerID: policy.brokerID,
        issuingCompany: policy.issuingCompany,
        policy_Status: policy.policy_Status,
        billType: policy.billType,
        city: policy.city,
        isDeleted: false,
        effective: this.formatDate(policy.effective),
        expiration: this.formatDate(policy.expiration)
      });

      this.selectedAccountId = policy.accountID;
      this.selectedAccountName = policy.accountName;

      console.log('SubCarrierID =', policy.subCarrierID);

      // Load sub-carrier list and select current value
      this.getListOfSuCarrierb(policy.subCarrierID);
    },

    error: (err: any) => {
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
formatDate(date: Date | string): string {
  if (!date) return '';

  // Already MM/dd/yyyy
  if (typeof date === 'string' &&
      /^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return date;
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
}
convertDateForApi(value: string): string | null {
  if (!value) return null;

  // MM/dd/yyyy -> yyyy-MM-dd
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (match) {
    const [, month, day, year] = match;

    const m = Number(month);
    const d = Number(day);
    const y = Number(year);

    const check = new Date(y, m - 1, d);

    if (
      check.getFullYear() !== y ||
      check.getMonth() !== m - 1 ||
      check.getDate() !== d
    ) {
      return null;
    }

    return `${year}-${month}-${day}`;
  }

  return null;
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
      childPolicyID:['0'],
      endorsementId:['0'],
      accountID:[''],
      carrierSubmissionID:['0'],
      markedPolicyID:['0',],
      premiumPayableID:['4'],
      selectPayableID:['4',],
      lineID:[''],
      childPolicyName:['',],
      description:['',],
       effective: [effectiveDate],
      expiration: [expirationDate],
      issuingCompany:[''],
      source:['any'],
      submitType:['Pro'],
      policy_Status:['New'],
      type:[''],
      subPolicy:[''],
      city:[''],
      brokerID:[''],
      subCarrierID:[''],

      billType:['',],
      stageType:['In-Process',],
      enteredBy:[this.LoginUserName],
      isDeleted:[''],
      updatedBy:[''],
      
      
      
    });
  }
onSubmit() {
  this.submit = true;

  if (this.addEditPolicyForm.invalid) {
    return;
  }

  const obj = this.addEditPolicyForm.getRawValue();

  // Convert dates: MM/dd/yyyy -> yyyy-MM-dd
  obj.effective = this.convertDateForApi(obj.effective);
  obj.expiration = this.convertDateForApi(obj.expiration);

  // Convert nullable IDs
  const nullableIds = [
    'brokerID',
    'subCarrierID',
    'accountID',
    'carrierSubmissionID',
    'lineID',
    'endorsementId',
    'childPolicyID'
  ];

  nullableIds.forEach(key => {
    const value = obj[key];

    obj[key] =
      value === '' || value === null || value === undefined
        ? null
        : Number(value);
  });

  // Convert Boolean field
  const deleted = obj.isDeleted;

  obj.isDeleted =
    deleted === true || deleted === 'true'
      ? true
      : deleted === false || deleted === 'false'
        ? false
        : null;

  // Convert numeric fields
  obj.markedPolicyID = Number(obj.markedPolicyID || 0);
  obj.premiumPayableID = Number(obj.premiumPayableID || 0);
  obj.selectPayableID = Number(obj.selectPayableID || 0);

  if (this.ChildPolicyID) {
    obj.childPolicyID = Number(this.ChildPolicyID);
  }

  // Check exact payload before sending
  console.log('Final API payload:', obj);
  console.log('isDeleted type:', typeof obj.isDeleted);

  this.isLoading = true;

  this.http.addEditData(ApiUrl.addEditPolicy, obj)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (data: any) => {
        const response = data?.Data ?? data?.data ?? data;
        const success = response?.Response ?? response?.response;
        const message =
          response?.ErrorMessage ??
          response?.errorMessage ??
          'Something went wrong';

        if (success == 1) {
          this.alertMessage = message;
          this.dialogRef.close(true);
        } else {
          this.alertMessage = message;
        }
      },
      error: (err: any) => {
        console.error('Update error:', err.error || err);
        this.alertMessage =
          err.error?.title || 'Server error occurred';
      }
    });
}

  closeModel() {
    this.dialogRef.close(true);
  }
}
