import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiUrl } from '../../../_core/apiUrl';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-add-edit-agent',
   imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-agent.html',
  styleUrl: './add-edit-agent.scss',
})
export class AddEditAgent {
 submit = false;
 isLoading = false;
  alertMessage = '';
  messageSuccess = true;

  addEditAgentForm!: FormGroup;

  AgentID: any;
  LoginUserName: any;
  listOfBrokerName: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: AllApiService,
    private router: Router,
    private snackBar: MatSnackBar,   // ✅ ADD THIS
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddEditAgent>
  ) {}

  ngOnInit(): void {
    this.LoginUserName = sessionStorage.getItem('UserName');
    
    
    this.AgentID = this.data?.AgentID;

    this.makeForm();

    if (this.AgentID) {
      this.updateCarrier();
    }
  }

  // ✅ Create Form
  makeForm() {
 const usDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date());
    this.addEditAgentForm = this.fb.group({
      AgentID: ['0'],
      AgentName: ['', Validators.required],
      AgentCode: [''],
      AgencyName:[''],
       EODate:[usDate],
      PhoneNumber:[''],
      Email:[''],
      Address:[''],
      Fax:[''],

      
    });
  }

  // ✅ Load Data for Edit
 updateCarrier() {
  this.http.getAllDataId(ApiUrl.getAllAgentByByAgentId, this.AgentID).subscribe({
    next: (data: any) => {

      const agents = data?.Agent || [];

      if (agents.length > 0) {
        const agent = agents[0];

        this.addEditAgentForm.patchValue({
          AgentID: agent.AgentID,
          AgentName: agent.AgentName,
          AgentCode: agent.AgentCode,
          AgencyName:agent.AgencyName,
          PhoneNumber:agent.PhoneNumber,
          EODate:agent.EODate,
          Email:agent.Email,
          Address:agent.Address,
          Fax:agent.Fax
        });
      }
    },
    error: () => {
      console.log('Error fetching agent data');
    }
  });
}
  // ✅ Submit Form
  onSubmit() {
  this.submit = true;

  if (this.addEditAgentForm.invalid) {
    return;
  }

  this.isLoading = true; 
  const payload = { ...this.addEditAgentForm.value };

  if (this.AgentID) {
    payload.AgentID = this.AgentID;
  }



this.http.addEditData(ApiUrl.addEditAgent, payload)
  .pipe(
    finalize(() => {
      
    })
  )
  .subscribe({
    next: (res: any) => {

      const isSuccess = res?.Data?.Response == 1;

      const message = res?.Data?.ErrorMessage 
        || (this.AgentID ? 'Updated Successfully' : 'Added Successfully');

      this.snackBar.open(message, 'Close', { duration: 3000 });

      if (isSuccess) {
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 800);
      }
    },
    error: () => {
      this.snackBar.open('Failed to save data', 'Close', { duration: 3000 });
    }
  });
}

  // ✅ Success Handler
  showSuccess() {
    this.changeLocation();
    this.closeModel();
  }

  // ✅ Refresh Page
  changeLocation() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  // ✅ Getter for Validation
  get f() {
    return this.addEditAgentForm.controls;
  }

  // ✅ Close Dialog
  closeModel() {
    this.dialogRef.close(true);
  }
}
