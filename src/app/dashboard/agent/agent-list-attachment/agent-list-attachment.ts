import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { SearchTransactionFilterPipe } from '../../billing/search-transaction-filter-pipe';

import { ApiUrl } from '../../../_core/apiUrl';
import { AllApiService } from '../../../_service/all-api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from '../../../spinner/spinner';
import { AddAgentAttachment } from '../add-agent-attachment/add-agent-attachment';
@Component({
  selector: 'app-agent-list-attachment',
  imports: [CommonModule,MatButtonModule,FormsModule,MaterialModule,SearchTransactionFilterPipe,Spinner],
  templateUrl: './agent-list-attachment.html',
  styleUrl: './agent-list-attachment.scss',
})
export class AgentListAttachment {
showSpiner = true
  listOfAllFatchData:any =[];
  accountId:any;
  accountName ='';
  AccountName:any;
  MarkedPolicyId:any;
  ChildPolicyID:any;
  IsChildPolicyExist:any
  EndorsementID:any;
  searchTerm: string = '';
  teamName:any;
  searchCriteria = {
    PolicyType:'',
     AttachedBy:'',
     TransactionType:'',
       AttachmentDate:'',
  };
  
  constructor( private http:AllApiService,private router:Router,public dialog: MatDialog,private cdr: ChangeDetectorRef ,) { 
    this.http.listen().subscribe((m:any)=>{
      console.log(m)
      this.getAllFile()
    })
   }
  
  ngOnInit(): void {
      
  
     this.accountId = localStorage.getItem('carrierID') ;
   this.AccountName = localStorage.getItem('CarrierName') ;
   
    this.getAllFile()
  }
  updateSearchCriteria(criteria: any) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria };
    this.cdr.markForCheck(); // Notify Angular that changes have occurred
  }

  onPolicyTypeChange(newPolicyType: string) {
    this.updateSearchCriteria({ PolicyType: newPolicyType});
  }

  onnewTransactionTypeChange(newTransactionType: string) {
    this.updateSearchCriteria({ TransactionType: newTransactionType});
  }
  
  
  

  onAttachedByChange(newAttachedBy: string) {
    this.updateSearchCriteria({ AttachedBy: newAttachedBy });
  }

  onAttachmentDateChange(newAttachmentDate: string) {
    this.updateSearchCriteria({ AttachmentDate: newAttachmentDate });
  }

  
  
 

    // 🔽 Get all files & sort latest first
getAllFile() {
  this.http
    .getAllDataId(ApiUrl.getBrokerUploadFile,this.accountId)
    .subscribe(data => {
      this.showSpiner = false;

      console.log('API RAW:', data); // ✅ check here

      const obj = data as any; // ❌ don't stringify/parse
      this.listOfAllFatchData = obj?.AttachmentDetail || [];

      console.log('LIST:', this.listOfAllFatchData); // ✅ confirm array

    
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

  
addEditAttachement() {
  const dialogRef = this.dialog.open(AddAgentAttachment, {
    width: '800px',
    height: '450px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.getAllFile(); // ✅ refresh list after save
    }
  });
}
  
 goToAgent() {
  this.router.navigateByUrl('/dashboard/agent');
}
}
