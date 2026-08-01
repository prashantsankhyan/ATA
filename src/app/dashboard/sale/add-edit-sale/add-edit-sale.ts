import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';
import { IAccount } from '../account.model';

@Component({
  selector: 'app-add-edit-sale',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-sale.html',
  styleUrl: './add-edit-sale.scss',
})
export class AddEditSale {

  accountForm!: FormGroup;
   isLoading = false;
  userName:any;
  submit = false;
  listOfAgent: any[] = [];
  listOfDataById:any[]=[];
  alertMessage = '';
  AccountID:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: AllApiService,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AddEditSale>
  ) {}

  // ================= INIT =================
  ngOnInit(): void {
     this.AccountID = this.data?.AccountID;
     this.userName = sessionStorage.getItem('UserName');
     
   
  

    this.createForm();

    if (this.AccountID) {
      this.getDataByAccountId();
    }
    this.createForm();
    this.getListOfAgent(); // 🔥 load first, then patch
  }



  // ================= FORM =================
  createForm() {
      // Get current USA date (New York timezone)
  const usaDate = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York'
    })
  );
     usaDate.setDate(usaDate.getDate() + 10);

    this.accountForm = this.fb.group({
      AccountID: [0],
      accountName: ['', Validators.required],
      mailingAddress: [''],
      emailID: [''],
      agentID: ['', Validators.required],
      radius: [''],
      MobileNumber:[''],
      yearInBusiness: [''],
      effectiveDate: [this.formatToDisplayDate(usaDate), Validators.required],
      enteredBy: [''],
      no_of_Unit: [''],
      no_of_driver: [''],
      policyType: [''],
      lastPremium: [''],
      garagingAddress: [''],
      zip: [''],
      DOT: [''],
      EnteredBy:[this.userName]
    });
  }

  // ================= AGENT LIST =================
  getListOfAgent() {
  this.api.getAllData(ApiUrl.getAllAgent).subscribe({
    next: (res: any) => {
      this.listOfAgent = res?.Response === 1 ? res.Agent || [] : [];

      // ✅ AFTER agents loaded → call API
      if (this.AccountID) {
        this.getDataByAccountId();
      }

      this.cdr.detectChanges();
    },
    error: () => {
      this.listOfAgent = [];
    }
  });
}

  // ================= PATCH FORM =================


  // ================= DATE FORMAT (DISPLAY) =================
  formatToDisplayDate(date: any): string {
    if (!date) return '';

    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const mm = ('0' + (d.getMonth() + 1)).slice(-2);
    const dd = ('0' + d.getDate()).slice(-2);
    const yyyy = d.getFullYear();

    return `${mm}-${dd}-${yyyy}`; // ✅ MM-DD-YYYY
  }

  // ================= DATE FORMAT (API) =================
  convertToApiDate(date: string): string {
    if (!date) return '';

    const [mm, dd, yyyy] = date.split('-');
    return `${yyyy}-${mm}-${dd}`; // ✅ yyyy-MM-dd
  }

  // ================= DOT AUTO =================
  loadDOTData() {
    const dot = this.accountForm.get('DOT')?.value;
    if (!dot) return;

    this.api.getAllDataId(ApiUrl.getDataByDot, dot)
      .subscribe(res => {
        const d = JSON.parse(res);

        this.accountForm.patchValue({
          accountName: d.LegalName || '',
          emailID: d.EmailAddress || '',
           mailingAddress: `${d.MailAddress || ''}, ${d.MailCity || ''}, ${d.MailState || ''}`,
          zip: d.MailZip || '',
          garagingAddress: d.PhyAddress || '',
          MobileNumber:d.Phone|| '',
        });
      });
  }


getDataByAccountId() {

  if (!this.AccountID || this.AccountID === 'undefined') {
    console.log('no data found');
    return;
  }

  this.api.getAllDataId(ApiUrl.getAllAccountById, this.AccountID)
    .subscribe({
      next: (res: any) => {

        if (res?.Response === 1 && res.Accounts?.length > 0) {

          const data = res.Accounts[0];

          this.listOfDataById = res.Accounts;

          // ✅ FIND AGENT BY NAME
          const selectedAgent = this.listOfAgent.find(
            (x: any) => x.AgentName?.trim() === data.AgentName?.trim()
          );

          // ✅ PATCH FORM
          this.accountForm.patchValue({
            AccountID: data.AccountID,
            DOT: data.DOT || '',
            accountName: data.AccountName || '',
            agentID: selectedAgent ? selectedAgent.AgentID.toString() : '',
            mailingAddress: data.MailingAddress || '',
            emailID: data.EmailID || '',
            MobileNumber:data.MobileNumber || '',
            zip: data.Zip || '',
            garagingAddress: data.GaragingAddress || '',
            radius: data.Radius || '',
            no_of_Unit: data.No_of_Unit || '',
            no_of_driver: data.No_of_Driver || '',
            policyType: data.PolicyType || '',
            lastPremium: data.LastPremium || '',
            yearInBusiness: data.YearInBusiness || '',
            effectiveDate: this.formatToDisplayDate(data.EffectiveDate),
          });

        } else {
          console.log('No account data found');
        }

      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
}

  // ================= SUBMIT =================
 onSubmit() {
  this.submit = true;

  if (this.accountForm.invalid) return;

  const formValue = this.accountForm.value;
 this.isLoading = true; 
  const payload: IAccount = {
    ...formValue,

    // ✅ FIX DATE
    effectiveDate: this.convertToApiDate(formValue.effectiveDate),

    // ✅ FIX AGENT TYPE
    agentID: formValue.agentID ? Number(formValue.agentID) : null
  };

  console.log('FINAL PAYLOAD:', payload); // 🔥 MUST CHECK

  this.api.addEditDataDetail(ApiUrl.addAccountdetail, payload)
    .subscribe((res: any) => {

      this.alertMessage = res?.Data?.ErrorMessage;

      if (res?.Data?.Response === 1) {
        this.dialogRef.close(true);
      }
    });
}

  // ================= CLOSE =================
  closeModel() {
    this.dialogRef.close(false);
  }

  get f() {
    return this.accountForm.controls;
  }
}