import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from 'app/servicios/services/user/user.service';
import * as alertFunction from '../../../servicios/data/sweet-alerts';

const claveUsuario = new FormControl('', Validators.required);
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers:[UserService]
})
export class InicioComponent implements OnInit {
  public form: FormGroup;
  form2:FormGroup;
  form3:FormGroup;
  public status: string; 
  public identity;
  public token;
  cambiar = false;
  hide = true;
  recuperar = false;
  constructor(private router: Router,private fb: FormBuilder,private _userService:UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: claveUsuario,
    });
    this.form2 = this.fb.group({
      email :[null],
      newpass :[null,Validators.compose([Validators.required])],
      password: [null,Validators.required],
    });
    this.form3 = this.fb.group({
      email :[null, Validators.compose([Validators.required, CustomValidators.email])]
    });
  }

  onSubmit() {
    this.form.disable()
    this._userService.loginDashboard(this.form.value).subscribe(
      response => {
        // console.log(response);
        if(!response.user.changePass){
          this.cambiar = true;
        }else{
          this.status = 'success';
          this.identity = response.user
          this.token = response.token;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          localStorage.setItem('token', JSON.stringify(this.token));
          if(response.user.role == 'ROLE_USER'){
            this.router.navigate(['/administracion/solicitudes'])
          }else{
            if(response.user.role == 'ROLE_ALCALDE'){
              this.router.navigate(['/home/general']);
            }else{
              this.router.navigate(['/home']);
            }
          }
          this.form.reset();
          this.form.enable()
        }
      },error=>{
        var errorMessage = (<any>error);
        if(errorMessage != null){
          this.status='error';
          this.form.enable()
        }
      });
    // this.router.navigate(['/home']);

  }

  recPass(){
    this.form3.reset();
    this.form3.enable();
    if(!this.recuperar){
      this.recuperar = true;
    }else{
      if(this.recuperar){
        this.recuperar = false;
      }
    } 
  }

  recuperarPass(){
    this.form3.disable();
    this._userService.recuperarpassDash(this.form3.value).subscribe(res=>{
      this.recuperar = false;
      this.status = null;
      alertFunction.typeSuccessRecuperarContraseña()
      this.form3.reset();
      this.form3.enable();
    },err=>{
      this.form3.enable();
      alertFunction.typeErrorRecuperarPass()
    })
  }

  cambiarPass(){
    // console.log(this.form.value)
    this.form2.value.email = this.form.value.email;
    this._userService.cambiarpassDash(this.form2.value).subscribe(res=>{
      if(res.pass){
        alertFunction.typeSuccessContraseña()
        this.cambiar = false;
        this.status = null;
        this.form2.reset()
        this.form.reset()
        this.form.enable()
      }
    },err=>{
      alertFunction.typeErrorCambiarPass()
    })

}

}
