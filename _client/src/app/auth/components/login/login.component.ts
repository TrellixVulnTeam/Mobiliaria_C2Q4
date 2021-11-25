import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserI } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService
    ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required,
      //  Validators.email
      ],
      password: [
        '',
        Validators.required,
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/),
      ],
      recaptcha: [
        '',
        Validators.required
      ]

    });
  }
  siteKey="6Le1n0cdAAAAADIbgkv_eIFWhJK0M06pxzOFPiGh"
  ngOnInit(): void {}

  loginUser(){
    const USUARIO:UserI = {
      name: "",
      lastname: "",
      rol: "",
      number: 0,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }

    console.log(USUARIO);
    this._userService.login(USUARIO).subscribe(data => {
      console.log(data)
      this.toastr.success(`${data.dataUser.name.toUpperCase()} Welcome to ARCHITETCS!`, "User Logged")
      location.reload()
    }, error =>{
      this.toastr.error('Something is wrong', 'Error Login')
      console.log(error)
      this.router.navigate(['/auth/login'])
    })
  }

}


