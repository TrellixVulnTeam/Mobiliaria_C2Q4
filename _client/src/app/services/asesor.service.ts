import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inmuebleI } from '../models/inmuebles';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  url:string="http://localhost:4000/inmuebles/"
  constructor(private http:HttpClient) { }

  getMyInm():Observable<any>{
    return this.http.get<any>(this.url)
  }

  postImg(formData:FormData):Observable<any>{
    return  this.http.post(`${this.url}uploads`, formData)
  }

  createInm(Inmueble:inmuebleI):Observable<any>{
    return this.http.post<any>(`${this.url}create`, Inmueble)
  }

  deleteInm(idInm:string):Observable<any>{
    return this.http.delete(`${this.url}delete/${idInm}`)
  }
}
