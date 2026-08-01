import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiUrl } from '../../_core/apiUrl';
import { AllApiService } from '../../_service/all-api.service';
import { Spinner } from '../../spinner/spinner';
import { AddeditConverage } from './addedit-converage/addedit-converage';
@Component({
  selector: 'app-coverages-offered',
   imports: [CommonModule,MaterialModule,ReactiveFormsModule,FormsModule,Spinner],
  templateUrl: './coverages-offered.html',
  styleUrl: './coverages-offered.scss',
})
export class CoveragesOffered {

  showSpiner = true;
  listOfCarrier: any[] = [];
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
    localStorage.clear();
    this.getListOfDara();
    
  }



  // ✅ GET DATA
getListOfDara() {
 

  this.http.getAllData(ApiUrl.getAllSubCarrier).subscribe({
    next: (res: any) => {

    if (res && res.Response === 1 && Array.isArray(res.SubCarrier)) {
  this.showSpiner = false;
  this.listOfCarrier = res.SubCarrier;
  this.originalList = [...res.SubCarrier];
} else {
  this.listOfCarrier = [];
  this.originalList = [];
}

      this.showSpiner = false;
      this.cdr.detectChanges(); // force UI refresh
    },

    error: (err) => {
      console.error('API Error:', err);

      this.showSpiner = false;
      this.listOfCarrier = [];
      this.originalList = [];

      this.cdr.detectChanges();
    }
  });
}
  // ✅ SEARCH FILTER
  applyFilter() {
    const text = (this.searchText || '').toLowerCase();

    if (!text) {
      this.listOfCarrier = [...this.originalList];
      return;
    }

    this.listOfCarrier = this.originalList.filter(item =>
      item.Address?.toLowerCase().includes(text)
    );
  }

  // ✅ OPEN DIALOG

  addEditData(data?: any) {
  const dialogRef = this.dialog.open(AddeditConverage, {
   
   
  
      // only limit, not fixed height
    data: data || null
  });

  dialogRef.afterClosed().subscribe(result => {

    console.log('Dialog closed:', result);

    if (result === true) {
      this.getListOfDara();
    }
  });
}
}
