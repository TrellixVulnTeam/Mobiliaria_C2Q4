import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserTokenInterceptor } from './interceptors/user-token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from './services/security.service';
import { UserService } from './services/user.service';
import { AboutComponent } from './components/about/about.component';

@NgModule({
	declarations: [ 
    AppComponent, 
    HomeComponent, 
    NotFoundComponent, 
	AboutComponent
   ],
	imports: [ 
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    HttpClientModule ],
	providers: [
		SecurityService,
		UserService,
		CookieService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: UserTokenInterceptor,
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
