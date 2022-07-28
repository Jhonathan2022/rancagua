import { UserService } from '../../servicios/services/user/user.service';
import { Router } from "@angular/router";
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import * as alertFunction from '../../servicios/data/sweet-alerts';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import swal from 'sweetalert2';
import { Socket } from 'ng-socket-io';
import { CircleProgressComponent, CircleProgressOptions } from 'ng-circle-progress';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx'; 
const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const BREADCRUMBS: any[] = [
  {
    title: 'Administración',
    link: ''
  },
  {
    title: 'Gestionar Solicitudes',
    link: ''
  },
];

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
  providers:[UserService]
})
export class SolicitudesComponent implements OnInit {
  breadcrumb: any[] = BREADCRUMBS;
  @ViewChild('sorter1') sort: MatSort;
  @ViewChild('MatPaginator2') paginator: MatPaginator;
  dataSource:any;
  cargando = false;
  usuarios;
  optionsA = {
    "radius": 50,
      "outerStrokeWidth": 8,
      titleFontSize:'30',
      "showSubtitle": false,
      "startFromZero": true
  }
  options = {
    "radius": 70,
      "outerStrokeWidth": 8,
      titleFontSize:'45',
      "showSubtitle": false,
      "startFromZero": true
  }
  mostrar = false;
  displayedColumns: string[] = ['tiempo','numero', 'nombre','soli','requerimiento','fecha','estado','usuario','acciones'];
  constructor(public _us: UserService,public dialog: MatDialog,public socket:Socket) { 
    // this.socket.connect()
    this.socket.fromEvent('recargar').subscribe((data:any) => {
      if(data.recargar){
        this.refresh()
      }
    })
  }

  ngOnInit() {
   this.refresh()
  }

