import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AllApiService } from '../../_service/all-api.service';
import { ApiUrl } from '../../_core/apiUrl';
import { catchError, throwError, timeout } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-logout',
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
 showSpinner = false; // Spinner visibility flag
  confirmLogin!: FormGroup;
  submit = false;
  messageSuccess = true;

  constructor(
    private fb: FormBuilder,
    private http: AllApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.makeForm();
  }

  makeForm() {
    this.confirmLogin = this.fb.group({
      userName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   this.submit = true;
  //   this.messageSuccess = false;

  //   if (!this.confirmLogin.valid) {
      
  //     return;
  //   }

  //   const userCredentials = this.confirmLogin.value;

  //   this.showSpinner = true; // Show spinner during the API request
  //   this.http.addEditData(ApiUrl.deleteExistLoginByLogout, userCredentials)
  //     .pipe(
       
  //     )
  //     .subscribe(data => {
  //       this.showSpinner = false; // Hide spinner after response

  //       const responseObj = JSON.parse(JSON.stringify(data));
  //      console.log('responseObj',responseObj.Data.Response)
  //       if (responseObj.Data.Response === 1) {
  //         this.clearLocalStorage();
          
        
          
  //       } else {
         
  //       }
  //     });
  // }

 onSubmit(): void {
this.submit = true;

if (this.confirmLogin.invalid) {
this.confirmLogin.markAllAsTouched();


this.snackBar.open(
  'Please enter Username and Password',
  'Close',
  { duration: 3000 }
);

return;


}

const userCredentials = this.confirmLogin.value;
this.showSpinner = true;

this.http.addEditData(
ApiUrl.deleteExistLoginByLogout,
userCredentials
).pipe(
timeout(60000),
catchError((error) => {
this.showSpinner = false;


  if (error.name === 'TimeoutError') {
    this.snackBar.open(
      'The request timed out. Please check your internet connection.',
      'Close',
      { duration: 3000 }
    );
  } else {
    this.snackBar.open(
      'An unexpected error occurred. Please try again later.',
      'Close',
      { duration: 3000 }
    );
  }

  return throwError(() => error);
})


).subscribe({
next: (data: any) => {
this.showSpinner = false;


  console.log('Logout API Response:', data);

  // Support both old and new API response formats
  const responseObj = data?.Data ?? data;
  const responseCode = responseObj?.Response ?? responseObj?.response;
  const errorMessage = responseObj?.ErrorMessage ?? responseObj?.errorMessage;

  if (responseCode == 1) {
    this.clearLocalStorage();
    sessionStorage.clear();

    this.snackBar.open(
      errorMessage || 'Logout Successfully',
      'Close',
      { duration: 3000 }
    );

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  } else {
    this.snackBar.open(
      errorMessage || 'Invalid Username or Password',
      'Close',
      { duration: 3000 }
    );
  }
}


});
}


  get f() {
    return this.confirmLogin.controls;
  }

  clearLocalStorage() {
    const keysToRemove = [
      'teamName', 'accountId', 'accountName', 'MarkedPolicyID', 
      'ChildPolicyID', 'EndorsementID', 'IsChildPolicyExist', 'lookUpCode',
      'emailID', 'phoneNumber', 'Password', 'UserName', 'TeamType',
      'marketedName', 'Yard_Address', 'No_of_Driver', 'No_of_Unit', 
      'PolicyType'
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}
