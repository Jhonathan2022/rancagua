import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../servicios/services/user/user.service';
import { ChartOptions, ChartType, ChartDataSets,ChartPluginsOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet,PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts'
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { Socket } from 'ng-socket-io';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-general-alcalde',
  templateUrl: './general-alcalde.component.html',
  styleUrls: ['./general-alcalde.component.scss'],
  providers:[UserService]
})
export class GeneralAlcaldeComponent implements OnInit {
  areas;
  @ViewChild('sorter1') sort: MatSort;
  @ViewChild('MatPaginator2') paginator: MatPaginator;
  dataSource:any;
  mostrar = false;
  usuarios;
  cargando = false;
  mostrarArea = false;
  infoGeneral = {total:0,enviado:0,enproceso:0,finalizadoResuelto:0,finalizadoSinSolucion:0}
  tiempo = {inicio:0,intermedio:0,final:0}
  optionsA = {
    "radius": 50,
      "outerStrokeWidth": 8,
      titleFontSize:'30',
      "showSubtitle": false,
      "startFromZero": true,
      renderOnClick:false
  }
  options = {
    "radius": 120,
      "outerStrokeWidth": 8,
      titleFontSize:'45',
      "showSubtitle": false,
      "startFromZero": true,
      renderOnClick:false
  }
  optionsB = {
    "radius": 30,
      "outerStrokeWidth": 8,
      titleFontSize:'20',
      "showSubtitle": false,
      "startFromZero": true,
      renderOnClick:false
  }
  displayedColumns: string[] = ['area','contador', 'recepcionado','proceso','finalizadoResuelto','finalizadoSinSolucion'];
  constructor(public _us:UserService,public socket:Socket) {
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
    this._us.getSolicitudesResumen().then((res:any)=>{
     this.areas = res.final;
     this.usuarios = res.solicitudes;
    //  console.log(this.areas)
     this.dataSource = new MatTableDataSource(this.areas);
     this.dataSource.paginator = this.paginator;
     this.dataSource.paginator._intl.itemsPerPageLabel  = 'Áreas por página'
     this.dataSource.sort = this.sort;

     this.usuarios.forEach(u=>{
      u.soli = u.solicitud.nombre
      u.us = u.usuario;
      u.usuario = u.usuario ? u.usuario.nombre+' '+u.usuario.apellido : ''
    })
    this.infoGeneral.total = this.usuarios.length;
    var fechas = []
    var data = [[],[],[],[]]
    this.infoGeneral.total = this.usuarios.length;
    this.usuarios.forEach(f=>{
      this.infoGeneral.enviado = f.estado == 'Recepcionado' ? this.infoGeneral.enviado + 1 : this.infoGeneral.enviado;
      this.infoGeneral.enproceso = f.estado == 'En proceso' ? this.infoGeneral.enproceso + 1 : this.infoGeneral.enproceso;
      this.infoGeneral.finalizadoResuelto =  f.estado == 'Finalizado por requerimiento resuelto' ? this.infoGeneral.finalizadoResuelto + 1 : this.infoGeneral.finalizadoResuelto;
      this.infoGeneral.finalizadoSinSolucion = f.estado == "Finalizado por requerimiento sin solución" ? this.infoGeneral.finalizadoSinSolucion + 1 : this.infoGeneral.finalizadoSinSolucion;
    })
    const result = fechas.reduce((acc,item)=>{
      if(!acc.includes(item)){
        acc.push(item);
      }
      return acc;
    },[])
    fechas = result.sort();
    fechas.forEach(f=>{
      data[0].push(null)
      data[1].push(null)
      data[2].push(null)
      data[3].push(null)
    })
    this.usuarios.forEach(u=>{
      fechas.forEach((f,i)=>{
        if(u.create_at.includes(f)){
          data[0][i]++;
        }
        if(u.fechaEnProceso && u.fechaEnProceso.includes(f)){
          data[1][i]++;
        }
        if(u.fechaCierre && u.fechaCierre.includes(f) && u.estado == "Finalizado por requerimiento resuelto"){
          data[2][i]++;
        }
        if(u.fechaCierre && u.fechaCierre.includes(f) && u.estado == 'Finalizado por requerimiento sin solución'){
          data[3][i]++;
        }
      })
      this.tiempo.inicio = (u.color == '#43b535') ? this.tiempo.inicio  + 1 : this.tiempo.inicio;
      this.tiempo.intermedio = (u.color == '#ceb822') ? this.tiempo.intermedio  + 1 : this.tiempo.intermedio;
      this.tiempo.final = (u.color == '#c30c0c') ? this.tiempo.final  + 1 : this.tiempo.final;
    })
  
    this.infoGeneral.enviado = (this.infoGeneral.enviado/this.infoGeneral.total)*100
    this.infoGeneral.enproceso = (this.infoGeneral.enproceso/this.infoGeneral.total)*100
    this.infoGeneral.finalizadoResuelto = (this.infoGeneral.finalizadoResuelto/this.infoGeneral.total)*100
    this.infoGeneral.finalizadoSinSolucion = (this.infoGeneral.finalizadoSinSolucion/this.infoGeneral.total)*100


     this.mostrar = true;
    })
  }

}
