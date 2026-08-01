import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';

const routes: Routes = [

 {
    path:'',redirectTo:'sale',pathMatch:'full'
  }, 
  {
    path:'',component:Dashboard,children:[
      {
        path:'sale',
        loadChildren:()=>import('./sale/sale-module').then(m=>m.SaleModule)
      },
      {
        path:'submission',
        loadChildren:()=>import('./submission/submission-module').then(m=>m.SubmissionModule)
      },
       {
        path:'policy',
        loadChildren:()=>import('./policy/policy-module').then(m=>m.PolicyModule)
      },
       {
        path:'agent',
        loadChildren:()=>import('./agent/agent-module').then(m=>m.AgentModule)
      },

       {
        path:'mg',
        loadChildren:()=>import('./mg/mg-module').then(m=>m.MgModule)
      },
       {
        path:'carrier',
        loadChildren:()=>import('./carrier/carrier-module').then(m=>m.CarrierModule)
      },
       {
        path:'billing',
        loadChildren:()=>import('./billing/billing-module').then(m=>m.BillingModule)
      },
      {
        path:'driverBilling',
        loadChildren:()=>import('./driver-billing/driver-billing-module').then(m=>m.DriverBillingModule)
      },
      {
        path:'carrierCoverage',
        loadChildren:()=>import('./coverages-offered/coverages-offered-module').then(m=>m.CoveragesOfferedModule)
      },


        {
        path:'reports',
        loadChildren:()=>import('./report-seaction/report-seaction-module').then(m=>m.ReportSeactionModule)
      },

       {
        path:'stuff',
        loadChildren:()=>import('./stuff/stuff-module').then(m=>m.StuffModule)
      },

       {
        path:'ataFolder',
        loadChildren:()=>import('./ata-folder/ata-folder-module').then(m=>m.AtaFolderModule)
      },
     
    ]
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
