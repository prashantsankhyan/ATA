import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaFolder } from './ata-folder';

const routes: Routes = [
  {
    path:'',component:AtaFolder,children:[
      {
        
        path:'paymentMethod',
        loadChildren:()=>import('./payment-method/payment-method-module').then(m=>m.PaymentMethodModule)
     
      },
        {
        
        path:'Licence',
        loadChildren:()=>import('./licence-ata/licence-ata-module').then(m=>m.LicenceAtaModule)
     
      },
       {
        
        path:'surpulLine',
        loadChildren:()=>import('./surpul-line/surpul-line-module').then(m=>m.SurpulLineModule)
     
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaFolderRoutingModule { }
