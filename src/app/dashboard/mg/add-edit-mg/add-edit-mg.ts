import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-add-edit-mg',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-mg.html',
  styleUrl: './add-edit-mg.scss',
})
export class AddEditMg implements OnInit {

  
  submit = false;
  alertMessage = '';
  messageSuccess = true;

  addEditBrokerForm!: FormGroup;

  BrokerID: any;
  LoginUserName: any;
  listOfBrokerName: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: AllApiService,
    private router: Router,
    private snackBar: MatSnackBar,   // ✅ ADD THIS
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddEditMg>
  ) {}

  ngOnInit(): void {
    this.LoginUserName = sessionStorage.getItem('UserName');
    this.BrokerID = this.data?.BrokerID;

    this.makeForm();

    if (this.BrokerID) {
      this.updateCarrier();
    }
  }

  // ✅ Create Form
  makeForm() {
    this.addEditBrokerForm = this.fb.group({
      BrokerID: ['0'],
      AccountName: ['', Validators.required],
      LookUpCode: [''],
      Address1: [''],
      Address2: [''],
      City: [''],
      StateCode: [''],
      ZipCode: [''],
      RegionProvince: [''],
      PrimaryNumber: [''],
      PrimaryEmailAddress: [''],
      WebsiteAddress: [''],
      WebsiteDescription: [''],
    });
  }

  // ✅ Load Data for Edit
  updateCarrier() {
    

    this.http.getAllDataId(ApiUrl.getBrokerById, this.BrokerID).subscribe({
      next: (data: any) => {
       

        const brokers = data?.Brokers || [];

        if (brokers.length > 0) {
          const broker = brokers[0];

          this.addEditBrokerForm.patchValue({
            BrokerID: broker.BrokerID,
            AccountName: broker.AccountName,
            LookUpCode: broker.LookUpCode,
            Address1: broker.Address1,
            Address2: broker.Address2,
            City: broker.City,
            StateCode: broker.StateCode,
            ZipCode: broker.ZipCode,
            PrimaryNumber: broker.PrimaryNumber,
            PrimaryEmailAddress: broker.PrimaryEmailAddress,
            WebsiteAddress: broker.WebsiteAddress,
            WebsiteDescription: broker.WebsiteDescription
          });
        }
      },
      error: () => {
       
      }
    });
  }

  // ✅ Submit Form
  onSubmit() {
  this.submit = true;

  if (this.addEditBrokerForm.invalid) {
    return;
  }

  const payload = { ...this.addEditBrokerForm.value };

  if (this.BrokerID) {
    payload.BrokerID = this.BrokerID;
  }



this.http.addEditData(ApiUrl.addEditBroker, payload)
  .pipe(
    finalize(() => {
      
    })
  )
  .subscribe({
    next: (res: any) => {

      const isSuccess = res?.Data?.Response == 1;

      const message = res?.Data?.ErrorMessage 
        || (this.BrokerID ? 'Updated Successfully' : 'Added Successfully');

      this.snackBar.open(message, 'Close', { duration: 3000 });

      if (isSuccess) {
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 800);
      }
    },
    error: () => {
      this.snackBar.open('Failed to save data', 'Close', { duration: 3000 });
    }
  });
}

  // ✅ Success Handler
  showSuccess() {
    this.changeLocation();
    this.closeModel();
  }

  // ✅ Refresh Page
  changeLocation() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  // ✅ Getter for Validation
  get f() {
    return this.addEditBrokerForm.controls;
  }

  // ✅ Close Dialog
  closeModel() {
    this.dialogRef.close(true);
  }
}