import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Spinner } from '../../../spinner/spinner';
import { AtaAddAgent } from './ata-add-agent/ata-add-agent';
import { ApiUrl } from '../../../_core/apiUrl';
import { AllApiService } from '../../../_service/all-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ata-folder-agent',
  imports: [CommonModule, MaterialModule,Spinner],
  templateUrl: './ata-folder-agent.html',
  styleUrl: './ata-folder-agent.scss',
})
export class AtaFolderAgent {
showSpiner = true;
  listOfAgent: any[] = [];
  originalList: any[] = []; // 🔥 for search
  searchText: string = '';
  UserName:any

  constructor(
    private http: AllApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
     localStorage.removeItem('carrierID');
    localStorage.removeItem('CarrierName');
     this.UserName = sessionStorage.getItem('Password')
     
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
  applyFilter() {
    const text = (this.searchText || '').toLowerCase();

    if (!text) {
      this.listOfAgent = [...this.originalList];
      return;
    }

    this.listOfAgent = this.originalList.filter(item =>
      item.AgentName?.toLowerCase().includes(text)
    );
  }

    goTOAgentAttachemnt(data:any){
     localStorage.setItem('carrierID', data.AgentID);
     localStorage.setItem('CarrierName', data.AgentName);
   
     this.router.navigate(['/dashboard/ataFolder/ataFolderAgent/agentAttachemet']);
  }


  addEditData(data?: any) {
  const dialogRef = this.dialog.open(AtaAddAgent, {
    
   
  
   maxHeight: '100vh',   // only limit, not fixed height
    data: data || null
  });

   dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this.getListOfAgent();
  }
    });
  }


}
