import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditDriver } from './add-edit-driver/add-edit-driver';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiUrl } from '../../_core/apiUrl';
import { AllApiService } from '../../_service/all-api.service';
import { DeleteDriver } from './delete-driver/delete-driver';
import { Spinner } from '../../spinner/spinner';

@Component({
  selector: 'app-driver',
    imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MaterialModule,
    HttpClientModule,
    Spinner
  ],
  templateUrl: './driver.html',
  styleUrl: './driver.scss',
})
export class Driver {
   showSpiner = true;
  listOfAllFatchData: any[] = [];
  searchTerm: string = '';
accountName:any;
lookupCode:any;
  ChildPolicyId:any;
  EndrosementId:any;
  teamName: any;

  constructor(
    private http: AllApiService,
    private router: Router,
    public dialog: MatDialog,
     private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.ChildPolicyId = localStorage.getItem('ChildPolicyID') ;
   
    this.EndrosementId = localStorage.getItem('EndorsementId') ;
  this.accountName = localStorage.getItem('AccountName');
    this.lookupCode = localStorage.getItem('LookUpCode')
   
    this.teamName = localStorage.getItem('teamName');
    this.getAllFile();
  }

  // 🔽 Get all files & sort latest first
  getAllFile() {
    this.http
      .getAllDataId(ApiUrl.getAttachDriverById,this.ChildPolicyId)
      .subscribe(data => {
        this.showSpiner = false;

        const obj = JSON.parse(JSON.stringify(data));
        this.listOfAllFatchData = obj.AttachmentDetail || [];
          this.cdr.detectChanges();
        // Latest AttachmentDate on top
     
      });
  }

  // 🔍 Search ANY field
 get filteredAttachments() {
  if (!this.searchTerm) {
    return this.listOfAllFatchData;
  }

  const term = this.searchTerm.toLowerCase();

  return this.listOfAllFatchData.filter((item: any) =>
    Object.keys(item).some(key => {
      const value = item[key];

      if (value === null || value === undefined) return false;

      // ✅ Format date like UI (MM/dd/yyyy)
      if (key === 'AttachmentDate') {
        const d = new Date(value);
        const formattedDate =
          ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
          ('0' + d.getDate()).slice(-2) + '/' +
          d.getFullYear();

        return formattedDate.includes(term);
      }

      // Normal string/number search
      return value.toString().toLowerCase().includes(term);
    })
  );
}


  // ⬇️ Download file on row click
// onRowClick(file: any) {
//     const httpsFileUrl = file.FileUrl.replace('http://', 'https://');
//     console.log(httpsFileUrl); 
  
//     const link = document.createElement('a');
//     link.href = httpsFileUrl;
//     link.download = file.FileName;
  
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

onRowClick(file: any) {
  if (!file?.FileUrl) return;

  let url = file.FileUrl.trim();

  // Ensure HTTPS (only if needed)
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  // Open in new tab (most reliable way)
  window.open(url, '_blank', 'noopener,noreferrer');
}

  // ➕ Add / Edit Attachment
 openAttachmentDialog(): void {
    const dialogRef = this.dialog.open(AddEditDriver, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllFile(); // 🔄 refresh list
    });
  }




deleteData(row: any, action: 'DELETE' | 'PERMANENT') {
  const dialogRef = this.dialog.open(DeleteDriver, {
    width: '360px',
    disableClose: true,
    data: {
      fileId: row.FileID,
      actionType: action
    }
  });

  // 🔥 THIS PART IS MISSING
  dialogRef.afterClosed().subscribe((res) => {
    if (res) {
      this.getAllFile(); // 🔁 refresh API
    }
  });
}

}
