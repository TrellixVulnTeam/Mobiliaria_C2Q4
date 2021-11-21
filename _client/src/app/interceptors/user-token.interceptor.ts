import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;
    const token:string = this.cookieService.get("ACCESS_TOKEN")
    console.log("este es", token)
    if(token){
      req=request.clone({
        setHeaders: {
          autorization: token
        }
      })
    }
    
    return next.handle(req);
  }
}
