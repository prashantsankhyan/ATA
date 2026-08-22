import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../../material.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../../_service/all-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrl } from '../../../../_core/apiUrl';

@Component({
  selector: 'app-change-status-endo',
   imports: [CommonModule,MatButtonModule,FormsModule,MaterialModule],
  templateUrl: './change-status-endo.html',
  styleUrl: './change-status-endo.scss',
})
export class ChangeStatusEndo {
  isSubmitting = false;
 currentValue: string | null = null;
  expiredValue: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: AllApiService,
    private cRouter: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangeStatusEndo>
  ) {}

  ngOnInit(): void {

    console.log('Received data:', this.data);

    // Set initial values from selected row
    this.currentValue = this.data?.Current || null;
    this.expiredValue = this.data?.Expired || null;

    console.log('FileID:', this.data?.FileID);
    console.log('Current:', this.currentValue);
    console.log('Expired:', this.expiredValue);
  }

  currentChanged(value: string | null): void {
  if (value === 'Current') {
    this.expiredValue = null;
  }
}

expiredChanged(value: string | null): void {
  if (value === 'Expired') {
    this.currentValue = null;
  }
}
  submit(): void {

    const obj = {
      FileID: this.data?.FileID,
      Current: this.currentValue,
      Expired: this.expiredValue
    };

    console.log('Sending:', obj);

    this.http.addEditDataUpdate(ApiUrl.updateEndo, obj).subscribe({
      next: (res) => {

        console.log('Success:', res);
     // Send true back to Endo component
      this.dialogRef.close(true);
      },

      error: (err) => {
        console.error('Error:', err);
          this.isSubmitting = false;
      }
    });
  }
}
