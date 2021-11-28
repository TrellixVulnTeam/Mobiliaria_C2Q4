import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url="http://localhost:4000/profile/"

  constructor(private http: HttpClient) {
  }

  getData(id:any):Observable<any>{
    return this.http.get(`${this.url}${id}`)
  }

}
