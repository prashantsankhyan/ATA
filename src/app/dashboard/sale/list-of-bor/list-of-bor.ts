import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { AllApiService } from '../../../_service/all-api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrl } from '../../../_core/apiUrl';
import { SaleAttachement } from '../sale-attachement/sale-attachement';
import { AddBor } from '../add-bor/add-bor';
import { ConfirmBor } from '../confirm-bor/confirm-bor';

@Component({
  selector: 'app-list-of-bor',
 imports: [CommonModule,MatButtonModule,FormsModule,MaterialModule ,HttpClientModule ],
  templateUrl: './list-of-bor.html',
  styleUrl: './list-of-bor.scss',
})
export class ListOfBor {
 showSpiner = true
  listOfAllFatchData: any[] = [];
allFiles: any[] = [];
  accountId:any;
  accountName ='';
  MarkedPolicyId:any;
  ChildPolicyID:any;
  IsChildPolicyExist:any
  EndorsementID:any;
  searchTerm: string = '';
  teamName:any;
searchCriteria = {
  FileName: '',
  Description: '',
  AttachmentDate: ''
};

agentName:any;

  constructor( private http:AllApiService,private router:Router,public dialog: MatDialog,private cdr: ChangeDetectorRef) { 
    this.http.listen().subscribe((m:any)=>{
      console.log(m)
      this.getAllFile()
    })
   }
  
ngOnInit(): void {

  this.accountId = localStorage.getItem('AccountID');
   this.agentName = localStorage.getItem('AgentName');

  console.log('AccountID:',this.accountId); // 🔥 check this

  if (this.accountId) {
    this.getAllFile();
  } else {
    console.warn('AccountID missing');
    this.showSpiner = false;
  }
}


  backToMainAccount(){
    this.router.navigateByUrl('/mainLayout/account')
  }
  
getAllFile() {
  this.http.getAllDataId(ApiUrl.getBorAttachemnt, this.accountId)
    .subscribe({
      next: (res: any) => {

        this.allFiles = res?.AttachmentDetail || [];
        this.listOfAllFatchData = [...this.allFiles];

        this.showSpiner = false;
        this.cdr.detectChanges();
      }
    });
}
filterData() {

  this.listOfAllFatchData = this.allFiles.filter(item => {

    const fileNameMatch =
      !this.searchCriteria.FileName ||
      (item.FileName ?? '')
        .toLowerCase()
        .includes(this.searchCriteria.FileName.toLowerCase());

    const descriptionMatch =
      !this.searchCriteria.Description ||
      (item.Description ?? '')
        .toLowerCase()
        .includes(this.searchCriteria.Description.toLowerCase());

    const attachmentDate = item.AttachmentDate
      ? new Date(item.AttachmentDate).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })
      : '';

    const dateMatch =
      !this.searchCriteria.AttachmentDate ||
      attachmentDate.includes(this.searchCriteria.AttachmentDate);

    return fileNameMatch && descriptionMatch && dateMatch;
  });

}



  updateSearchCriteria(criteria: any) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria };
    this.cdr.markForCheck(); // Notify Angular that changes have occurred
  }

 onFileNameChange(newFileName: string) {
  this.searchCriteria.FileName = newFileName;
  this.filterData();
}

onDescriptionChange(newDescription: string) {
  this.searchCriteria.Description = newDescription;
  this.filterData();
}

onAttachmentDateChange(newAttachmentDate: string) {
  this.searchCriteria.AttachmentDate = newAttachmentDate;
  this.filterData();
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

  
  addEditAttachement(data:any) {
    
   
    const dialogRef = this.dialog.open(AddBor, {
      width: '800px',
      
    
  
    
  })
}


updateBor(data: any) {
  const dialogRef = this.dialog.open(ConfirmBor, {
    width: '450px',
    data: {
      accountId: data.AccountID,
      agentId: data.AgentID
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getAllFile();
    }
  });
}

  
  

  
}
