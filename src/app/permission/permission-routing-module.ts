import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Logout } from './logout/logout';
import { Registration } from './registration/registration';
import { Permission } from './permission';

const routes: Routes = [
  {
    path:'',component:Permission
  },
  
  {
    path:'logout',component:Logout
  },
   {
    path:'registration',component:Registration
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
