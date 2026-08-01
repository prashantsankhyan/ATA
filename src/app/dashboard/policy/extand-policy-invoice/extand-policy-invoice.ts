import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';

@Component({
  selector: 'app-extand-policy-invoice',
   imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule,FormsModule,NgxPrintModule],
  templateUrl: './extand-policy-invoice.html',
  styleUrl: './extand-policy-invoice.scss',
})
export class ExtandPolicyInvoice {
InvoiceID ='';
  AccountId ='';
accountDetail: any = {};
agentDetail: any[] = [];
listForPdf: any[] = [];
showSpinner = false;


  constructor(private route: ActivatedRoute,private http:AllApiService,public dialog: MatDialog,private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.AccountId = params['id'];
      
    });
    this.getdetailOfAllData();
  }
getdetailOfAllData(): void {
  this.showSpinner = true;

  this.http.getAllDataId(ApiUrl.extandInvoice, this.AccountId)
    .subscribe({
      next: (response: any) => {
        this.accountDetail = response?.AccountDetail ?? {};
        this.agentDetail = response?.AgentDetail ?? [];
        this.listForPdf = response?.ChildPolicyDetail ?? [];
        this.cdr.detectChanges();
        this.showSpinner = false;
      },
      error: () => {
        this.showSpinner = false;
      }
    });
}


  // public exportHtmlToPDF(){
  //   let list:any = document.getElementById('htmltable');
      
  //     html2canvas(list).then(canvas => {
          
  //         let docWidth = 204;
  //         let docHeight = canvas.height * docWidth / canvas.width;
          
  //         const contentDataURL = canvas.toDataURL('image/png')
  //         let doc = new jsPDF('p', 'mm', 'a4');
  //         let position = 10;
  //         doc.addImage(contentDataURL, 'PNG', 10, position, docWidth, docHeight)
          
  //         doc.save('exportedPdf.pdf');
  //     });
  // }


//   public exportHtmlToPDF(): void {
    
//     let DATA: any = document.getElementById('htmltable');
// html2canvas(DATA, { scale: 3 }).then((canvas) => {
//   let fileWidth = 208;
//   let fileHeight = (canvas.height * fileWidth) / canvas.width;
//   const FILEURI = canvas.toDataURL('image/png');
//   let PDF = new jsPDF('p', 'mm', 'a4');
//   let position = 0;
//   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
//   PDF.save('invoice.pdf');
// });
//   }
}
