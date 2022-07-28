import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../../servicios/services/user/user.service';
import * as alertFunction from '../../../servicios/data/sweet-alerts';
import { Router } from "@angular/router";
import {MatTableDataSource} from '@angular/material/table';
import { LocalDataSource } from 'ng2-smart-table';
import swal from 'sweetalert2';

const BREADCRUMBS: any[] = [
  {
    title: 'Administración',
    link: ''
  },
  {
    title: 'Área',
    link: ''
  },
];
@Component({
  selector: 'app-crear-area',
  templateUrl: './crear-area.component.html',
  styleUrls: ['./crear-area.component.scss'],
  providers:[UserService]
})
export class CrearAreaComponent implements OnInit {
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
      delete: null,
      columns: {
        nombre: {
          title: 'Área',
          type: 'string',
          editable:true,
        },
        email: {
          title: 'Email',
          type: 'string',
          editable:true,
        },
        solicitudes: {
          title: 'Solicitudes',
          type: 'string',
          editable:false,
        },
      },
    };
    areas;
  constructor(private fb: FormBuilder,public _us: UserService) {
    this.form = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    });
    this.form2 = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      _id: ['', Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    });
   }

  ngOnInit() {
    this._us.getArea().then((res:any)=>{
      this.areas = res.areas;
      this.source = new LocalDataSource(this.areas);
      this.filterSource = new LocalDataSource(this.areas);
      this.alertSource = new LocalDataSource(this.areas);
    })
  }

  onSubmit(formDirective){
    this.form.disable()
    this._us.createArea(this.form.value).then(r=>{
      this.form.enable()
      this.form.reset()
      formDirective.resetForm()
      swal.fire("Área registrada", "Se ha registrado con exito el área", "success");
      this._us.getArea().then((res:any)=>{
        this.areas = res.areas;
        this.source = new LocalDataSource(this.areas);
        this.filterSource = new LocalDataSource(this.areas);
        this.alertSource = new LocalDataSource(this.areas);
      })
    }).catch(err=>{
      if(err){
        if(err.error.existe){
          swal.fire("Error al registrar", "Ya existe un área con este nombre", "warning");
        }else{
          if(err.error.existe2){
            swal.fire("Error al registrar", "Ya existe un área con este email", "warning");
          }else{
            swal.fire("Error al registrar", "No se pudo registrar el área", "warning");
          }
        }
      }else{
        swal.fire("Error al registrar", "No se pudo registrar el área", "warning");
      }
      
      this.form.enable()
    })
  }
  onUpdateConfirm(event):void{
    this.form2.controls['nombre'].setValue(event.newData.nombre)
    this.form2.controls['_id'].setValue(event.newData._id)
    this.form2.controls['email'].setValue(event.newData.email)
    if(this.form2.valid){
      this._us.putArea(this.form2.value).then(r=>{
        event.confirm.resolve(event.newData);
        this.form2.reset()
        swal.fire("Área actualizada", "Se ha actualizado con exito el área", "success");
      }).catch(err=>{
        swal.fire("Error al actualizar", "No se ha podido actualizar el área", "warning");
        this.form2.reset()
      })
    }else{
      swal.fire("Error al actualizar", "Revise que exista un nombre de área y que sea un correo valido", "warning");
      this.form2.reset()
    }
  }
}
