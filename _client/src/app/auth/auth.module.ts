import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
// import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from '../profile/components/profile/profile.component';
import { AuthRoutingModule } from '../auth/auth-routhing.module';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { UserTokenInterceptor } from '../interceptors/user-token.interceptor';

@NgModule({
	declarations: [ SignupComponent, LoginComponent, ProfileComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		RecaptchaModule,
		RecaptchaFormsModule,
		RouterModule
		// HttpClientModule,
		// ToastrModule,
	],
	providers: [ UserService ]
})
export class AuthModule {}
