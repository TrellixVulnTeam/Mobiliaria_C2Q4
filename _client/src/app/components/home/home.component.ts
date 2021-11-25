import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { inmuebleI } from 'src/app/models/inmuebles';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  encabezado = "Los Mas Buscados"
  constructor(private homeS: HomeService, private toast: ToastrService) {
    
  }
  inmuebles:inmuebleI[]=[];

  ngOnInit(): void {
    this.obtenerInmuebles()
  }

  obtenerInmuebles(){
    this.homeS.getInmuebles().subscribe(data=>{
      this.inmuebles=data
    }, err=>{
      this.toast.error(err.message, err.name)
    })
  }
}
