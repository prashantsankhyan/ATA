import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { AllApiService } from '../../../_service/all-api.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiUrl } from '../../../_core/apiUrl';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-confirm-bor',
 imports: [CommonModule,MatButtonModule,FormsModule,MaterialModule ,HttpClientModule ],
  templateUrl: './confirm-bor.html',
  styleUrl: './confirm-bor.scss',
})
export class ConfirmBor {
showSpiner = true
  listOfAllFatchData: any[] = [];
allFiles: any[] = [];
  accountId:any;
 
  MarkedPolicyId:any;
  ChildPolicyID:any;
  IsChildPolicyExist:any
  EndorsementID:any;
  searchTerm: string = '';
  teamName:any;
  agentId:any;

AccountName:any;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
  private http: AllApiService,
  private router: Router,
  private dialogRef: MatDialogRef<ConfirmBor>,
  private snackBar: MatSnackBar,
  private cdr: ChangeDetectorRef

  ) { 
   
   }
  
ngOnInit(): void {

  
  this.accountId = this.data.accountId;
  this.agentId = this.data.agentId;
  this.AccountName = localStorage.getItem('AccountName');
  
}


confirn() {
  this.showSpiner = true;

  this.http.postByTwoId(ApiUrl.getConfirmBor, this.accountId, this.agentId)
    .subscribe({
      next: (res: any) => {
        this.showSpiner = false;

        if (res?.Data?.Response === 1) {

          // Show success message
          this.snackBar.open(res.Data.ErrorMessage, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        
          // Close dialog and notify parent
         this.dialogRef.close(true);
           this.router.navigate(['/dashboard/sale'], {
  queryParams: {
    accountName: this.AccountName
  }
});

 
        } else {

          this.snackBar.open(
            res?.Data?.ErrorMessage || 'Something went wrong.',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.showSpiner = false;

        this.snackBar.open(
          'Unable to confirm record.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );
      }
    });
}
  




 
  







}
