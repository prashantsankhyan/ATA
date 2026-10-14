import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AddEditPolicy } from './add-edit-policy/add-edit-policy';
import { DeletePoliccy } from './delete-policcy/delete-policcy';
import { MaterialModule } from '../../material.module';
import { ApiUrl } from '../../_core/apiUrl';
import { AllApiService } from '../../_service/all-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPolicyStage } from './add-policy-stage/add-policy-stage';
import { Spinner } from '../../spinner/spinner';

@Component({
  selector: 'app-policy',
   imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule,Spinner],
  templateUrl: './policy.html',
  styleUrl: './policy.scss',
})
export class Policy {
 showSpiner = true;
  listOfPolcy: any[] = [];
  originalList: any[] = []; // 🔥 for search
  searchText: string = '';
  selectedTab = 'quote'; // Default selected

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
    localStorage.removeItem('LineName');
    localStorage.removeItem('StageType');
   this.getListOfPolicy();
  }
changeTab(tab: string): void {
  this.selectedTab = tab;
  this.applyFilters();
}



onSearch(value: string): void {
  this.searchText = value;
  this.applyFilters();
}

getListOfPolicy() {
  this.http.getAllData(ApiUrl.getAllPolicyRecords).subscribe({
    next: (res: any) => {
      if (res?.response === 1) {

        this.originalList = (res.childPolicys || []).filter(
          (item: any) => !item.IsDeleted
        );

        // Apply current tab filter
        this.changeTab(this.selectedTab);

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
applyFilters(): void {
  let data = [...this.originalList];

  // Tab filter
 data = data.filter(x => x.stageType === 'Issue');

  // Search filter
  if (this.searchText.trim()) {
    const search = this.searchText.toLowerCase();

    data = data.filter(x =>
      (x.accountName ?? '').toLowerCase().includes(search) ||
      (x.lookUpCode ?? '').toLowerCase().includes(search) ||
      (x.lineName ?? '').toLowerCase().includes(search) ||
      (x.carrierName ?? '').toLowerCase().includes(search) ||
      (x.agentName ?? '').toLowerCase().includes(search) ||
      (x.city ?? '').toLowerCase().includes(search) ||
      (x.childPolicyName ?? '').toLowerCase().includes(search)
    );
  }

  this.listOfPolcy = data;
}


 
  nextToDetails(data:any){
  this.router.navigate(['/detail']);
  localStorage.setItem('ChildPolicyID', data.childPolicyID);
  localStorage.setItem('EndorsementId', '0');
  localStorage.setItem('AccountName', data.accountName);
  localStorage.setItem('LookUpCode',data.lookUpCode)
  localStorage.setItem('StageType',data.stageType)
  }


  nextToEndrosement(data:any){
  
 this.router.navigate(['/detail']);
   localStorage.setItem('ChildPolicyID', data.childPolicyID);
   localStorage.setItem('EndorsementId', '1');
    localStorage.setItem('AccountName', data.accountName);
    localStorage.setItem('LookUpCode',data.lookUpCode)
    localStorage.setItem('StageType',data.stageType)
  }
 
  nextToAttachemnt(item:any){
  localStorage.setItem('AccountID', item.accountID);
  localStorage.setItem('AccountName', item.accountName);

  localStorage.setItem('LineName',item.lineName)
      this.router.navigate(['/dashboard/policy/policyAttachment']);
    
  }
  nextToFile(data:any){
   let ChildPolicyID= data.childPolicyID
    localStorage.setItem('LineShortName', data.lineShortName);
    this.router.navigate(['/dashboard/policy/file',ChildPolicyID])
  }


   extandPolicy(data:any){
   let AccountID= data.accountID
   
    this.router.navigate(['/dashboard/policy/extance',AccountID])
  }


    monthlyPolicy(data:any){
   
  
   let ChildPolicyID= data.childPolicyID
    this.router.navigate(['/dashboard/policy/monthy',ChildPolicyID])
  }
  addEditData(data?: any) {
  const dialogRef = this.dialog.open(AddEditPolicy, {
     width: '95vw',
  
   maxHeight: '100vh',  
      // only limit, not fixed height
    data: data || null
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this.getListOfPolicy();
  }
    });
}
updateStage(data: any) {
  let ChildPolicyID = data.childPolicyID;

  const dialogRef = this.dialog.open(AddPolicyStage, {
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
  const dialogRef = this.dialog.open(DeletePoliccy, {
    width: '360px',
    disableClose: true,
    data:row.id
  });
}
}
