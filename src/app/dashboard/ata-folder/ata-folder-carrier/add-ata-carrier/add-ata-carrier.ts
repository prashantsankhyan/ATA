import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { finalize } from 'rxjs/operators';
import { MaterialModule } from '../../../../material.module';
import { ApiUrl } from '../../../../_core/apiUrl';
import { AllApiService } from '../../../../_service/all-api.service';

@Component({
  selector: 'app-add-ata-carrier',
   imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-ata-carrier.html',
  styleUrl: './add-ata-carrier.scss',
})
export class AddAtaCarrier {
submit = false;
  addEditCarrierForm!: FormGroup;
 isLoading = false;
  carrierId: any;
  LoginUserName: any;

  listCarrierName: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: AllApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddAtaCarrier> // ✅ FIXED
  ) {}

  ngOnInit(): void {
    
     this.LoginUserName = sessionStorage.getItem('UserName');
  this.carrierId = this.data?.ID;
  
   
  

    this.makeForm();

    if (this.carrierId) {
      this.updateCarrier();
    }
  }

  // ✅ FORM CREATE
  makeForm() {
    this.addEditCarrierForm = this.fb.group({
      id: ['0'],
    
      CarrierName: ['', Validators.required],
      PhoneNumber: [''],
      EmailID: [''],
      FaxNo: [''],
      NAIC: [''],
      Commission:[''],
      ContactNumber:[''],
      Address: [''],
      EnteredBy: [this.LoginUserName],
      
    });
  }

 

  // ✅ LOAD DATA FOR EDIT
  updateCarrier() {
    this.http.getAllDataId(ApiUrl.getCarrierById,this.carrierId)
      .subscribe({
        next: (res: any) => {

          const carrierList = res?.Carrier || [];

          if (carrierList.length === 0) {
            this.snackBar.open('No Carrier Data Found', 'Close', { duration: 3000 });
            return;
          }

          const carrier = carrierList[0];

          // ✅ PATCH FORM
          this.addEditCarrierForm.patchValue({
            id: this.carrierId,
            CarrierName: carrier.CarrierName,
            Commission:carrier.Commission,
            
          
            PhoneNumber: carrier.PhoneNumber,
            ContactNumber:carrier.ContactNumber,
            NAIC: carrier.NAIC,
            Address: carrier.Address,
            EmailID: carrier.EmailID,
            FaxNo: carrier.FaxNo
          });

       
        },
        error: () => {
          this.snackBar.open('Failed to load carrier data', 'Close', { duration: 3000 });
        }
      });
  }

  // ✅ SUBMIT FORM
onSubmit() {
  this.submit = true;

  if (this.addEditCarrierForm.invalid) return;

  let payload = { ...this.addEditCarrierForm.value };
this.isLoading = true; 
  // ✅ FORCE VALUE
  payload.EnteredBy = this.LoginUserName || 'Admin';

  if (this.carrierId) {
    payload.carrierId = this.carrierId;
  }

  console.log('FINAL PAYLOAD:', payload); // 🔍 debug

  this.http.addEditData(ApiUrl.addEditCarrier, payload)
    .subscribe((res: any) => {
      if (res?.Data?.Response == 1) {
        this.snackBar.open(res?.Data?.ErrorMessage, 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      }
    });
}

  // ✅ GET VALIDATION
  get f() {
    return this.addEditCarrierForm.controls;
  }

  // ✅ CLOSE DIALOG
  closeModel() {
    this.dialogRef.close(true);
  }
}

