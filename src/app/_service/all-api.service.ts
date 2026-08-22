import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, } from 'rxjs';

import { ApiUrl } from '../_core/apiUrl';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AllApiService {
 
 private apiKey = 'YOUR_API_KEY';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  constructor(private http:HttpClient,private router: Router,) { }


  clearConsoleError() {
    setTimeout(() => console.clear(), 500); // Small delay to ensure the error is logged before clearing
  }

 getWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  

  getAllData(url:string):Observable<any>{
    let params = new HttpParams();
    const ApiUrl = `${environment.apiBaseUrl}${url}`;
    return this.http.get(ApiUrl).pipe((data=>{
      return data;
    }))
  }

  getPost(url: string): Observable<any> {
  const apiUrl = `${environment.apiBaseUrl}${url}`;
  return this.http.post(apiUrl, {}); // empty body REQUIRED
}

  
  thiredParty(url: string): Observable<any> {
    return this.http.get(url);
  }

  getCarrierInspection(dotNumber: string): Observable<any> {
    const url = `https://api.carriersoftware.com/api/Inspection?dot=${dotNumber}`;

    const headers = new HttpHeaders({
      'API_KEY': '6831DKTW-J5F7G3H9-6F2K7C7B-HKAT4928' // Replace with your actual API key
    });

    return this.http.get(url, { headers });
  }

  addEditData(url:string,json:JSON,):Observable<any>{
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    var params  = json;
    return this.http.post<any>(apiUrl,params,).pipe((data=>{
      return data;
    })
    )
  } 

    addEditDataUpdate(url:string,json:any,):Observable<any>{
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    var params  = json;
    return this.http.post<any>(apiUrl,params,).pipe((data=>{
      return data;
    })
    )
  }

  addEditDataDetail(url: string, body: any): Observable<any> {
  const apiUrl = `${environment.apiBaseUrl}${url}`;
  return this.http.post<any>(apiUrl, body);
}

 


addEditDataATA(url: string, json: any): Observable<any> {
  const apiUrl = `${environment.apiBaseUrl}${url}`;

  return this.http.post<any>(apiUrl, json).pipe(
    (data => {
      return data;
    })
  );
}
  
  getAllDataId(url:string,id?:any):Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}`;
    return this.http.get(apiUrl ,id) .pipe((data=>{
      return data;
    }))
  }
  getPolicyDetailsByAccountIdId(url:string,id?:any):Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}`;
    return this.http.post(apiUrl ,id) .pipe((data=>{
      return data;
    }))
  }
  postByTwoId(url: string, id1: any, id2: any): Observable<any> {
  const apiUrl = `${environment.apiBaseUrl}${url}/${id1}/${id2}`;
  return this.http.post(apiUrl, {}); // Empty body
}
  getAllDataByTwoId(url:string,id?:any ,id1?:any) :Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}/${id1}`;
    return this.http.get(apiUrl ,id) .pipe((data=>{
      return data;
    }))
  }
  getAllDataByThreId(url:string,id?:any ,id1?:any,id2?:any) :Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}/${id1}/${id2}`;
    return this.http.get(apiUrl ,id) .pipe((data=>{
      return data;
    }))
  }
  getAllDataByfour(url:string,id?:any ,id1?:any,id2?:any,id3?:any) :Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}/${id1}/${id2}/${id3}`;
    return this.http.get(apiUrl ,id) .pipe((data=>{
      return data;
    }))
  }
  
  getAllDataByIdAndDate(url:string,id?:any,date?:any){
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}/${date}`;
    return this.http.get(apiUrl ,id) .pipe((data=>{
      return data;
    }))

  }


 

  addEditFormData(url:string,productData:FormData,):Observable<any>{
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    var params  = productData;
    return this.http.post<any>(apiUrl,params).pipe((data=>{
      return data;
    })
    )
  }

  delete(url:string,id?:any, name?:any):Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}//${name}`;
    return this.http.post(apiUrl ,id ,name) .pipe((data=>{
      return data;
    }))
  }



 // 🔥 DELETE (normal mark delete)
deleteDriverFile(url: string, id: number): Observable<any> {
  return this.http.post(`${environment.apiBaseUrl}${url}/${id}`, {});
}

// 🔥 PERMANENT DELETE
deleteDriverFilePermanent(url: string, id: number): Observable<any> {
  return this.http.post(`${environment.apiBaseUrl}${url}/${id}`, {});
}

  // =========================
  // 🔹 DELETE (PERMANENT)
  // =========================
  deletePermanent(url: string, id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}/${id}`);
  }

  upDateByPassParameter(url:string,id?:any, name?:any):Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}//${name}`;
    return this.http.post(apiUrl ,id ,name) .pipe((data=>{
      return data;
    }))
  }
  
  deleteByThree(url:string,id?:any, name?:any,DeletedBy?:any):Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}/${name}/${DeletedBy}`;
    return this.http.post(apiUrl ,id ,name) .pipe((data=>{
      return data;
    }))
  }

  deleteByDelete(url:string,id?:any):Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}`;
    return this.http.delete(apiUrl ,id) .pipe((data=>{
      return data;
    }))
  }
  deleteById(url:string,id?:any):Observable<any>{
    const apiUrl =`${environment.apiBaseUrl}${url}/${id}`;
    return this.http.post(apiUrl ,id) .pipe((data=>{
      return data;
    }))
  }

  deleteAddQuery(url:string,json:JSON,):Observable<any>{
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    var params  = json;
    return this.http.post<any>(apiUrl,params,).pipe((data=>{
      return data;
    })
    )
  } 

  deleteByTwo(url:string,id:any,id1:any):Observable<any>{
    const apiUrl = `${environment.apiBaseUrl}${url}/${id}/${id1}`;
   
    return this.http.post<any>(apiUrl,id).pipe((data=>{
      return data;
    })
    )
  } 

  

  private _listner = new Subject<any>();
  listen():Observable<any>{
    return this._listner.asObservable();
  }
  filter(filterBy:String){
    this._listner.next(filterBy);
  }

  performLogout(userData: any): Observable<any> {
    return this.addEditData(ApiUrl.addUserInExistForm, userData); // Make sure this returns an Observable
  }

}
