import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { Spinner } from '../../../spinner/spinner';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';
import { AddAtaCarrier } from './add-ata-carrier/add-ata-carrier';

@Component({
  selector: 'app-ata-folder-carrier',
   imports: [CommonModule,MaterialModule,ReactiveFormsModule,FormsModule,Spinner],
  templateUrl: './ata-folder-carrier.html',
  styleUrl: './ata-folder-carrier.scss',
})
export class AtaFolderCarrier {
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
    this.getListOfCarrier();
    
  }



  goTOcarrierAttachemnt(data:any){
     localStorage.setItem('carrierID', data.ID);
     localStorage.setItem('CarrierName', data.CarrierName);
   
     this.router.navigate(['/dashboard/ataFolder/ataCarrier/ataCarrierAttachment']);
  }

  // ✅ GET DATA
getListOfCarrier() {
 

  this.http.getAllData(ApiUrl.getAllCarrier).subscribe({
    next: (res: any) => {

      if (res && res.Response === 1 && Array.isArray(res.Carrier)) {
         this.showSpiner = false;
        this.listOfCarrier = res.Carrier;
        this.originalList = [...res.Carrier];
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
      item.CarrierName?.toLowerCase().includes(text)
    );
  }

  // ✅ OPEN DIALOG

  addEditData(data?: any) {
  const dialogRef = this.dialog.open(AddAtaCarrier, {
   
   
  
      // only limit, not fixed height
    data: data || null
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this.getListOfCarrier();
  }
    });
}
}
