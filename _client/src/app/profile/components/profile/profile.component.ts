import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  datos:any={}
  rol:any=this.cookie.get('ROL')
  token:any=this.cookie.get('USER_ACCESS')
  context:any=[]
  constructor(private profileS: ProfileService, private toast:ToastrService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.obtenerProfile()
  }

  obtenerProfile(){
    this.profileS.getData(this.token).subscribe(data =>{
      this.datos = data.user;
      this.context = data.context 
    },
    err =>{

    }
    )
  }
}
