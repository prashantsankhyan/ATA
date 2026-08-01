import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Spinner } from '../../spinner/spinner';
import { AllApiService } from '../../_service/all-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrl } from '../../_core/apiUrl';

@Component({
  selector: 'app-driver-billing',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule,Spinner],
  templateUrl: './driver-billing.html',
  styleUrl: './driver-billing.scss',
})
export class DriverBilling {
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
     localStorage.removeItem('AccountID');
      localStorage.removeItem('AccountName');
      this.getlistOfSale();
  }

  // ✅ GET DATA
 getlistOfSale() {


  this.http.getAllData(ApiUrl.getAllAccountDetail).subscribe({
    next: (res: any) => {

      if (res?.Response === 1) {
        this.showSpiner = false;
        this.listOfSale = res.Accounts || [];
        this.originalList = [...this.listOfSale];
      } else {
        this.listOfSale = [];
      }

      this.showSpiner = false;

      this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
    },
    error: () => {
      this.showSpiner = false;
      this.listOfSale = [];

      this.cdr.detectChanges(); // 🔥 IMPORTANT
    }
  });
}
  // ✅ SEARCH FILTER
  applyFilter() {
    const text = (this.searchText || '').toLowerCase();

    if (!text) {
      this.listOfSale = [...this.originalList];
      return;
    }

    this.listOfSale = this.originalList.filter(item =>
      item.AccountName?.toLowerCase().includes(text)
    );
  }


    fixDate(date: string): Date | null {
  if (!date) return null;

  // ✅ Fix wrong milliseconds (003 → 000)
  const cleanDate = date.replace(/:\d{3}$/, ':000');

  const d = new Date(cleanDate);
  return isNaN(d.getTime()) ? null : d;
}


nextToListOfBilling(data:any){
  let AccountID = data.AccountID
  let AccountName = data.AccountName
  localStorage.setItem('AccountID', AccountID);
    localStorage.setItem('AccountName', AccountName);
  this.router.navigate(['/dashboard/driverBilling/listOfDriverBilling']);
}
}
