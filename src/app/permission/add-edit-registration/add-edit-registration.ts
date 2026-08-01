import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../_service/all-api.service';
import { ApiUrl } from '../../_core/apiUrl';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-edit-registration',
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule],
  templateUrl: './add-edit-registration.html',
  styleUrl: './add-edit-registration.scss',
})
export class AddEditRegistration {
showSpiner = true
  addEditRegistrationForm!:FormGroup ;
  submit = false ;
  loginId =''
 
  alertMessage =''
  errorMessage ='';
  messageSuccess = true;
  showTeamType = false;
 
 
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder, 
   private snackBar: MatSnackBar,
  private http:AllApiService ,private cRouter:ActivatedRoute,private router: Router,public dialog: MatDialog,public dialogRef: MatDialogRef<AddEditRegistration>){
 
  }
  ngOnInit(): void {
    this.makeForm();
    this.load()
  
   
  }

  makeForm() {
    this.addEditRegistrationForm = this.fb.group({
      loginId: ['0'],
      Team: ['Admin', [Validators.required]],
      TeamType: [''],
      UserName: [''],
      Password: [''],
      EmailID: [''],
    });
  
    
    // this.addEditRegistrationForm.get('Team')?.valueChanges.subscribe(team => {
      
    //   if (team === "Submission Team") {
    //     this.showTeamType = true;
       
       
    //     this.addEditRegistrationForm.get('TeamType')?.setValidators([Validators.required]);
    //   } else {
    //     this.showTeamType = false;
       
    //     this.addEditRegistrationForm.get('TeamType')?.setValidators(null);
    //   }
      
    //   this.addEditRegistrationForm.get('TeamType')?.updateValueAndValidity();
    // });
  }
  // teamTypeFieldInvalid(): boolean {
  //   const field = this.addEditRegistrationForm.get('TeamType');
  //   return !!field && field.invalid && (field.dirty || field.touched );
  // }

  load(){
    this.loginId = this.data.LoginID
     if(this.loginId == undefined){

     }
     else{
      let data  = this.data;
      let response  = JSON.stringify(data)
      let obj  = JSON.parse(response)
      this.addEditRegistrationForm.controls['loginId'].setValue(obj.loginId)
      this.addEditRegistrationForm.controls['Team'].setValue(obj.Team)
      this.addEditRegistrationForm.controls['UserName'].setValue(obj.UserName)
      this.addEditRegistrationForm.controls['Password'].setValue(obj.Password)
      this.addEditRegistrationForm.controls['EmailID'].setValue(obj.EmailID)

     }
  }


  // onSubmit() {
  //   this.submit = true ; 
  //   this.messageSuccess = false;
  //   if(!this.addEditRegistrationForm.valid){
  //     this.messageSuccess = true
  //     return
  //   }


   
  //  let obj = JSON.parse(JSON.stringify(this.addEditRegistrationForm.value))
  //   if(this.loginId){
  //     obj['loginId'] = this.loginId
     
  //   }
     
  //   console.log('objID',obj)
  //   this.http.addEditData(ApiUrl.addEditLogin,obj).pipe().subscribe(
  //     data => {
  //       let response  = JSON.stringify(data)
  //       var obj = JSON.parse(response);

  //       if(obj.Data.Response == '1'){
  //         this.alertMessage =obj.Data.ErrorMessage;
  //         this.showSuccess()
  //       }
  //       else{
  //         this.alertMessage =obj.Data.ErrorMessage;
        
  //         this.messageSuccess = true
          

  //       }
       
       
        
        

       

       
        
  //     }
    
  //   )
  // }


  onSubmit() {

  this.submit = true;
  this.messageSuccess = false;

  if (!this.addEditRegistrationForm.valid) {

    this.messageSuccess = true;

    this.snackBar.open(
      'Please fill all required fields',
      'Close',
      { duration: 3000 }
    );

    return;
  }

  let obj = JSON.parse(
    JSON.stringify(this.addEditRegistrationForm.value)
  );

  if (this.loginId) {
    obj['loginId'] = this.loginId;
  }

  console.log('objID', obj);

  this.http.addEditData(ApiUrl.addEditLogin, obj)
    .subscribe(
      data => {

        let response = JSON.stringify(data);
        var obj = JSON.parse(response);

        if (obj.Data.Response == '1') {

          this.alertMessage = obj.Data.ErrorMessage;

          // Success message
          const message =
            obj?.Data?.ErrorMessage ||
            (this.loginId
              ? 'Registration updated successfully'
              : 'Registration added successfully');

          this.snackBar.open(
            message,
            'Close',
            { duration: 3000 }
          );

          this.showSuccess();

        } else {

          this.alertMessage = obj.Data.ErrorMessage;
          this.messageSuccess = true;

          // Error message
          this.snackBar.open(
            obj?.Data?.ErrorMessage ||
            'Failed to save registration',
            'Close',
            { duration: 3000 }
          );
        }
      },
      error => {

        this.snackBar.open(
          'Something went wrong. Please try again later.',
          'Close',
          { duration: 3000 }
        );
      }
    );
}

  showSuccess() {
   
    this.messageSuccess = true
    
    this.changeLocation();
    this.cancleModel()
    
  } 

  error() {
   
    
  }
  get f() {
    return this.addEditRegistrationForm.controls;
    
  }

  cancleModel(): void {
    this.dialogRef.close();
   
  }
  changeLocation() {

    // save current route first
    let currentRoute = this.router.url;
    console.log("rute" , currentRoute)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
 

 
}
