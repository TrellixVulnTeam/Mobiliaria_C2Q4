import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { inmuebleI } from 'src/app/models/inmuebles';
import { AsesorService } from 'src/app/services/asesor.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.scss']
})
export class InmueblesComponent implements OnInit {

  inmuebles: inmuebleI[]=[]
  constructor(private asesorS: AsesorService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.misPublicaciones()
  }

  misPublicaciones(){
    this.asesorS.getMyInm().subscribe(data =>{
      this.inmuebles=data
    },err=>{
      this.toast.error(err.message, err.name)
    })
  }

  deleteInmueble(x:any){
    this.asesorS.deleteInm(x).subscribe(data=>{
      this.toast.success(data.message, 'Done')
    },
    error=>{
      this.toast.error(error.message, error.name)
    })
    this.misPublicaciones()
  }
}
