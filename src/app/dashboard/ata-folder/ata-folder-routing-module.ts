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
        
        path:'ATASL',
        loadChildren:()=>import('./ata-sl-licence/ata-sl-licence-module').then(m=>m.AtaSlLicenceModule)
     
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
        
        path:'pardeepSlLicence',
        loadChildren:()=>import('./pardeep-sl-licenses/pardeep-sl-licenses-module').then(m=>m.PardeepSlLicensesModule)
     
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
      } ,
      {
        path:'ataInfo',
        loadChildren:()=>import('./ata-information/ata-information-module').then(m=>m.AtaInformationModule)
      } ,
      {
        path:'ataBond',
        loadChildren:()=>import('./ata-bond/ata-bond-module').then(m=>m.AtaBondModule)
      } ,
      {
        path:'ataDocument',
        loadChildren:()=>import('./ata-document/ata-document-module').then(m=>m.AtaDocumentModule)
      },
      {
        path:'ataCrime',
        loadChildren:()=>import('./ata-suiber-crime/ata-suiber-crime-module').then(m=>m.AtaSuiberCrimeModule)
      } ,
       {
        path:'ataSarb',
        loadChildren:()=>import('./ata-sarbjit/ata-sarbjit-module').then(m=>m.AtaSarbjitModule)
      } ,
      {
        path:'ataFolderCarrier',
        loadChildren:()=>import('./ata-folder-carrier/ata-folder-carrier-module').then(m=>m.AtaFolderCarrierModule)
      },

       {
        path:'underCarrierInsurance',
        loadChildren:()=>import('./ata-under-carrier-insurnce/ata-under-carrier-insurnce-module').then(m=>m.AtaUnderCarrierInsurnceModule)
      } ,
       {
        path:'ataFolderAgent',
        loadChildren:()=>import('./ata-folder-agent/ata-folder-agent-module').then(m=>m.AtaFolderAgentModule)
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtaFolderRoutingModule { }
