import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaSarbjit } from './ata-sarbjit';

const routes: Routes = [
  {
    path:'',component:AtaSarbjit
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaSarbjitRoutingModule { }
