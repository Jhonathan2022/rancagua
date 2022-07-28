import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../../servicios/services/user/user.service';
import * as alertFunction from '../../../servicios/data/sweet-alerts';
import { Router } from "@angular/router";
import {MatTableDataSource} from '@angular/material/table';
import { LocalDataSource } from 'ng2-smart-table';
import swal from 'sweetalert2';
import { CustomEditorAreasComponent } from 'app/administracion/tipoSolicitud/crear-solicitud/custom-editor-sucursal.component';

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
    title: 'Editar',
    link: ''
  },
];

@Component({
  selector: 'app-editar-usuario-area',
  templateUrl: './editar-usuario-area.component.html',
  styleUrls: ['./editar-usuario-area.component.scss']
})
export class EditarUsuarioAreaComponent implements OnInit {
  breadcrumb: any[] = BREADCRUMBS;
  usuarios;
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
        area: {
          title: 'Área',
          type: 'string',
          editable:true,
          editor:{
            type: 'custom',
            component:CustomEditorAreasComponent
          }
        },
        solicitudes: {
          title: 'Solicitudes',
          type: 'string',
          editable:false,
          width:'5%'
        },
      },
    };
    public form2: FormGroup;
    areas;
  constructor(public _us: UserService,private fb: FormBuilder) {
    this.form2 = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      telefono: [],
      area: ['', Validators.compose([Validators.required])],
      _id: ['', Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    });
   }

  ngOnInit() {
    this._us.getArea().then((res:any)=>{
      this.areas = res.areas;
    })
    this._us.listarAdministrador().then((res:any)=>{
      this.usuarios = res.administradores;
      this.usuarios.forEach(f=>{
        f.area = f.area ? f.area.nombre : f.area;
      })
      this.source = new LocalDataSource(this.usuarios);
      this.filterSource = new LocalDataSource(this.usuarios);
      this.alertSource = new LocalDataSource(this.usuarios);
    }).catch(err=>{})
  }

  onUpdateConfirm(event):void{
    this.form2.controls['nombre'].setValue(event.newData.nombre)
    this.form2.controls['apellido'].setValue(event.newData.apellido)
    this.form2.controls['area'].setValue(event.newData.area)
    this.form2.controls['_id'].setValue(event.newData._id)
    this.form2.controls['email'].setValue(event.newData.email)
    if(this.form2.valid){
      this._us.actualizarAdminDashboard(this.form2.value).then(r=>{
        this.areas.forEach(s=>{
          if(s._id == event.newData.area){
            event.newData.area = s.nombre;
          }
        })
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
