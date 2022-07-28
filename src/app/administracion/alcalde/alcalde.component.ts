import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../servicios/services/user/user.service';
import * as alertFunction from '../../servicios/data/sweet-alerts';
import { Router } from "@angular/router";
import { LocalDataSource } from 'ng2-smart-table';
import swal from 'sweetalert2';

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
    title: 'Registrar administrador',
    link: ''
  }
];

@Component({
  selector: 'app-alcalde',
  templateUrl: './alcalde.component.html',
  styleUrls: ['./alcalde.component.scss'],
  providers:[UserService]
})
export class AlcaldeComponent implements OnInit {
  breadcrumb: any[] = BREADCRUMBS;
  public form: FormGroup;
  public form2: FormGroup;
  rut:String = ''
  cargando = false;
  roles = ['ROLE_ADMIN','ROLE_ALCALDE']
  source: LocalDataSource;
  filterSource: LocalDataSource;
  alertSource: LocalDataSource;
  settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    actions:{
      position:'right',
      columnTitle:'Editar',
    },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate:true,
      },
      edit: {
        editButtonContent: '<i class="fa fa-pencil info font-medium-1 mr-2"></i>',
        saveButtonContent: '<i class="fa fa-check-square success font-medium-1 mr-2"></i>',
        cancelButtonContent: '<i class="fa fa-times danger nb-close font-medium-1 mr-2"></i>',
        confirmSave:true,
      },
      delete:{
        deleteButtonContent: '<i class="fa fa-trash" style="color:red !important;"></i>',
        confirmDelete: true,
      },
      columns: {
        nombre: {
          title: 'Nombre',
          type: 'string',
          editable:true,
        },
        apellido: {
          title: 'Apellido',
          type: 'string',
          editable:true,
        },
        email: {
          title: 'Email',
          type: 'string',
          editable:true,
        },
        telefono: {
          title: 'Teléfono',
          type: 'string',
          editable:true,
        },
      },
    };
    usuarios;
    verificar = false;
  constructor(private fb: FormBuilder,public _us: UserService, private router: Router) { 
    this.form = this.fb.group({
      nombre: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      apellido: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      rut: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      telefono: [],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    });
    this.form2 = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      telefono: [],
      _id: ['', Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    });
  }

  ngOnInit() {
    this._us.listarAdmin().then((res:any)=>{
      this.usuarios = res.administradores;

      this.source = new LocalDataSource(this.usuarios);
      this.filterSource = new LocalDataSource(this.usuarios);
      this.alertSource = new LocalDataSource(this.usuarios);
    }).catch(err=>{})
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
      this._us.guardarAdmin(this.form.value).then((res:any)=>{
        this.form.reset();
        this.cargando = false;
        this.form.enable()
        formDirective.resetForm()
        this.typeGuardar();
        this._us.listarAdmin().then((res:any)=>{
          this.usuarios = res.administradores;
    
          this.source = new LocalDataSource(this.usuarios);
          this.filterSource = new LocalDataSource(this.usuarios);
          this.alertSource = new LocalDataSource(this.usuarios);
        }).catch(err=>{})
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

  onUpdateConfirm(event):void{
    this.form2.controls['nombre'].setValue(event.newData.nombre)
    this.form2.controls['apellido'].setValue(event.newData.apellido)
    this.form2.controls['_id'].setValue(event.newData._id)
    this.form2.controls['email'].setValue(event.newData.email)
    this.form2.controls['telefono'].setValue(event.newData.telefono)
    if(this.form2.valid){
      this._us.actualizarAdmin(this.form2.value).then(r=>{
        event.confirm.resolve(event.newData);
        this.form2.reset()
        swal.fire("Usuario actualizado", "Se ha actualizado con exito el usuario", "success");
      }).catch(err=>{
        swal.fire("Error al actualizar", "No se ha podido actualizar el usuario", "warning");
        this.form2.reset()
      })
    }else{
      swal.fire("Error al actualizar", "Revise que existan todos los campos y que sea un correo valido", "warning");
      this.form2.reset()
    }
  }

  onDeleteConfirm(event):void{
    swal.fire({
      title: '¿Borrar al usuario: ',
      text: String(event.data.nombre).toUpperCase()+' '+String(event.data.apellido).toUpperCase()+', del área de '+String(event.data.area).toUpperCase()+'?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, Cancelar!',
    }).then((res) => {
      if (!res.dismiss) {
        this._us.eliminarAdminDashboard(event.data._id).then((res:any)=>{
          event.confirm.resolve(event.newData);
          swal.fire("Usuario eliminado", "Se ha eliminado con exito el usuario", "success");
        }).catch(err=>{
          swal.fire("Error al  eliminar", "No se ha podido eliminar el usuario", "error");
        })
      }
    })
    
  }

}
