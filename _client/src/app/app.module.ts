import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserTokenInterceptor } from './interceptors/user-token.interceptor';
// import { AuthRoutingModule } from './auth/auth-routhing.module';
// import { ReactiveFormsModule } from '@angular/forms';
// import { SignupComponent } from './components/signup/signup.component';
// import { LoginComponent } from './components/login/login.component';
// import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    // SignupComponent,
    // LoginComponent,
    // ProfileComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ReactiveFormsModule,
    // CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    // AuthRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UserTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
