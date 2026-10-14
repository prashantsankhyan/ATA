import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Router, RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiUrl } from '../../../_core/apiUrl';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-addedit-converage',
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './addedit-converage.html',
  styleUrl: './addedit-converage.scss',
})
export class AddeditConverage {

  submit = false;
  addEditCarrierForm!: FormGroup;
 isLoading = false;
  ID: any;
  LoginUserName: any;

  listCarrierName: any[] = [];
  listOfCarrier: any[] = [];
originalList: any[] = [];
showSpiner = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: AllApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddeditConverage> // ✅ FIXED
  ) {}

  ngOnInit(): void {
    
     this.LoginUserName = sessionStorage.getItem('UserName');
  this.ID = this.data?.id;
  
   
  

    this.makeForm();
    this.getListOfCarrier(); // <-- Add this

    if (this.ID) {
      this.updateCarrier();
    }
  }


  getListOfCarrier() {
 

  this.http.getAllData(ApiUrl.getAllCarrier).subscribe({
    next: (res: any) => {

      if (res && res.response === 1 && Array.isArray(res.carrier)) {
         this.showSpiner = false;
        this.listOfCarrier = res.carrier;
        this.originalList = [...res.carrier];
      } else {
        this.listOfCarrier = [];
        this.originalList = [];
      }

      this.showSpiner = false;
      this.cdr.detectChanges(); // force UI refresh
    },

    error: (err) => {
      console.error('API Error:', err);

      this.showSpiner = false;
      this.listOfCarrier = [];
      this.originalList = [];

      this.cdr.detectChanges();
    }
  });
}

  // ✅ FORM CREATE
  makeForm() {
    this.addEditCarrierForm = this.fb.group({
      id: ['0'],
    
      carrierID: ['', Validators.required],
      naic: [''],
      address: [''],
      commission: [''],
      
      
    });
  }

 

  // ✅ LOAD DATA FOR EDIT
  updateCarrier() {
    this.http.getAllDataId(ApiUrl.getSubCarrierById,this.ID)
      .subscribe({
        next: (res: any) => {

          const carrierList = res?.subCarrier || [];

          if (carrierList.length === 0) {
            this.snackBar.open('No Carrier Data Found', 'Close', { duration: 3000 });
            return;
          }

          const carrier = carrierList[0];

          // ✅ PATCH FORM
          this.addEditCarrierForm.patchValue({
            id: this.ID,
            carrierID: carrier.carrierID,
          
            commission:carrier.commission,
            
          
            phoneNumber: carrier.phoneNumber,
            contactNumber:carrier.contactNumber,
            naic: carrier.naic,
            address: carrier.address,
            emailID: carrier.emailID,
            faxNo: carrier.faxNo
          });

       
        },
        error: () => {
          this.snackBar.open('Failed to load carrier data', 'Close', { duration: 3000 });
        }
      });
  }


selectedMarket: any = null;

  // ✅ SUBMIT FORM
onSubmit() {
  this.submit = true;

  if (this.addEditCarrierForm.invalid) {
    return;
  }

  let payload = {
    ...this.addEditCarrierForm.value,
    enteredBy: this.LoginUserName || 'Admin'
  };

  

  this.http.addEditData(ApiUrl.subCarrier, payload)
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: (res: any) => {

        if (res?.response === 1) {

          this.snackBar.open(
            res.errorMessage,
            'Close',
            { duration: 3000 }
          );

          // close dialog and notify parent
          this.dialogRef.close(true);
        }
      },
      error: err => {
        console.error(err);
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
