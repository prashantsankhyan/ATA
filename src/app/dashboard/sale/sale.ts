import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditSale } from './add-edit-sale/add-edit-sale';
import { DeleteSale } from './delete-sale/delete-sale';
import { AllApiService } from '../../_service/all-api.service';
import { ApiUrl } from '../../_core/apiUrl';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Spinner } from '../../spinner/spinner';

@Component({
  selector: 'app-sale',
  imports: [CommonModule,FormsModule,MaterialModule,Spinner],
  templateUrl: './sale.html',
  styleUrl: './sale.scss',
})
export class Sale {
 showSpiner = true;
  listOfSale: any[] = [];
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
    //  localStorage.removeItem('AccountID');
    //   localStorage.removeItem('AccountName');
    //     localStorage.removeItem('brokerName');
    //     localStorage.removeItem('AgentName');
    

    this.searchText = localStorage.getItem('AccountName') || '';

  console.log('AccountName:', this.searchText);

  this.getlistOfSale();

  
  }

  // ✅ GET DATA
//  getlistOfSale() {
 

//   this.http.getAllData(ApiUrl.getAllAccountDetail).subscribe({
//     next: (res: any) => {

//       if (res?.Response === 1) {
//          this.showSpiner = false;
//         this.listOfSale = res.Accounts || [];
//         this.originalList = [...this.listOfSale];
//       } else {
//         this.listOfSale = [];
//       }

//       this.showSpiner = false;

//       this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
//     },
//     error: () => {
//       this.showSpiner = false;
//       this.listOfSale = [];

//       this.cdr.detectChanges(); // 🔥 IMPORTANT
//     }
//   });
// }


getlistOfSale(): void {
  

  this.http.getAllData(ApiUrl.getAllAccountDetail).subscribe({
    next: (res: any) => {
      console.log('Account API Response:', res);

      if (res?.response === 1) {
        this.listOfSale = Array.isArray(res.accounts)
          ? res.accounts
          : [];

        this.originalList = [...this.listOfSale];

        // Apply search if AccountName was passed
        if (this.searchText) {
          this.applyFilter();
        }

        localStorage.removeItem('AccountID');
        localStorage.removeItem('AccountName');
        localStorage.removeItem('brokerName');
        localStorage.removeItem('AgentName');
      } else {
        this.listOfSale = [];
        this.originalList = [];
      }

      this.showSpiner = false;
      this.cdr.detectChanges();
    },
    error: (err: any) => {
      console.error('Account API Error:', err);

      this.showSpiner = false;
      this.listOfSale = [];
      this.originalList = [];

      this.cdr.detectChanges();
    }
  });
}



  // ✅ SEARCH FILTER

applyFilter(): void {
  const text = (this.searchText || '').trim().toLowerCase();

  if (!text) {
    this.listOfSale = [...this.originalList];
    return;
  }

  this.listOfSale = this.originalList.filter((item: any) => {
    const dotValue = String(item.dot ?? '').trim().toLowerCase() || 'individual';

    return (
      String(item.accountName ?? '').toLowerCase().includes(text) ||
      dotValue.includes(text) ||
      String(item.agentName ?? '').toLowerCase().includes(text) ||
      String(item.mobileNumber ?? '').toLowerCase().includes(text) ||
      String(item.emailID ?? '').toLowerCase().includes(text) ||
      String(item.enteredBy ?? '').toLowerCase().includes(text)
    );
  });
}



  fixDate(date: string): Date | null {
  if (!date) return null;

  // ✅ Fix wrong milliseconds (003 → 000)
  const cleanDate = date.replace(/:\d{3}$/, ':000');

  const d = new Date(cleanDate);
  return isNaN(d.getTime()) ? null : d;
}

  // ✅ OPEN DIALOG
  
  // getAllAccountDetail

  goToAttachment(item: any) {

  // ✅ Store AccountID in localStorage
  localStorage.setItem('AccountID', item.accountID);
  localStorage.setItem('AccountName', item.accountName);

  // ✅ Navigate to route
  this.router.navigate(['/dashboard/sale/attahment']);
}

  addEditData(data?: any) {
  const dialogRef = this.dialog.open(AddEditSale, {
   
  
   maxHeight: '100vh',   // only limit, not fixed height
    data: data || null
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this.getlistOfSale();
  }
    });
}


goToBor(item: any){
   localStorage.setItem('AccountID', item.accountID);
  localStorage.setItem('AccountName', item.accountName);
  localStorage.setItem('AgentName', item.agentName);
  
  this.router.navigate(['/dashboard/sale/bor']);
}

deleteData(row: any) {
  const dialogRef = this.dialog.open(DeleteSale, {
    width: '360px',
    disableClose: true,
    data:row.id
  });
}
}
