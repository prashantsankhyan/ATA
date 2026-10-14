import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';

@Component({
  selector: 'app-sale-attachement',
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule],
  templateUrl: './sale-attachement.html',
  styleUrl: './sale-attachement.scss',
})
export class SaleAttachement {
addEditAttachmentForm!:FormGroup ;
  submit = false ;
  accountId:any;
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
   AccountName:any;
   teamName:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder, private http:AllApiService,private cRouter:ActivatedRoute,
  private router: Router,public dialog: MatDialog,public dialogRef: MatDialogRef<SaleAttachement>){
 
  }
  ngOnInit(): void {
    
   this.accountId = localStorage.getItem('AccountID') 
   
    this.teamName =localStorage.getItem('teamName');
    this.userName = sessionStorage.getItem('UserName');
    this.AccountName = localStorage.getItem('AccountName');
    this.userName = sessionStorage.getItem('UserName')
   
  //   if(this.userName == null){
  //     this.router.navigate(['/login'])
  //     this.dialogRef.close();
  // }
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

  makeForm(){
    this.addEditAttachmentForm = this.fb.group({
      abc:['',[Validators.required,]],
      accountID:[this.accountId ,[Validators.required,]],
      // FolderID:['',[Validators.required,]],
      attachedBy:['jj',],
      description:['',[Validators.required,]],
      enteredBy:[this.userName],
      teamName:['']
      
      
    });
  }
    



  get productForm() {
    return this.addEditAttachmentForm.controls;
  }


  onSubmit(): void {
    this.submit  = true ;
    this.showFiv = !this.showFiv
   
    if(this.addEditAttachmentForm.invalid){
     this.showFiv = true
      return ;
    }
    const productFormData = new FormData();

    for(let i=0 ; i< this.myFile.length; i++){
      productFormData.append('abc',this.myFile[i])
      
    }
   
    productFormData.append('accountID',this.addEditAttachmentForm.get('accountID')?.value);
    // productFormData.append('FolderID',this.addEditAttachmentForm.get('FolderID')?.value);
    productFormData.append('attachedBy',this.addEditAttachmentForm.get('attachedBy')?.value);
    productFormData.append('description',this.addEditAttachmentForm.get('description')?.value);
    productFormData.append('enteredBy',this.addEditAttachmentForm.get('enteredBy')?.value);
    productFormData.append('teamName',this.addEditAttachmentForm.get('teamName')?.value);

    // Object.keys(this.productForm).map((key) =>{
    //   productFormData.append(key,this.productForm[key].value);
    // });
    
    
    this._addProduct(productFormData);
  
  }



  
private _addProduct(productData: FormData): void {

  this.saveButtonShow = false;

  this.http.addEditFormDataNew(
    ApiUrl.addEditFileAttachment,
    productData
  ).subscribe({

    next: (data: any) => {

      console.log('Upload response:', data);

      // Notify the parent list to refresh
      this.http.filter('Register click');

      // Close dialog only after successful upload
      this.dialogRef.close(true);

    },

  error: (err: any) => {
  console.error('Upload error:', err);
  console.log('HTTP status:', err.status);
  console.log('Response body:', err.error);
  console.log('Error message:', err.message);

  this.saveButtonShow = true;
}

  });
}



  
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


  

  




  get f() {
    return this.addEditAttachmentForm.controls; }
  
    onNoClick1(): void {
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
