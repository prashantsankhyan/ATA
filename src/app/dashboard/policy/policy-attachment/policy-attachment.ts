import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';

@Component({
  selector: 'app-policy-attachment',
   imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule],
  templateUrl: './policy-attachment.html',
  styleUrl: './policy-attachment.scss',
})
export class PolicyAttachment {
 addEditAttachmentForm!:FormGroup ;
  submit = false ;
  AccountID:any
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
   LineName:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder, 
  private http:AllApiService,private cRouter:ActivatedRoute,
  private router: Router,public dialog: MatDialog,public dialogRef: MatDialogRef<PolicyAttachment>){
 
  }
  ngOnInit(): void {
    
    this.AccountID = localStorage.getItem('AccountID')
    this.teamName =localStorage.getItem('teamName');
    this.userName = sessionStorage.getItem('UserName');
    this.accountName = localStorage.getItem('AccountName');
   
    this.LineName = localStorage.getItem('LineName')
   
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

    // File upload (binary)
    abc: ['', Validators.required],

     accountID: [this.AccountID, Validators.required],

    // Attachment metadata
    binding: [''],
    policies: [''],
    proposal: [''],
    bors: [''],
    notice: [''],

    // Extra info
    folderID: [''],
    attachedBy: ['1'],           // or user id
    description: [''],

    // Classification
    policyType: [this.LineName],
    transactionType: [''],
    teamName: ['Binding'],         // default as per data

    // Audit
    enteredBy: [this.userName]

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
    productFormData.append('policies',this.addEditAttachmentForm.get('policies')?.value);
    productFormData.append('binding',this.addEditAttachmentForm.get('binding')?.value);
    productFormData.append('proposal',this.addEditAttachmentForm.get('proposal')?.value);
    productFormData.append('enteredBy',this.addEditAttachmentForm.get('enteredBy')?.value);
    productFormData.append('bors',this.addEditAttachmentForm.get('bors')?.value);
    productFormData.append('notice',this.addEditAttachmentForm.get('notice')?.value);
     productFormData.append('teamName',this.addEditAttachmentForm.get('teamName')?.value);
  
    productFormData.append('attachedBy',this.addEditAttachmentForm.get('attachedBy')?.value);
    productFormData.append('description',this.addEditAttachmentForm.get('description')?.value);
    productFormData.append('policyType',this.addEditAttachmentForm.get('policyType')?.value);
    productFormData.append('transactionType',this.addEditAttachmentForm.get('transactionType')?.value);


    // Object.keys(this.productForm).map((key) =>{
    //   productFormData.append(key,this.productForm[key].value);
    // });
    
    
    this._addProduct(productFormData);
  
  }



    private _addProduct(productData: FormData): void {
      
    this.http.addEditFormDataNew(ApiUrl.uploadPolicyAndEndrosementAttachement,productData).pipe().subscribe(
        data => {

        
         const response  = JSON.stringify(data) ;
         const  obj   = JSON.parse(response) ;
       
         this.showSuccess();
         this.onNoClick1()
      
      },
       
      );
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


  

  showSuccess() {
   
   
    this.showFiv = true
    
  } 




  get f() {
    return this.addEditAttachmentForm.controls; }
  
    onNoClick1(): void {
      this.dialogRef.close(true);
     
    }
  
  
  
  
}
