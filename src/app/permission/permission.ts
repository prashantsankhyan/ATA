import { ChangeDetectorRef, Component } from '@angular/core';
import { AddEditRegistration } from './add-edit-registration/add-edit-registration';
import { ApiUrl } from '../_core/apiUrl';
import { AllApiService } from '../_service/all-api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-permission',
  imports: [CommonModule,FormsModule,MaterialModule,],
  templateUrl: './permission.html',
  styleUrl: './permission.scss',
})
export class Permission {
showSpiner = true;

  listOfAllLoginDetail: any[] = [];
  filteredLoginList: any[] = [];

  LoginID = '';

  searchText = '';

  constructor(
    private http: AllApiService,
    private router: Router,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {

    this.http.listen().subscribe((m: any) => {
      console.log(m);
      this.getAllLoginList();
    });
  }

  ngOnInit(): void {
    this.getAllLoginList();
  }

getAllLoginList() {
  this.showSpiner = true;

  this.http.getAllData(ApiUrl.getALlLogin).subscribe({
    next: (res: any) => {

      this.showSpiner = false;

      console.log(res);

      if (res && res.LoginDetail) {

        this.listOfAllLoginDetail = res.LoginDetail;

        // important
        this.filteredLoginList = [...res.LoginDetail];

      } else {
        this.listOfAllLoginDetail = [];
        this.filteredLoginList = [];
      }

      this.cdr.detectChanges();
    },

    error: (err) => {
      console.log(err);
      this.showSpiner = false;
    }
  });
}

  searchLogin() {
    const search = this.searchText
      .trim()
      .toLowerCase();

    if (!search) {
      this.filteredLoginList = [
        ...this.listOfAllLoginDetail
      ];
      return;
    }

    this.filteredLoginList =
      this.listOfAllLoginDetail.filter((x: any) =>
        x.Team?.toLowerCase().includes(search) ||
        x.UserName?.toLowerCase().includes(search) ||
        x.EmailID?.toLowerCase().includes(search)
      );
  }

  addEditRegistrationDetail(data: any) {

    this.LoginID = data.LoginID;

    const dialogRef = this.dialog.open(
      AddEditRegistration,
      {
        width: '500px',
        height: '350px',
        data: {
          LoginID: this.LoginID,
          Team: data.Team,
          UserName: data.UserName,
          Password: data.Password,
          EmailID: data.EmailID
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.getAllLoginList();
    });
  }

}
