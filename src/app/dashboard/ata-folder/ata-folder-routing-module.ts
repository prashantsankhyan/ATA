import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtaFolder } from './ata-folder';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'paymentMethod', // Change 'dashboard' to your desired route
    pathMatch: 'full'
  },
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
     
      },
       {
        
        path:'pardeep',
        loadChildren:()=>import('./pardeep/pardeep-module').then(m=>m.PardeepModule)
     
      },
      {
        
        path:'otherConveragae',
        loadChildren:()=>import('./other-coverage/other-coverage-module').then(m=>m.OtherCoverageModule)
     
      },
       {
        
        path:'endo',
        loadChildren:()=>import('./endo/endo-module').then(m=>m.EndoModule)
     
      } ,
      {
        
        path:'dyl',
        loadChildren:()=>import('./dyl/dyl-module').then(m=>m.DylModule)
     
      } ,
      
      {
        
        path:'w9',
        loadChildren:()=>import('./w9/w9-module').then(m=>m.W9Module)
     
      } ,
      {
        path:'agentOp',
        loadChildren:()=>import('./agent-appointment/agent-appointment-module').then(m=>m.AgentAppointmentModule)
      } ,
       {
        path:'ataOp',
        loadChildren:()=>import('./ata-appointment/ata-appointment-module').then(m=>m.AtaAppointmentModule)
      } ,
       {
        path:'ataTax',
        loadChildren:()=>import('./ata-tax/ata-tax-module').then(m=>m.AtaTaxModule)
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaFolderRoutingModule { }
