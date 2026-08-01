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
import { SrachSaleAttachemntPipe } from '../srach-sale-attachemnt.pipe';

@Component({
  selector: 'app-list-of-sale-attachemnt',
  imports: [CommonModule,MatButtonModule,FormsModule,MaterialModule,SrachSaleAttachemntPipe ,HttpClientModule ],
  templateUrl: './list-of-sale-attachemnt.html',
  styleUrl: './list-of-sale-attachemnt.scss',
})
export class ListOfSaleAttachemnt {
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
  searchCriteria = {
    FileName: '',
    Description: '',
    AttachmentDate: '',
    EnteredBy:'',
    PolicyType:'',
  
  };

  constructor( private http:AllApiService,private router:Router,public dialog: MatDialog,private cdr: ChangeDetectorRef) { 
    this.http.listen().subscribe((m:any)=>{
      console.log(m)
      this.getAllFile()
    })
   }
  
ngOnInit(): void {

  this.accountId = localStorage.getItem('AccountID');

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
 

  this.http.getAllDataId(ApiUrl.getAllFatchData, this.accountId)
    .subscribe({
    next: (res: any) => {

  console.log("FULL API RESPONSE:", res);

  this.listOfAllFatchData = [...(res?.AttachmentDetail || [])];

  console.log("DATA SET:", this.listOfAllFatchData);

  this.showSpiner = false;

  this.cdr.detectChanges(); // ✅ FORCE UI UPDATE
}
      
    });
}
  updateSearchCriteria(criteria: any) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria };
    this.cdr.markForCheck(); // Notify Angular that changes have occurred
  }

  onAttachmentDateChange(newAttachmentDate: string) {
    this.updateSearchCriteria({ AttachmentDate: newAttachmentDate });
    
  }

  onDescriptionChange(newDescription: string) {
    this.updateSearchCriteria({ Description: newDescription });
  }
  
  onEnteredByChange(newEnteredBy: string) {
    this.updateSearchCriteria({ EnteredBy: newEnteredBy });
  }
  onFileNameChange(newFileName: string) {
    this.updateSearchCriteria({ FileName: newFileName });
  }

  onPolicyTypeChange(newPolicyType: string) {
    this.updateSearchCriteria({ PolicyType: newPolicyType });
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
    
   
    const dialogRef = this.dialog.open(SaleAttachement, {
      width: '800px',
      
    
  
    
  })
}
  
  

  
}
