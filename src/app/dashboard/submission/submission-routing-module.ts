import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Submission } from './submission';
import { ListOfSubmissionAttachment } from './list-of-submission-attachment/list-of-submission-attachment';
import { FileSubmissionATA } from './file-submission-ata/file-submission-ata';
import { Admitted } from './admitted/admitted';

const routes: Routes = [
  {
    path:'',component:Submission
  },
   {
    path:'attachment',component:ListOfSubmissionAttachment
  },
   {
    path:'fileSubmission/:id',component:FileSubmissionATA
  },
  {
    path:'admited/:id',component:Admitted
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionRoutingModule { }
