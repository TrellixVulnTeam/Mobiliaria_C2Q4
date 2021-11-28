import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserI, Usuario } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService
    ) {
    this.signupForm=this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      rol: ['', Validators.required],
      number: ['', Validators.required, Validators.email],
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.pattern('(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$')],
    })
  }

  ngOnInit(): void {
  }

  signUp(){
    const USUARIO: UserI ={
      name: this.signupForm.get('name')?.value,
      lastname: this.signupForm.get('lastname')?.value,
      rol: this.signupForm.get('rol')?.value,
      number: this.signupForm.get('number')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    }
    console.log(USUARIO);
      this._userService.signup(USUARIO).subscribe(data => {
      this.toastr.success('Usuario registrado', 'El Usuario se registro con éxito.')
      location.reload()
    }, error =>{
      this.toastr.error('Process has been failed', 'Error Signup')
      console.log(error)
      this.router.navigate(['/auth/signup'])
    })
  }



}
