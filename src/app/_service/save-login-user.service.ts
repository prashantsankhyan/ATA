import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AllApiService } from '../_service/all-api.service';

import { ApiUrl } from '../_core/apiUrl';
import { catchError, throwError, timeout } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SaveLoginUserService {
  constructor(
    private http: AllApiService,
   
    private router: Router
  ) {}



 
}
