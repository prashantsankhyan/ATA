import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiUrl } from '../../../_core/apiUrl';
@Component({
  selector: 'app-delete-entry-by-transaction-id',
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule,FormsModule ],
  templateUrl: './delete-entry-by-transaction-id.html',
  styleUrl: './delete-entry-by-transaction-id.scss',
})
export class DeleteEntryByTransactionId {

  trasnactionId:any
  LoginUserName:any;

  constructor( @Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,private http:AllApiService ,private router:Router,
   public dialog: MatDialog,
   private cd: ChangeDetectorRef,
  public dialogRef: MatDialogRef<DeleteEntryByTransactionId>,) {
  
   }

     ngOnInit(): void {

      this.trasnactionId = this.data.TransactionID;
      this.LoginUserName = sessionStorage.getItem('UserName');
    
   
  }
getAllPolicyListByAccontId() {
  this.http.deleteByTwo(
    ApiUrl.billindDelete,
    this.trasnactionId,
    this.LoginUserName
  ).subscribe({
    next: (res) => {
      // Close dialog and tell parent to refresh
      this.dialogRef.close(true);
    },
    error: (err) => {
      console.error(err);
    }
  });
}

closeDialog() {
  this.dialogRef.close();
}
}
