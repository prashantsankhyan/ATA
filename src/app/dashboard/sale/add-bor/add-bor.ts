import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';

@Component({
  selector: 'app-add-bor',
   imports: [CommonModule,MaterialModule,RouterModule,ReactiveFormsModule],
  templateUrl: './add-bor.html',
  styleUrl: './add-bor.scss',
})
export class AddBor {
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
   listOfAgent: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder, private http:AllApiService,private cRouter:ActivatedRoute,
   private cdr: ChangeDetectorRef,
  private router: Router,public dialog: MatDialog,public dialogRef: MatDialogRef<AddBor>){
 
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

    this.makeForm();
    this.getListOfAgent();
   
   
    
   
  }

  
    getListOfAgent() {
  this.http.getAllData(ApiUrl.getAllAgent).subscribe({
    next: (res: any) => {
      this.listOfAgent = res?.Response === 1 ? res.Agent || [] : [];

      // ✅ AFTER agents loaded → call API
    

      this.cdr.detectChanges();
    },
    error: () => {
      this.listOfAgent = [];
    }
  });
}

makeForm() {
  const usaNow = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York'
    })
  );

  const attachmentDate = usaNow.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  this.addEditAttachmentForm = this.fb.group({
    abc: ['', Validators.required],
    AccountID: [this.accountId, Validators.required],
    AttachmentDate: [attachmentDate], // 07/04/2026 09:36:44 AM
    Description: ['', Validators.required],
    AgentID: [''],
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
    // productFormData.append('FolderID',this.addEditAttachmentForm.get('FolderID')?.value);
    productFormData.append('AttachmentDate',this.addEditAttachmentForm.get('AttachmentDate')?.value);
    productFormData.append('Description',this.addEditAttachmentForm.get('Description')?.value);
    productFormData.append('EnteredBy',this.addEditAttachmentForm.get('EnteredBy')?.value);
    productFormData.append('AgentID',this.addEditAttachmentForm.get('AgentID')?.value);

    // Object.keys(this.productForm).map((key) =>{
    //   productFormData.append(key,this.productForm[key].value);
    // });
    
    
    this._addProduct(productFormData);
  
  }



    private _addProduct(productData: FormData): void {
      this.changeLocation()
    this.http.addEditFormData(ApiUrl.addAgentBORAttachement,productData).pipe().subscribe(
        data => {

         this.changeLocation()
         const response  = JSON.stringify(data) ;
         const  obj   = JSON.parse(response) ;
       
         
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
