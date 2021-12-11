import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserI } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  editUserForm: FormGroup;
  classImg: any;
  urlImg: string | any = null;
  Profile: any;
  nameFile: any;
  UFO: any;
  id: any;
  ngOnInit(): void {
    this.obtenerProfile()
  }
  constructor(private sanitizer: DomSanitizer, private profileS: ProfileService, private toast: ToastrService, private router: Router, private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['',
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[!@#$.%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)
        ]],
      rol: ['', Validators.required],
      number: ['', Validators.required],
      desc: [''],
    })
  }
  datos: any = {}
  isEdit: boolean = false
  nProfile: any = null
  crearForm(data: any) {
    this.editUserForm.controls['name'].setValue(this.datos.name)
    this.editUserForm.controls['lastname'].setValue(this.datos.lastname)
    this.editUserForm.controls['email'].setValue(this.datos.email)
    this.editUserForm.controls['rol'].setValue(this.datos.rol)
    this.editUserForm.controls['number'].setValue(this.datos.number)
    this.editUserForm.controls['desc'].setValue(this.datos.description)
    this.editUserForm.controls['password'].setValue(`.0DebesCambiar0.`)
  }

  obtenerProfile() {
    this.profileS.getData(true).subscribe(data => {
      this.datos = data.user;
      this.crearForm(data)
      this.UFO = data.user.password
      this.urlImg = data.user.profile
      this.id = data.user.id
    },
      err => {

      }
    )
  }

  touchEditar(event: any) {
    event.preventDefault()
    this.isEdit = true
    this.toast.info('ahora estas editando tu perfil', 'Editar Activated')
  }

  changeImg(event:any){
    if(!this.Profile){
      if (event.target.width > event.target.height) {
        this.classImg = `transform: scale(1.2)`
      } else if (event.target.width <= event.target.height) {
        this.classImg = 'width: 12rem;'
      }
    }
  }

  async captarProfile(event: any) {
    let ext: any;
    if ((event.target.files[0].name.indexOf('.jpg') > 0) || (event.target.files[0].name.indexOf('.png') > 0)) {
      ext = event.target.files[0].name.slice(event.target.files[0].name.length - 4, event.target.files[0].name.length)
    } else {
      ext = event.target.files[0].name.slice(event.target.files[0].name.length - 5, event.target.files[0].name.length)
    }
    this.nameFile = `${this.id}_profile${ext}`
    let img: any = await this.extraerBase64(event.target.files[0])
    let base = img.base
    let data: any = await this.getImageDimensions(base)
    if (data.w <= (data.h * 1.16)) {
      this.nProfile = base
      this.Profile = event.target.files[0]
      if (data.w > data.h) {
        this.classImg = `transform: scale(1.2)`
      } else if (data.w <= data.h) {
        this.classImg = 'width: 12rem;'
      }
    } else {
      this.toast.show('La imagen debe tener una relacion de aspecto proporcional 1:1, recortela o elija otra', 'DIMENSION NO PERMITIDA')
    }

  }



  noImage() {
    this.nProfile = null
    this.Profile = null;
  }

  getImageDimensions(file: any) {
    return new Promise(function (resolved, rejected) {
      var i = new Image()
      i.onload = function () {
        resolved({ w: i.width, h: i.height })
      };
      i.src = file
    })
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  async actualizarPerfil(event: any) {
    event.preventDefault()
    if (this.editUserForm.valid) {
      
      if (this.Profile) {
        try {
          let formData = new FormData();
          formData.append('file', this.Profile)
          this.profileS.postImg(formData, this.nameFile).subscribe((data)=>{
            console.log('data -------->',data)
            this.urlImg=data
            console.log('------------------>', this.urlImg)
            let password: any;
            if (this.editUserForm.get('password')?.value === '.0DebesCambiar0.') {
              password = this.UFO
            }
      
            const newUser: UserI = {
              img: this.urlImg,
              name: this.editUserForm.get('name')?.value,
              lastname: this.editUserForm.get('lastname')?.value,
              rol: this.editUserForm.get('rol')?.value,
              number: this.editUserForm.get('number')?.value,
              email: this.editUserForm.get('email')?.value,
              description: this.editUserForm.get('desc')?.value,
              password: password,
            }
      
            console.log(newUser)
      
            this.profileS.updateProfile(newUser, this.id).subscribe(
              data => {
                location.reload();
                this.toast.success('Prefil actualizado', 'DONE')
                // this.router.navigate(['/profile'])
              },
              err => {
                this.toast.error(err.message, err.name)
              }
            )
          },
          (error)=>{
            this.toast.error(error.message, error.name)
            console.log(error)
          })

        } catch (error: any) {
          this.toast.error('error del try', 'Error')
          console.log('error del try', error)
        }
      }else{
        console.log('------------------>', this.urlImg)
        let password: any;
        if (this.editUserForm.get('password')?.value === '.0DebesCambiar0.') {
          password = this.UFO
        }
  
        const newUser: UserI = {
          img: this.urlImg,
          name: this.editUserForm.get('name')?.value,
          lastname: this.editUserForm.get('lastname')?.value,
          rol: this.editUserForm.get('rol')?.value,
          number: this.editUserForm.get('number')?.value,
          email: this.editUserForm.get('email')?.value,
          description: this.editUserForm.get('desc')?.value,
          password: password,
        }
  
        console.log(newUser)
  
        this.profileS.updateProfile(newUser, this.id).subscribe(
          data => {
            location.reload();
            this.toast.success('Prefil actualizado', 'DONE')
  
          },
          err => {
            this.toast.error(err.message, err.name)
          }
        )
      }
      
    }
  }



}
