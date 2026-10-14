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

      if (res && res.loginDetail) {

        this.listOfAllLoginDetail = res.loginDetail;

        // important
        this.filteredLoginList = [...res.loginDetail];

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
        x.team?.toLowerCase().includes(search) ||
        x.userName?.toLowerCase().includes(search) ||
        x.emailID?.toLowerCase().includes(search)
      );
  }

  addEditRegistrationDetail(data: any) {

    this.LoginID = data.loginID;

    const dialogRef = this.dialog.open(
      AddEditRegistration,
      {
        width: '500px',
        height: '350px',
        data: {
          LoginID: this.LoginID,
          Team: data.team,
          UserName: data.userName,
          Password: data.password,
          EmailID: data.emailID
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.getAllLoginList();
    });
  }

}
