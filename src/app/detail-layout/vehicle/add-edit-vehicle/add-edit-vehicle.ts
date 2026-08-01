import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';

@Component({
  selector: 'app-add-edit-vehicle',
   imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-edit-vehicle.html',
  styleUrl: './add-edit-vehicle.scss',
})
export class AddEditVehicle {
  isSaving = false;
addEditAttachmentForm!:FormGroup ;
  submit = false ;
  AccountID:any
   ChildPolicyId:any;
  EndrosementId:any;
  saveEndrosement:any;
  FileDisplay!: string | ArrayBuffer;
  files: any;
  file:any
  listOfAllFolder:any =[];
  fileName ='';
   showFiv = true;
   userPermission:any;
   name =''
   detail =''
   myFile:string [] =[]
   saveButtonShow = true;
   userName:any;
   accountName:any;
   teamName:any;
   LoginUserName:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder, 
  private http:AllApiService,private cRouter:ActivatedRoute,
  private router: Router,public dialog: MatDialog,public dialogRef: MatDialogRef<AddEditVehicle>){
 
  }
  ngOnInit(): void {
    
     this.ChildPolicyId = localStorage.getItem('ChildPolicyID');
   this.LoginUserName = sessionStorage.getItem('UserName');
    this.EndrosementId = localStorage.getItem('EndorsementId');
    if (this.EndrosementId == '0'){
      this.saveEndrosement ='fasle'
           
    }else{
      this.saveEndrosement = 'true'
    }
      
    this.AccountID = localStorage.getItem('AccountID')
    this.teamName =localStorage.getItem('teamName');
    this.userName = sessionStorage.getItem('UserName');
     this.accountName = localStorage.getItem('AccountName');
    
    this.getAllFileDetail()
    this.makeForm();
   
   
    
   
  }
  getAllFileDetail(){
    this.http.getAllData(ApiUrl.getListOfAllFilder).subscribe(
      data=>{
       let response  = JSON.stringify(data)
       let obj = JSON.parse(response)
       this.listOfAllFolder = obj.Folders
      }
    )
  }

 


  makeForm() {
  this.addEditAttachmentForm = this.fb.group({
    abc: ['', Validators.required],
    ChildPolicyId: [this.ChildPolicyId, Validators.required],
    EndorsementId: ['1'],
    VehicleDescription: ['',Validators.required],
    Remarks:[this.saveEndrosement],
    AttachedBy:[''],
    EnteredBy: [this.LoginUserName]

  });
}

    



  get productForm() {
    return this.addEditAttachmentForm.controls;
  }


//  onSubmit(): void {
//   this.submit = true;

//   if (this.addEditAttachmentForm.invalid) {
//     return;
//   }

//   const formData = new FormData();

//   // append files
//   this.myFile.forEach(file => {
//     formData.append('abc', file);
//   });

//   // append actual form values
//   formData.append('ChildPolicyId', this.f['ChildPolicyId'].value);
//   formData.append('EndorsementId', this.f['EndorsementId'].value);
//   formData.append('VehicleDescription',this.f['VehicleDescription'].value);
//   formData.append('Remarks', this.f['Remarks'].value);
//   formData.append('AttachedBy', this.f['AttachedBy'].value);
//   formData.append('EnteredBy', this.f['EnteredBy'].value);

//   // optional localStorage values
  

//   this._addProduct(formData);
// }


onSubmit(): void {

  this.submit = true;

  // prevent double click
  if (this.isSaving) {
    return;
  }

  if (this.addEditAttachmentForm.invalid) {
    return;
  }

  this.isSaving = true;

  const formData = new FormData();

  this.myFile.forEach(file => {
    formData.append('abc', file);
  });

  formData.append('ChildPolicyId', this.f['ChildPolicyId'].value);
  formData.append('EndorsementId', this.f['EndorsementId'].value);
  formData.append('VehicleDescription', this.f['VehicleDescription'].value);
  formData.append('Remarks', this.f['Remarks'].value);
  formData.append('AttachedBy', this.f['AttachedBy'].value);
  formData.append('EnteredBy', this.f['EnteredBy'].value);

  this._addProduct(formData);
}
private _addProduct(productData: FormData): void {

  this.showFiv = false;

  this.http.addEditFormData(
    ApiUrl.addVehicleAttachment,
    productData
  ).subscribe({

    next: (data) => {

      this.isSaving = false;
      this.showFiv = true;

      this.showSuccess();

      this.onNoClick1();

    },

    error: (err) => {

      this.isSaving = false;
      this.showFiv = true;

      console.log(err);

    }

  });

}


  //   private _addProduct(productData: FormData): void {
      
  //   this.http.addEditFormData(ApiUrl.addVehicleAttachment,productData).pipe().subscribe(
  //       data => {

        
  //        const response  = JSON.stringify(data) ;
  //        const  obj   = JSON.parse(response) ;
       
  //        this.showSuccess();
  //        this.onNoClick1()
      
  //     },
       
  //     );
  // }

  
  onFileUpload(event:any): void {
    this.files = event.target.files[0];
    for(let i=0 ; i<(event.target.files.length);i++){
      this.file = event.target.files[i]
      this.myFile.push(event.target.files[i])
      this.addEditAttachmentForm.get('abc')?.setValue(this.myFile);
    }
    // if (this.files) {
    //   this.addEditAttachmentForm.patchValue({ abc: this.files });
    //   this.addEditAttachmentForm.get('abc')?.setValue(this.myFile);
    //   const fileReader = new FileReader();
    //   fileReader.onload = () => {
    //     this.FileDisplay =fileReader.result!;
    //   };
    //   fileReader.readAsDataURL(this.files);
    // }
    console.log("filer", this.myFile)

    this.detail  = this.files.name
  }


  

  showSuccess() {
   
   
    this.showFiv = true
    
  } 




  get f() {
    return this.addEditAttachmentForm.controls; }
  
    onNoClick1(): void {
      this.dialogRef.close(true);
     
    }

}
