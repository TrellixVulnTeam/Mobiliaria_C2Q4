import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { inmuebleI } from '../models/inmuebles';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url="http://localhost:4000/"
  constructor(private cookie: CookieService, private http: HttpClient) { }

  getInmuebles():Observable<any>{
    return this.http.get<any>(`${this.url}`)
  }
}
