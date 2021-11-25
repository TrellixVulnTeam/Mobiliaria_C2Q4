import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { LogoutComponent } from './components/logout/logout.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    LogoutComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],providers: [CookieService, UserService]

})
export class ProfileModule { }
