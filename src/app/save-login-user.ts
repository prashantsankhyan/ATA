import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { catchError, throwError, timeout } from 'rxjs';
import { AllApiService } from './_service/all-api.service';
import { ApiUrl } from './_core/apiUrl';
@Injectable({
  providedIn: 'root',
})
export class SaveLoginUser {
   constructor(
    private http: AllApiService,
    
    private router: Router
  ) {}

  perform(userData: any) {
    
    return this.http.addEditData(ApiUrl.addUserInExistForm, userData)
      .pipe(
        timeout(25000),
        catchError(error => {
          if (error.name === 'TimeoutError') {
            alert('Internet is slow, please wait or check your connection.');
          } else {
           
          }
          return throwError(() => error);
        })
      ).subscribe(data => {
        if (data?.Data?.Response === 1) {
          
         
          this.router.navigate(['/dashboard'])
        } else {
        
         
        }
      });
  }
}
