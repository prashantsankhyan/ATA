import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaSuiberCrime } from './ata-suiber-crime';

const routes: Routes = [
  {
    path:'',component:AtaSuiberCrime
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaSuiberCrimeRoutingModule { }
