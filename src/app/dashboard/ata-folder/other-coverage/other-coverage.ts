import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { SearchTransactionFilterPipe } from '../../billing/search-transaction-filter-pipe';
import { Spinner } from '../../../spinner/spinner';

import { ApiUrl } from '../../../_core/apiUrl';
import { AllApiService } from '../../../_service/all-api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEditOtherCoverage } from './add-edit-other-coverage/add-edit-other-coverage';

@Component({
  selector: 'app-other-coverage',
imports: [CommonModule,MatButtonModule,FormsModule,MaterialModule],
  templateUrl: './other-coverage.html',
  styleUrl: './other-coverage.scss',
})
export class OtherCoverage {
showSpiner = true
  listOfAllFatchData:any[] =[];
  accountId:any;
  accountName ='';
  MarkedPolicyId:any;
  ChildPolicyID:any;
  IsChildPolicyExist:any
  EndorsementID:any;
  searchTerm: string = '';
  teamName:any;
 
allAttachments: any[] = [];
 searchCriteria = {
  FileName: '',
  Description: '',
  AttachmentDate: '',
  EnteredBy: ''
};

  constructor( private http:AllApiService,private router:Router,public dialog: MatDialog,private cdr: ChangeDetectorRef) { 
    this.http.listen().subscribe((m:any)=>{
      console.log(m)
      this.getAllFile()
    })
   }
  
ngOnInit(): void {
    this.getAllFile();
}



//   getAllFile() {
//   this.http.getAllData(ApiUrl.getStuff)
//     .subscribe({
//     next: (res: any) => {

//   console.log("FULL API RESPONSE:", res);

//   this.listOfAllFatchData = [...(res?.AttachmentDetail || [])];

//   console.log("DATA SET:", this.listOfAllFatchData);

//   this.showSpiner = false;

//   this.cdr.detectChanges(); // ✅ FORCE UI UPDATE
// }
      
//     });
// }

  getAllFile() {
  this.http
    .getAllData(ApiUrl.getOtherCoverage)
    .subscribe(data => {
      this.showSpiner = false;

      const obj = JSON.parse(JSON.stringify(data));

      let attachments = obj.AttachmentDetail || [];

      // Filter by PolicyType
     

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

  const term = (this.searchTerm || '').trim().toLowerCase();

  if (!term) {
    return this.listOfAllFatchData;
  }

  return this.listOfAllFatchData.filter((item: any) =>
    Object.keys(item).some(key => {

      const value = item[key];

      if (value == null) {
        return false;
      }

      // Search date in MM/dd/yyyy format
      if (key === 'AttachmentDate' || key === 'EnteredDate') {

        const d = new Date(value);

        const formattedDate =
          ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
          ('0' + d.getDate()).slice(-2) + '/' +
          d.getFullYear();

        return formattedDate.includes(term);
      }

      return value.toString().toLowerCase().includes(term);
    })
  );
}
 
  onRowClick(file: any) {
    const httpsFileUrl = file.FileUrl.replace('http://', 'https://');
    console.log(httpsFileUrl); // Display the HTTPS version of the FileUrl
  
    const link = document.createElement('a');
    link.href = httpsFileUrl;
    link.download = file.FileName;
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


//   onRowClick(file: any) {
//   if (!file?.FileUrl) return;

//   let url = file.FileUrl.trim();

//   // Convert http to https
//   if (url.startsWith('http://')) {
//     url = url.replace('http://', 'https://');
//   }

//   fetch(url)
//     .then(res => res.blob())
//     .then(blob => {
//       const blobUrl = window.URL.createObjectURL(blob);

//       const a = document.createElement('a');
//       a.href = blobUrl;

//       // Static file name
//       a.download = 'ATA Quote.msg';

//       // Auto download
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);

//       window.URL.revokeObjectURL(blobUrl);
//     })
//     .catch(err => {
//       console.error('Download failed:', err);
//     });
// }

trackByFile(index: number, item: any): any {
  return item.Id || item.FileUrl || index;
}
  
  addEditAttachement(data:any) {
    
   
    const dialogRef = this.dialog.open(AddEditOtherCoverage, {
      width: '800px',
      
    
  
    
  })
}
}
