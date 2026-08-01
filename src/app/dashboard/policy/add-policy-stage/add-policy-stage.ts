import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-policy-stage',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-policy-stage.html',
  styleUrl: './add-policy-stage.scss',
})
export class AddPolicyStage {

  updateForm!: FormGroup;
  submit = false;
  ChildPolicyID: any;

  loading = false; // ✅ loader
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: AllApiService,
    private snackBar: MatSnackBar,
     private cdr: ChangeDetectorRef, 
    public dialogRef: MatDialogRef<AddPolicyStage>
  ) {}

  ngOnInit(): void {
    this.ChildPolicyID = this.data?.ChildPolicyID;
    this.makeForm();
  }

  // ✅ FORM INIT
  makeForm() {
    this.updateForm = this.fb.group({
      ChildPolicyID: [this.ChildPolicyID],
      StageType: ['', Validators.required],
      StageChangedBy: [''],
      UpdatedBy: ['']
    });
  }

  // ✅ SUBMIT
  onSubmit() {
    this.submit = true;

    if (this.updateForm.invalid) return;

    this.loading = true;

    const payload = {
      ...this.updateForm.value,
      ChildPolicyID: this.ChildPolicyID
    };

    this.http.addEditData(ApiUrl.updateStage, payload).subscribe({
     next: (res: any) => {
  const response = res?.Data;

  if (response?.Response == 1) {
    this.snackBar.open('Stage changed successfully ✅', 'Close', {
      duration: 1000
    });

    this.dialogRef.close(true);
  } else {
    this.snackBar.open(response?.ErrorMessage || 'Something went wrong', 'Close', {
      duration: 1000
    });
  }

  this.loading = false;

  this.cdr.detectChanges(); // ✅ FIX ERROR HERE
},

      error: () => {
        this.loading = false;

        this.snackBar.open('Server error occurred', 'Close', {
          duration: 3000
        });
      }
    });
  }

  get f() {
  return this.updateForm.controls;
}

  // ❌ CANCEL / CLOSE
  closeModel(): void {
    this.dialogRef.close(false);
  }
}