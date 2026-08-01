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
      if (res?.Response === 1) {

        this.originalList = (res.ChildPolicys || []).filter(
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
 data = data.filter(x => x.StageType === 'Issue');

  // Search filter
  if (this.searchText.trim()) {
    const search = this.searchText.toLowerCase();

    data = data.filter(x =>
      (x.AccountName ?? '').toLowerCase().includes(search) ||
      (x.LookUpCode ?? '').toLowerCase().includes(search) ||
      (x.LineName ?? '').toLowerCase().includes(search) ||
      (x.CarrierName ?? '').toLowerCase().includes(search) ||
      (x.AgentName ?? '').toLowerCase().includes(search) ||
      (x.City ?? '').toLowerCase().includes(search) ||
      (x.ChildPolicyName ?? '').toLowerCase().includes(search)
    );
  }

  this.listOfPolcy = data;
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
    localStorage.setItem('StageType',data.StageType)
  }
 
  nextToAttachemnt(item:any){
  localStorage.setItem('AccountID', item.AccountID);
  localStorage.setItem('AccountName', item.AccountName);

  localStorage.setItem('LineName',item.LineName)
      this.router.navigate(['/dashboard/policy/policyAttachment']);
    
  }
  nextToFile(data:any){
   let ChildPolicyID= data.ChildPolicyID
    localStorage.setItem('LineShortName', data.LineShortName);
    this.router.navigate(['/dashboard/policy/file',ChildPolicyID])
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
  let ChildPolicyID = data.ChildPolicyID;

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
