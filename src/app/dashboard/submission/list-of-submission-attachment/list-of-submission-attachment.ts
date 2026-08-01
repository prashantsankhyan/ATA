import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule } from '@angular/common/http';

import { AllApiService } from '../../../_service/all-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrl } from '../../../_core/apiUrl';
import { AddSubmissionAttachment } from '../add-submission-attachment/add-submission-attachment';
@Component({
  selector: 'app-list-of-submission-attachment',
  imports: [
     CommonModule,
    FormsModule,
    MatButtonModule,
    
    
    MaterialModule,
    HttpClientModule,
  ],
  templateUrl: './list-of-submission-attachment.html',
  styleUrl: './list-of-submission-attachment.scss',
})
export class ListOfSubmissionAttachment {
showSpiner = true;
  listOfAllFatchData: any[] = [];
  searchTerm: string = '';

  AccountID:any;
  teamName: any;
  LineName:any;

  constructor(
    private http: AllApiService,
    private router: Router,
    public dialog: MatDialog,
     private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.AccountID = localStorage.getItem('AccountID') ;
   
   
    this.teamName = localStorage.getItem('teamName');
    this.LineName = localStorage.getItem('LineName')
   
    this.getAllFile();
  }

  // 🔽 Get all files & sort latest first
  // getAllFile() {
  //   this.http
  //     .getAllDataId(ApiUrl.getAllAttachmetOfPolicyAndEndrosement, this.AccountID)
  //     .subscribe(data => {
  //       this.showSpiner = false;

  //       const obj = JSON.parse(JSON.stringify(data));
  //       this.listOfAllFatchData = obj.AttachmentDetail || [];
  //         this.cdr.detectChanges();
  //       // Latest AttachmentDate on top
  //       this.listOfAllFatchData.sort(
  //         (a: any, b: any) =>
  //           new Date(b.AttachmentDate || 0).getTime() -
  //           new Date(a.AttachmentDate || 0).getTime()
  //       );
  //     });
  // }

  getAllFile() {
  this.http
    .getAllDataId(ApiUrl.getAllAttachmetOfPolicyAndEndrosement, this.AccountID)
    .subscribe(data => {
      this.showSpiner = false;

      const obj = JSON.parse(JSON.stringify(data));

      let attachments = obj.AttachmentDetail || [];

      // Filter by PolicyType
      if (this.LineName && this.LineName.trim() !== '') {
        attachments = attachments.filter((x: any) =>
          !x.PolicyType ||                     // null, undefined, ''
          x.PolicyType.trim() === '' ||
          x.PolicyType.trim().toLowerCase() === this.LineName!.trim().toLowerCase()
        );
      }

      // Sort latest first
      attachments.sort(
        (a: any, b: any) =>
          new Date(b.AttachmentDate || 0).getTime() -
          new Date(a.AttachmentDate || 0).getTime()
      );

      this.listOfAllFatchData = attachments;
      this.cdr.detectChanges();
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
  //   const httpsFileUrl = file.FileUrl.replace('http://', 'https://');

  //   const link = document.createElement('a');
  //   link.href = httpsFileUrl;
  //   link.download = file.FileName;

  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  
//     onRowClick(file: any) {
//   if (!file?.FileUrl) return;

//   let url = file.FileUrl.trim();


//   if (url.startsWith('http://')) {
//     url = url.replace('http://', 'https://');
//   }

 
//   window.open(url, '_blank', 'noopener,noreferrer');
// }

onRowClick(file: any) {
  if (!file?.FileUrl) return;

  let url = file.FileUrl.trim();

  // Convert http to https
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;

      // Static file name
      a.download = 'ATA Quote.msg';

      // Auto download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(err => {
      console.error('Download failed:', err);
    });
}
  // ➕ Add / Edit Attachment
 openAttachmentDialog(): void {
    const dialogRef = this.dialog.open(AddSubmissionAttachment, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllFile(); // 🔄 refresh list
    });
  }
}
