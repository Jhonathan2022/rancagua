import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../../servicios/services/user/user.service';
import * as alertFunction from '../../../servicios/data/sweet-alerts';
import { Router } from "@angular/router";

const BREADCRUMBS: any[] = [
  {
    title: 'Administración',
    link: ''
  },
  {
    title: 'Usuarios',
    link: ''
  },
  {
    title: 'Registrar',
    link: ''
  }
];
@Component({
  selector: 'app-crear-usuario-area',
  templateUrl: './crear-usuario-area.component.html',
  styleUrls: ['./crear-usuario-area.component.scss'],
  providers:[UserService]
})
export class CrearUsuarioAreaComponent implements OnInit {
  breadcrumb: any[] = BREADCRUMBS;
  public form: FormGroup;
  rut:String = ''
  cargando = false;
  areas;
  verificar = false;
  constructor(private fb: FormBuilder,public _us: UserService, private router: Router) { 
  }

  ngOnInit() {
    this._us.getArea().then((res:any)=>{
      this.areas = res.areas;
    })
    this.form = this.fb.group({
      nombre: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      apellido: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      rut: ['', Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      telefono: [],
      area: [null, Validators.compose([Validators.required])],
    });
  }
  myFunction(){
    var rut:any = String(this.form.value.rut).replace(/-/g,'')
    rut = String(rut).replace(/\./g,'')
    rut = String(rut).replace('null','')
    if(rut.length >1){
      this.form.controls['rut'].setValue((String(rut).substring(0,(rut.length) -1)+'-'+String(rut).substring((rut.length) -1,rut.length)))
      this.rut = this.form.value.rut  
    }else{
      this.form.controls['rut'].setValue(rut);
      this.rut = rut;
    }
    this.verificar = (this.verificador(this.rut))

  }

  verificador(rut):boolean{
    rut = String(rut).replace(/\./g,'')
    if(rut == '' || rut == null){
      return false;
    }
    var Rut = [];
    if(rut.length == 9){
      rut="0"+rut;
    }
    rut = rut.toLowerCase();
    for(let i = 0; i < 10;i++){
      Rut[i] = rut.charAt(i);
    }
      var r = new RegExp(/[0-9]/g);
      var prueba,cantidad = 0;
      for(let i = 0; i < 8;i++){
        if((prueba = Rut[i].replace(r,'') )== ''){
          // console.log("es numero")
          cantidad = cantidad;
        }else{
          cantidad = cantidad +1;
        }
      }
      if(cantidad == 0){
        //solo son numeros, por tanto, puede seguir con la validación
        var suma = 0, mul = 2;
        for (let i= 7 ; i > -1; i--){
          suma = suma + (Number(Rut[i]) * mul);
          if (mul == 7) {
            mul = 2;
          }else{
            mul++;
          }
        }
        var resul = suma%11;
        resul = 11- resul;
        var digito;
        if(resul == 11){
          digito = 0;
        }else{
          if(resul == 10){
            digito = "k"
          }else{
            digito = resul;
          }
        }
        // console.log(digito,Rut[9])
        if(digito == Rut[9] && rut.length<11){
          //El rut es correcto
          return true;
        }else{
          //Rut INCORRECTO
          return false;
        }
      }else{
        //Hay una caracter que no es un numero en el cuerpo del rut antes del digito verificador
        return false;
      }
  
  }


  onSubmit(formDirective){
    this.cargando = true;
    if(this.form.valid){
      this.form.disable()
      this._us.saveUsuarioMunicipal(this.form.value).then((res:any)=>{
        this.form.reset();
        this.cargando = false;
        this.form.enable()
        formDirective.resetForm()
        this.typeGuardar();
      }).catch(err=>{
        if(err.error.existe){
          this.typeErrorEmail()
        }else{
          this.typeError();
        }
        this.form.enable()
        this.cargando = false;
      })
    }
  }

  typeError(){
    alertFunction.typeErrorCall();
  }
  typeGuardar(){
      alertFunction.typeSuccessCall();
  }
  typeErrorEmail(){
    alertFunction.typeErrorEmail();
  }

}
