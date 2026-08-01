import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';
@Component({
  selector: 'app-add-submission-attachment',
  imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule],
  templateUrl: './add-submission-attachment.html',
  styleUrl: './add-submission-attachment.scss',
})
export class AddSubmissionAttachment {
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
  private router: Router,public dialog: MatDialog,public dialogRef: MatDialogRef<AddSubmissionAttachment>){
 
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

    // Required
    AccountID: [this.AccountID, Validators.required],

    // Attachment metadata
    Binding: [''],
    Policies: [''],
    Proposal: [''],
    Bors: [''],
    Notice: [''],

    // Extra info
    FolderID: [''],
    AttachedBy: ['1'],           // or user id
    Description: [''],

    // Classification
    PolicyType: [this.LineName],
    TransactionType: [''],
    TeamName: ['Binding'],         // default as per data

    // Audit
    EnteredBy: [this.userName]

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
   
    productFormData.append('AccountID',this.addEditAttachmentForm.get('AccountID')?.value);
    productFormData.append('Policies',this.addEditAttachmentForm.get('Policies')?.value);
    productFormData.append('Binding',this.addEditAttachmentForm.get('Binding')?.value);
    productFormData.append('Proposal',this.addEditAttachmentForm.get('Proposal')?.value);
    productFormData.append('EnteredBy',this.addEditAttachmentForm.get('EnteredBy')?.value);
    productFormData.append('Bors',this.addEditAttachmentForm.get('Bors')?.value);
    productFormData.append('Notice',this.addEditAttachmentForm.get('Notice')?.value);
     productFormData.append('TeamName',this.addEditAttachmentForm.get('TeamName')?.value);
  
    productFormData.append('AttachedBy',this.addEditAttachmentForm.get('AttachedBy')?.value);
    productFormData.append('Description',this.addEditAttachmentForm.get('Description')?.value);
    productFormData.append('PolicyType',this.addEditAttachmentForm.get('PolicyType')?.value);
    productFormData.append('TransactionType',this.addEditAttachmentForm.get('TransactionType')?.value);


    // Object.keys(this.productForm).map((key) =>{
    //   productFormData.append(key,this.productForm[key].value);
    // });
    
    
    this._addProduct(productFormData);
  
  }



    private _addProduct(productData: FormData): void {
      
    this.http.addEditFormData(ApiUrl.uploadPolicyAndEndrosementAttachement,productData).pipe().subscribe(
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
