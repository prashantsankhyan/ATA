import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path:'',redirectTo:'login',pathMatch:'full'

    },
    {
       path:'login',component:Login
    },

   {
        path:'permission',
      
        loadChildren:()=>import('./permission/permission-module').then(m=>m.PermissionModule)
    },

   
    
    {
        path:'dashboard',
        canActivate: [authGuard],
        loadChildren:()=>import('./dashboard/dashboard-module').then(m=>m.DashboardModule)
    },
    {
        path:'detail',
        canActivate: [authGuard],
        loadChildren:()=>import('./detail-layout/detail-layout-module').then(m=>m.DetailLayoutModule)
    },
     {
    path: '**',
    redirectTo: 'login'
  }
];
