import { HostListener, Injectable } from '@angular/core';
import { AllApiService } from '../../_service/all-api.service';
import { Router } from '@angular/router';
import { ApiUrl } from '../../_core/apiUrl';
import { catchError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private http: AllApiService,
   
    private router: Router
  ) {}
  performLogout0(userData: any){

  }
   @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    $event.preventDefault();
  }

  performLogout(userData: any) {
   
   
 
    return this.http.addEditData(ApiUrl.deleteExistLoginByLogout, userData)
      .pipe(
        timeout(25000),
       
      ).subscribe(data => {
        if (data?.Data?.Response === 1) {
         
          this.clearLocalStorage();
         
          localStorage.removeItem('TeamType');
          this.router.navigate(['/login']);
         
        
   
        } else {
          this.router.navigate(['/login']);
        
        }
      });
  }

   clearLocalStorage() {
    sessionStorage.clear(); // Clear all stored items
  
    console.log('Logout event triggered'); // Debug log
  }
}
