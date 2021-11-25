import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SecurityService {
	url = 'http://localhost:4000/security/';
	constructor(private http: HttpClient, private cookie: CookieService) {}

	public getUser(): Observable<any> {
    let token: string = this.cookie.get("ACCESS_TOKEN")
		return this.http.get<any>(`${this.url}accounts`, {
			headers: { token: token}
		});
	}

	public delUser(email:string): Observable<any>{
		return this.http.delete<any>(`${this.url}delete`, {
			headers: { euser: email}
		})
	}

	
}
