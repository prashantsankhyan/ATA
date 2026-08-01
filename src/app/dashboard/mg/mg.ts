import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditMg } from './add-edit-mg/add-edit-mg';
import { AllApiService } from '../../_service/all-api.service';
import { ApiUrl } from '../../_core/apiUrl';

@Component({
  selector: 'app-mg',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mg.html',
  styleUrl: './mg.scss',
})
export class Mg implements OnInit {

  showSpiner = true;
  listOfBroker: any[] = [];
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
    this.getListOfBroker();
    localStorage.removeItem('brokerName');
  }

  // ✅ GET DATA
 getListOfBroker() {
  this.showSpiner = true;

  this.http.getAllData(ApiUrl.getAllBroker).subscribe({
    next: (res: any) => {

      if (res?.Response === 1) {
        this.listOfBroker = res.Brokers || [];
        this.originalList = [...this.listOfBroker];
      } else {
        this.listOfBroker = [];
      }

      this.showSpiner = false;

      this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
    },
    error: () => {
      this.showSpiner = false;
      this.listOfBroker = [];

      this.cdr.detectChanges(); // 🔥 IMPORTANT
    }
  });
}

  // ✅ SEARCH FILTER
  applyFilter() {
    const text = (this.searchText || '').toLowerCase();

    if (!text) {
      this.listOfBroker = [...this.originalList];
      return;
    }

    this.listOfBroker = this.originalList.filter(item =>
      item.AccountName?.toLowerCase().includes(text)
    );
  }

  // ✅ OPEN DIALOG
  addEditData(data?: any) {
    const dialogRef = this.dialog.open(AddEditMg, {
      width: '600px',
      maxHeight: '90vh',
      data: data || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this.getListOfBroker();
  }
    });
  }
}