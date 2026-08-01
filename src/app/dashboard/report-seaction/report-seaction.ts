import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllApiService } from '../../_service/all-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiUrl } from '../../_core/apiUrl';
import { Spinner } from '../../spinner/spinner';

@Component({
  selector: 'app-report-seaction',
   imports: [CommonModule,MaterialModule,ReactiveFormsModule,FormsModule,Spinner],
  templateUrl: './report-seaction.html',
  styleUrl: './report-seaction.scss',
})
export class ReportSeaction {
  showSpiner = true;
  listOfTransaction: any[] = [];
 
  searchText: string = '';
 listOfAgent: any[] = [];
  originalList: any[] = []; // 🔥 for search
  agentId:any;
  totalBalance: number = 0;
  constructor(
    private http: AllApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.getListOfAgent();
    
  }

  // ✅ GET DATA
 getListOfAgent() {
 

  this.http.getAllData(ApiUrl.getAllAgent).subscribe({
    next: (res: any) => {

      if (res?.Response === 1) {
        this.listOfAgent = res.Agent || [];
         this.showSpiner = false;
        this.originalList = [...this.listOfAgent];
      } else {
        this.listOfAgent = [];
      }

      this.showSpiner = false;

      this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
    },
    error: () => {
      this.showSpiner = false;
      this.listOfAgent = [];

      this.cdr.detectChanges(); // 🔥 IMPORTANT
    }
  });
}

  // ✅ SEARCH FILTER
  // applyFilter() {
  //   const text = (this.searchText || '').toLowerCase();

  //   if (!text) {
  //     this.listOfAgent = [...this.originalList];
  //     return;
  //   }

  //   this.listOfAgent = this.originalList.filter(item =>
  //     item.AgentName?.toLowerCase().includes(text)
  //   );
  // }
applyFilter(value: string) {
  const search = (value ?? '').toLowerCase().trim();

  if (!search) {
    this.listOfAgent = [...this.originalList];
    return;
  }

  this.listOfAgent = this.originalList.filter((item: any) =>
    (item.AgentName || '').toLowerCase().includes(search) ||
    (item.AgencyName || '').toLowerCase().includes(search) ||
    (item.AgentCode || '').toLowerCase().includes(search)
  );
}

onSelectAccount(event: any) {
  const selected = this.listOfAgent.find(x => x.AgentID == event.value);

  this.agentId = selected?.AgentID;
 
  this.agentId = selected?.AgentID;
  this.getListOfCarrier();
}


  // ✅ GET DATA
getListOfCarrier() {
 

  this.http.getAllDataId(ApiUrl.reportBillingBaseOfAgent,this.agentId).subscribe({
    next: (res: any) => {

      if (res && res.Response === 1 && Array.isArray(res.TransactionNews)) {
         this.showSpiner = false;
       this.listOfTransaction = res.TransactionNews || [];
        this.totalBalance = res.TotalBalance || 0;
      
      } else {
        this.listOfTransaction = [];
         this.totalBalance = 0;
      
      }

      this.showSpiner = false;
      this.cdr.detectChanges(); // force UI refresh
    },

    error: (err) => {
      console.error('API Error:', err);

      this.showSpiner = false;
      this.listOfTransaction = [];
      this.originalList = [];

      this.cdr.detectChanges();
    }
  });
}
  
  // ✅ OPEN DIALOG

  
}
