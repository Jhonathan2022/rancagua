import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../../servicios/services/user/user.service';
import * as alertFunction from '../../../servicios/data/sweet-alerts';
import { Router } from "@angular/router";
import {MatTableDataSource} from '@angular/material/table';
import { LocalDataSource } from 'ng2-smart-table';
import swal from 'sweetalert2';
import { CustomEditorAreasComponent } from './custom-editor-sucursal.component';

const BREADCRUMBS: any[] = [
  {
    title: 'Administración',
    link: ''
  },
  {
    title: 'Tipo de Solicitud',
    link: ''
  },
];
@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {
  public form: FormGroup;
  public form2: FormGroup;
  breadcrumb: any[] = BREADCRUMBS;
  cargando2 = false;
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
      delete: {
        deleteButtonContent: '<i class="fa fa-trash" style="color:red !important;"></i>',
        confirmDelete: true,
      },
      columns: {
        nombre: {
          title: 'Tipo de Solicitud',
          type: 'string',
          editable:true,
        },
        area: {
          title: 'Area',
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
        },
      },
    };
    areas;
    tipos;

    constructor(private fb: FormBuilder,public _us: UserService) {
      this.form = this.fb.group({
        nombre: ['', Validators.compose([Validators.required])],
        area: ['', Validators.compose([Validators.required])],
      });
      this.form2 = this.fb.group({
        nombre: ['', Validators.compose([Validators.required])],
        _id: ['', Validators.compose([Validators.required])],
        area: [null, Validators.compose([Validators.required])],
      });
     }
  
    ngOnInit() {
      this._us.getArea().then((res:any)=>{
        this.areas = res.areas;
      })
      this._us.getTipoSolicitud().then((res:any)=>{
        this.tipos = res.tipos;
        this.tipos.forEach(f=>{
          f.area = f.area ? f.area.nombre : f.area;
        })
        this.source = new LocalDataSource(this.tipos);
        this.filterSource = new LocalDataSource(this.tipos);
        this.alertSource = new LocalDataSource(this.tipos);
      })
    }

    
  
    onSubmit(formDirective){
      this.form.disable()
      this._us.createTipoSolicitud(this.form.value).then(r=>{
        this.form.enable()
        this.form.reset()
        formDirective.resetForm()
        swal.fire("Tipo de Solicitud registrada", "Se ha registrado con exito el Tipo de Solicitud", "success");
        this._us.getTipoSolicitud().then((res:any)=>{
          this.tipos = res.tipos;
          this.tipos.forEach(f=>{
            f.area = f.area ? f.area.nombre : f.area;
          })
          this.source = new LocalDataSource(this.tipos);
          this.filterSource = new LocalDataSource(this.tipos);
          this.alertSource = new LocalDataSource(this.tipos);
        })
      }).catch(err=>{
        if(err.error.exite){
          swal.fire("Error al registrar", "Ya existe un Tipo de Solicitud con este nombre", "warning");
        }else{
          if(err.error.exite2){
            swal.fire("Error al registrar", "Ya existe un área con este email", "warning");
          }else{
            swal.fire("Error al registrar", "No se pudo registrar el Tipo de Solicitud", "warning");
          }
        }
        this.form.enable()
      })
    }

    onUpdateConfirm(event):void{
      this.form2.controls['nombre'].setValue(event.newData.nombre)
      this.form2.controls['_id'].setValue(event.newData._id)
      this.form2.controls['area'].setValue(event.newData.area)
      // console.log(this.form2.value)
      if(this.form2.valid){
        this._us.putTipoSolicitud(this.form2.value).then(r=>{
          event.confirm.resolve(event.newData);
          this.form2.reset()
          swal.fire("Tipo Solicitud actualizada", "Se ha actualizado con exito la solicitud", "success");
        }).catch(err=>{
          swal.fire("Error al actualizar", "No se ha podido actualizar la solicitud", "warning");
          this.form2.reset()
        })
      }else{
        swal.fire("Error al actualizar", "Revise que exista un nombre y un área seleccionada", "warning");
        this.form2.reset()
      }
    }

    delete(event):void{
        this._us.deleteTipoSolicitud(event.data._id).then(r=>{
          event.confirm.resolve(event.newData);
          this.form2.reset()
          swal.fire("Solicitud eliminada", "Se ha eliminado con exito", "success");
        }).catch(err=>{
          swal.fire("Error al elinminar", "No se ha podido actualizeliminarar", "warning");
          this.form2.reset()
        })
    }

}
