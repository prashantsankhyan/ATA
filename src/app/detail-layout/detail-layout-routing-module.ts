import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailLayout } from './detail-layout';

const routes: Routes = [
 {
    path:'',redirectTo:'driver',pathMatch:'full'
  },
  {
      path:'',component:DetailLayout,children:[
        {
          path:'driver',
          loadChildren:()=>import('./driver/driver-module').then(m=>m.DriverModule)
        },
         {
          path:'vehilce',
          loadChildren:()=>import('./vehicle/vehicle-module').then(m=>m.VehicleModule)
        },
       
      ]
    
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailLayoutRoutingModule { }
