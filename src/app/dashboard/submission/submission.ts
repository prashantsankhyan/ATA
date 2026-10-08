import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { MaterialModule } from '../../material.module';
import { ApiUrl } from '../../_core/apiUrl';
import { AllApiService } from '../../_service/all-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Spinner } from '../../spinner/spinner';
import { AddEditSubmission } from './add-edit-submission/add-edit-submission';
import { ConfirmSubmissionToPolicy } from './confirm-submission-to-policy/confirm-submission-to-policy';
import { DeleteSubmission } from './delete-submission/delete-submission';

@Component({
  selector: 'app-submission',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule,Spinner],
  templateUrl: './submission.html',
  styleUrl: './submission.scss',
})
export class Submission {
showSpiner = true;
  listOfPolcy: any[] = [];
  originalList: any[] = []; // 🔥 for search
  searchText: string = '';

  constructor(
    private http: AllApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    
    localStorage.removeItem('brokerName');
    localStorage.removeItem('AccountName');
    localStorage.removeItem('ChildPolicyID');
    localStorage.removeItem('EndorsementId');
    localStorage.removeItem('AccountID');
    localStorage.removeItem('LookUpCode');
     localStorage.removeItem('LineShortName');
     localStorage.removeItem('StageType');
     localStorage.removeItem('LineName');
     
     
this.getListOfPolicy();
    

  }



  // ✅ GET DATA
// getListOfPolicy() {
 

//   this.http.getAllData(ApiUrl.getAllPolicyRecords).subscribe({
//     next: (res: any) => {

//       if (res?.Response === 1) {
//          this.showSpiner = false;
//         this.listOfPolcy = res.ChildPolicys || [];   // ✅ FIXED
//         this.originalList = [...this.listOfPolcy];
//       } else {
//         this.listOfPolcy = [];
//         this.originalList = [];
//       }

//       this.showSpiner = false;
//       this.cdr.detectChanges();
//     },

//     error: () => {
//       this.showSpiner = false;
//       this.listOfPolcy = [];
//       this.originalList = [];
//       this.cdr.detectChanges();
//     }
//   });
// }


getListOfPolicy() {
  this.http.getAllData(ApiUrl.getAllPolicyRecords).subscribe({
    next: (res: any) => {
      if (res?.Response === 1) {
        this.showSpiner = false;

        this.listOfPolcy = (res.ChildPolicys || []).filter(
          (item: any) => !item.IsDeleted
        );

        this.originalList = [...this.listOfPolcy];
      } else {
        this.listOfPolcy = [];
        this.originalList = [];
      }

      this.showSpiner = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.showSpiner = false;
      this.listOfPolcy = [];
      this.originalList = [];
      this.cdr.detectChanges();
    }
  });
}




  // ✅ SEARCH FILTER
  applyFilter() {
    const text = (this.searchText || '').toLowerCase();

    if (!text) {
      this.listOfPolcy = [...this.originalList];
      return;
    }

    this.listOfPolcy = this.originalList.filter(item =>
  item.AccountName?.toLowerCase().includes(text) ||
  item.BrokerName?.toLowerCase().includes(text) ||
  item.AccountID?.toString().includes(text)

    );
  }



 
  nextToDetails(data:any){
  this.router.navigate(['/detail']);
   localStorage.setItem('ChildPolicyID', data.ChildPolicyID);
   localStorage.setItem('EndorsementId', '0');
    localStorage.setItem('AccountName', data.AccountName);
    localStorage.setItem('LookUpCode',data.LookUpCode)
     localStorage.setItem('StageType',data.StageType)
  }


  nextToEndrosement(data:any){
 this.router.navigate(['/detail']);
   localStorage.setItem('ChildPolicyID', data.ChildPolicyID);
   localStorage.setItem('EndorsementId', '1');
    localStorage.setItem('AccountName', data.AccountName);
    localStorage.setItem('LookUpCode',data.LookUpCode)
  }
 
  nextToAttachemnt(item:any){
  localStorage.setItem('AccountID', item.AccountID);
  localStorage.setItem('AccountName', item.AccountName);
  localStorage.setItem('LineName',item.LineName)
  this.router.navigate(['/dashboard/submission/attachment']);  
  }

  nextToFile(data:any){
   let ChildPolicyID= data.ChildPolicyID
    localStorage.setItem('LineShortName', data.LineShortName);
    this.router.navigate(['/dashboard/submission/fileSubmission',ChildPolicyID])
  }

  nextToAdmited(data:any){
    
       let ChildPolicyID= data.ChildPolicyID
    localStorage.setItem('LineShortName', data.LineShortName);
    this.router.navigate(['/dashboard/submission/admited',ChildPolicyID])
  }


   extandPolicy(data:any){
   let AccountID= data.AccountID
   
    this.router.navigate(['/dashboard/policy/extance',AccountID])
  }


    monthlyPolicy(data:any){
   
  
   let ChildPolicyID= data.ChildPolicyID
    this.router.navigate(['/dashboard/policy/monthy',ChildPolicyID])
  }
  addEditData(data?: any) {
  const dialogRef = this.dialog.open(AddEditSubmission, {
     width: '95vw',
  
   maxHeight: '100vh',  
     
    data: data || null
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this.getListOfPolicy();
  }
    });
}
updateStage(data: any) {
  let ChildPolicyID = data.ChildPolicyID;

  const dialogRef = this.dialog.open(ConfirmSubmissionToPolicy, {
    width: '400px',
    
    data: { ChildPolicyID: ChildPolicyID }
  });

  // ✅ LISTEN WHEN DIALOG CLOSES
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // ✅ REFRESH YOUR DATA HERE
      this.getListOfPolicy();  // 🔁 your API method
    }
  });
}
deleteData(row: any) {
  const dialogRef = this.dialog.open(DeleteSubmission, {
    width: '360px',
    disableClose: true,
    data:row.id
  });
}
}