  refresh(){
    this.mostrar = false;
    if(this._us.getIdentity().role == 'ROLE_USER'){
      this._us.getSolicitudesArea(this._us.getIdentity().area).then((res:any)=>{
        this.usuarios = res.solicitudes;
        this.usuarios.forEach(u=>{
          u.soli = u.solicitud.nombre
          u.us = u.usuario;
          u.usuario = u.usuario ? u.usuario.nombre+' '+u.usuario.apellido : ''
        })
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel  = 'Requerimientos por página'
        this.dataSource.sort = this.sort;
        this.mostrar = true;
      })
    }else{
      this._us.getSolicitudes().then((res:any)=>{
        this.usuarios = res.solicitudes;
        this.usuarios.forEach(u=>{
          u.soli = u.solicitud.nombre
          u.us = u.usuario;
          u.usuario = u.usuario ? u.usuario.nombre+' '+u.usuario.apellido : ''
        })
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel  = 'Requerimientos por página'
        this.dataSource.sort = this.sort;
        this.mostrar = true;
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, excelFileName);
    const data: Blob = new Blob([excelBuffer], {type: EXCEL_TYPE});
    fileSaver.saveAs(data, excelFileName+ EXCEL_EXTENSION);
    this.cargando = false;
    alertFunction.typeSuccesDescarga();
  }

  modFecha(fecha){
    var fec = new Date(fecha)
    return fec.getFullYear()+'-'+(String(fec.getMonth() + 1).length == 1 ? '0'+String(fec.getMonth() + 1) : String(fec.getMonth() + 1))+'-'+(String(fec.getDate()).length == 1 ? '0'+String(fec.getDate()) : String(fec.getDate()))+' '+(String(fec.getHours()).length == 1 ? '0'+String(fec.getHours()) : String(fec.getHours()))+':'+(String(fec.getMinutes()).length == 1 ? '0'+String(fec.getMinutes()) : String(fec.getMinutes()))
  }
  descargar(){
    this.cargando = true;
    var array = []
    this.usuarios.forEach(u=>{
      array.push({'#':u.numero,area:u.solicitud.area.nombre,solicitud:u.soli,usuario:u.nombre,email:u.email,telefono:u.telefono,direccion:u.direccion,estado:u.estado,tiempo:u.tiempo,fecha_requerimiento:this.modFecha(u.create_at),requerimiento:u.requerimiento,
      encargado:u.usuario,fecha_en_proceso:(u.fechaEnProceso ? this.modFecha(u.fechaEnProceso) : ''),respuesta_en_proceso:u.respuestaProceso,encargado_cierre:(u.usuarioCierre ? u.usuarioCierre.nombre+' '+u.usuarioCierre.apellido : ''),fecha_cierre:(u.fechaCierre ? this.modFecha(u.fechaCierre) : ''),
      respuesta_cierre:u.respuestaFinalizado
    })
    })
    this.exportAsExcelFile(array,'Requerimientos')
  }
  

  ver(event){
    const dialogRef = this.dialog.open(VerRequerimiento, {
      data: {res:event}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  proceso(event){
    var dialogRef:any;
    if(event.estado == 'Recepcionado'){
      dialogRef = this.dialog.open(EditarRequerimientoProceso, {
        data: {res:event}
      });
    }else{
      if(this._us.getIdentity()._id == event.us || this._us.getIdentity()._id  == event.us._id || this._us.getIdentity().role == 'ROLE_ADMIN' || this._us.getIdentity().role == 'ROL_SUPER_ADMIN' ){
        dialogRef = this.dialog.open(FinalizarRequerimientoProceso, {
          data: {res:event}
        });
      }else{
        swal.fire("Acceso denegado", "Solo el administrador o el encargado del caso puede editar el estado de este requerimiento", "warning");
      }  
    }
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this._us.getIdentity().role == 'ROLE_USER'){
          this._us.getSolicitudesArea(this._us.getIdentity().area).then((res:any)=>{
            this.usuarios = res.solicitudes;
            this.usuarios.forEach(u=>{
              u.soli = u.solicitud.nombre
              u.us = u.usuario;
              u.usuario = u.usuario ? u.usuario.nombre+' '+u.usuario.apellido : ''
            })
            this.dataSource = new MatTableDataSource(this.usuarios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator._intl.itemsPerPageLabel  = 'Requerimientos por página'
            this.dataSource.sort = this.sort;
          })
        }else{
          this._us.getSolicitudes().then((res:any)=>{
            this.usuarios = res.solicitudes;
            this.usuarios.forEach(u=>{
              u.soli = u.solicitud.nombre
              u.us = u.usuario;
              u.usuario = u.usuario ? u.usuario.nombre+' '+u.usuario.apellido : ''
            })
            this.dataSource = new MatTableDataSource(this.usuarios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator._intl.itemsPerPageLabel  = 'Requerimientos por página'
            this.dataSource.sort = this.sort;
          })
        }
      }
    })
  }
}

export interface DialogData {
  res:any;
}

@Component({
  selector: 'dialog1-result',
  templateUrl: 'dialog2-result.html',
  styleUrls: ['./solicitudes.component.scss'],
  providers: [UserService]

})

export class VerRequerimiento {
  form2;
  editor = false;
  tipos;
  constructor(
    public dialogRef: MatDialogRef<VerRequerimiento>,
    public _us:UserService,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this._us.getTipoSolicitud().then((res:any)=>{
        this.tipos = res.tipos
      })
      this.form2 = this.fb.group({
        nombre: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
        rut: ['', Validators.compose([Validators.required,Validators.pattern("[0-9]{6,8}-[0-9|kK]{1}"),Validators.minLength(9),Validators.maxLength(10)])],
        direccion: ['', Validators.compose([Validators.required])],
        email:[null, Validators.compose([Validators.required, CustomValidators.email])],
        telefono: [null, Validators.compose([Validators.required,Validators.pattern('[0-9]+')])],
        requerimiento: ['', Validators.compose([Validators.required])],
        lat: ['', Validators.compose([Validators.required])],
        lng: ['', Validators.compose([Validators.required])],
        solicitud: ['', Validators.compose([Validators.required])],
        respuestaProceso: ['', Validators.compose([Validators.required])],
        respuestaFinalizado: ['', Validators.compose([Validators.required])],
        fechaEnProceso: ['', Validators.compose([Validators.required])],
        fechaCierre: ['', Validators.compose([Validators.required])],
        estado: ['', Validators.compose([Validators.required])],
        _id: ['', Validators.compose([Validators.required])],
      });
      if(data.res){
        this.editor = true;
        this.form2.controls['nombre'].setValue(data.res.nombre)
        this.form2.controls['rut'].setValue(data.res.rut)
        this.form2.controls['direccion'].setValue(data.res.direccion)
        this.form2.controls['_id'].setValue(data.res._id)
        this.form2.controls['email'].setValue((data.res.email))
        this.form2.controls['telefono'].setValue(data.res.telefono)
        this.form2.controls['requerimiento'].setValue(data.res.requerimiento)
        this.form2.controls['solicitud'].setValue(data.res.solicitud._id)
        this.form2.controls['respuestaProceso'].setValue(data.res.respuestaProceso)
        this.form2.controls['respuestaFinalizado'].setValue(data.res.respuestaFinalizado)
        this.form2.controls['fechaEnProceso'].setValue(data.res.fechaEnProceso)
        this.form2.controls['fechaCierre'].setValue(data.res.fechaCierre)
        this.form2.controls['estado'].setValue(data.res.estado)
      }else{
        this.editor = false;
      }
    }

   
  }

  @Component({
    selector: 'dialog3-result',
    templateUrl: 'dialog3-result.html',
    styleUrls: ['./solicitudes.component.scss'],
    providers: [UserService]
  
  })
  
  export class EditarRequerimientoProceso {
    form2;
    editor = false;
    tipos;
    cargando2 = false;
    constructor(
      public dialogRef: MatDialogRef<EditarRequerimientoProceso>,
      public _us:UserService,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this._us.getTipoSolicitud().then((res:any)=>{
          this.tipos = res.tipos
        })
        this.form2 = this.fb.group({
          nombre: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
          email:[null, Validators.compose([Validators.required, CustomValidators.email])],
          requerimiento: ['', Validators.compose([Validators.required])],
          solicitud: ['', Validators.compose([Validators.required])],
          respuestaProceso: ['', Validators.compose([Validators.required])],
          _id: ['', Validators.compose([Validators.required])],
        });
        if(data.res){
          this.editor = true;
          this.form2.controls['nombre'].setValue(data.res.nombre)
          this.form2.controls['_id'].setValue(data.res._id)
          this.form2.controls['email'].setValue((data.res.email))
          this.form2.controls['requerimiento'].setValue(data.res.requerimiento)
          this.form2.controls['solicitud'].setValue(data.res.solicitud._id)
        }else{
          this.editor = false;
        }
      }
  
      onSubmit(){
        if(this.form2.valid){
          this.cargando2 = true;
          this.form2.disable()
          this._us.changeProceso(this.form2.value).then((res:any)=>{
            swal.fire("Solicitud actualizada", "Se ha actualizado con exito la solicitud y enviado un correo electronico al vecino con la respuesta ingresada", "success");
            this.dialogRef.close({enviado:true})
            this.cargando2 = false;
            this.form2.enable()
          }).catch(err=>{
            this.cargando2 = false;
            this.form2.enable()
            swal.fire("Error al actualizar", "No se ha podido actualizar la solicutd, favor recargar e intentar nuevamente", "error");
          })
        }
      }
     
    }

    @Component({
      selector: 'dialog4-result',
      templateUrl: 'dialog4-result.html',
      styleUrls: ['./solicitudes.component.scss'],
      providers: [UserService]
    
    })
    
    export class FinalizarRequerimientoProceso {
      form2;
      editor = false;
      tipos;
      cargando2 = false;
      constructor(
        public dialogRef: MatDialogRef<FinalizarRequerimientoProceso>,
        public _us:UserService,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
          this._us.getTipoSolicitud().then((res:any)=>{
            this.tipos = res.tipos
          })
          this.form2 = this.fb.group({
            nombre: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            email:[null, Validators.compose([Validators.required, CustomValidators.email])],
            requerimiento: ['', Validators.compose([Validators.required])],
            solicitud: ['', Validators.compose([Validators.required])],
            respuestaFinalizado: ['', Validators.compose([Validators.required])],
            estado: ['', Validators.compose([Validators.required])],
            _id: ['', Validators.compose([Validators.required])],
          });
          if(data.res){
            this.editor = true;
            this.form2.controls['nombre'].setValue(data.res.nombre)
            this.form2.controls['_id'].setValue(data.res._id)
            this.form2.controls['email'].setValue((data.res.email))
            this.form2.controls['requerimiento'].setValue(data.res.requerimiento)
            this.form2.controls['solicitud'].setValue(data.res.solicitud._id)
          }else{
            this.editor = false;
          }
        }
    
        onSubmit(){
          if(this.form2.valid){
            this.cargando2 = true;
            this.form2.disable()
            this._us.finalizarRequerimiento(this.form2.value).then((res:any)=>{
              swal.fire("Solicitud finalizada", "Se ha finalizado con exito la solicitud y enviado un correo electronico al vecino con la respuesta ingresada", "success");
              this.dialogRef.close({enviado:true})
              this.cargando2 = false;
              this.form2.enable()
            }).catch(err=>{
              this.cargando2 = false;
              this.form2.enable()
              swal.fire("Error al finalizar", "No se ha podido finalziar la solicutd, favor recargar e intentar nuevamente", "error");
            })
          }
        }
       
      }