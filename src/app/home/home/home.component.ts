import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/services/user/user.service';
import { ChartOptions, ChartType, ChartDataSets,ChartPluginsOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet,PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[UserService]
})
export class HomeComponent implements OnInit {
  solicitudes;
  completados;
  pendientes;
  cancelados;
  curso;
  mostrar;
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
    "radius": 40,
      "outerStrokeWidth": 8,
      titleFontSize:'40',
      "showSubtitle": false,
      "startFromZero": true,
      renderOnClick:false
  }
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {
      beginAtZero: true,}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public colorusuarios = [
    { // dark grey
      backgroundColor: '#3b8432',
     
    },
    { // dark grey
      backgroundColor: '#cee239c7',
     
    },
    { // dark grey
      backgroundColor: '#427be8',
     
    },
    { // dark grey
      backgroundColor: '#93b0e8',
     
    },
  ];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Requerimientos Ingresados' },
    { data: [], label: 'Requerimientos En proceso' },
    { data: [], label: 'Requerimientos Finalizadas por requerimiento resuelto' },
    { data: [], label: 'Requerimientos Finalizado por requerimiento sin solución' },
  ];
  tiempo = {inicio:0,intermedio:0,final:0}
  usuarios;
  areas;
  areaSelect = 'Todo'
  cargando = false;
  mostrarArea = false;
  infoGeneral = {total:0,enviado:0,enproceso:0,finalizadoResuelto:0,finalizadoSinSolucion:0}
  constructor(public _us:UserService) { 
    // this._us.valida().then(()=>{}).catch(()=>{this._us.limpiar()})
  }

  ngOnInit() {
    this.iniciar();
    this.refresh();
  }

  modFecha(fecha){
    var fec = new Date(fecha);
    return fec.getFullYear()+'-'+(String(fec.getMonth() + 1).length < 2 ? '0'+String(fec.getMonth() + 1) : (fec.getMonth() + 1))+'-'+(String(fec.getDate()).length < 2 ? '0'+String(fec.getDate()) : (fec.getDate()))
  }

  filtrar(){
    this.mostrar = false;
    this.infoGeneral = {total:0,enviado:0,enproceso:0,finalizadoResuelto:0,finalizadoSinSolucion:0}
    this.tiempo = {inicio:0,intermedio:0,final:0}
    if(this.areaSelect == 'Todo'){
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
        fechas.push(this.modFecha(f.create_at))
        if(f.fechaEnProceso){
          fechas.push(this.modFecha(f.fechaEnProceso))
        }
        if(f.fechaCierre){
          fechas.push(this.modFecha(f.fechaCierre))
        }
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
      this.barChartLabels = fechas;
      this.barChartData[0].data = data[0];
      this.barChartData[1].data = data[1];
      this.barChartData[2].data = data[2];
      this.barChartData[3].data = data[3];
      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: 'bottom' },
        scales: { xAxes: [{gridLines: {
          display:true,
          color:'#ffffff24'
      }}], yAxes: [{ticks: {
          beginAtZero: true,
          max:Number(this.infoGeneral.total) + 1,
        },gridLines: {
          display:true,
          color:'#ffffff24'
      }}],  },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        },
      };
      this.infoGeneral.enviado = (this.infoGeneral.enviado/this.infoGeneral.total)*100
      this.infoGeneral.enproceso = (this.infoGeneral.enproceso/this.infoGeneral.total)*100
      this.infoGeneral.finalizadoResuelto = (this.infoGeneral.finalizadoResuelto/this.infoGeneral.total)*100
      this.infoGeneral.finalizadoSinSolucion = (this.infoGeneral.finalizadoSinSolucion/this.infoGeneral.total)*100
      this.mostrar = true;
    }else{
      var usu = [];
      this.usuarios.forEach(u=>{
        u.soli = u.solicitud.nombre
        u.us = u.usuario;
        u.usuario = u.usuario ? u.usuario.nombre+' '+u.usuario.apellido : ''
        if(this.areaSelect == u.solicitud.area._id){
          usu.push(u)
        }
      })
      this.infoGeneral.total = usu.length;
      var fechas = []
      var data = [[],[],[],[]]
      this.infoGeneral.total = usu.length;
      usu.forEach(f=>{
        this.infoGeneral.enviado = f.estado == 'Recepcionado' ? this.infoGeneral.enviado + 1 : this.infoGeneral.enviado;
        this.infoGeneral.enproceso = f.estado == 'En proceso' ? this.infoGeneral.enproceso + 1 : this.infoGeneral.enproceso;
        this.infoGeneral.finalizadoResuelto =  f.estado == 'Finalizado por requerimiento resuelto' ? this.infoGeneral.finalizadoResuelto + 1 : this.infoGeneral.finalizadoResuelto;
        this.infoGeneral.finalizadoSinSolucion = f.estado == "Finalizado por requerimiento sin solución" ? this.infoGeneral.finalizadoSinSolucion + 1 : this.infoGeneral.finalizadoSinSolucion;
        fechas.push(this.modFecha(f.create_at))
        if(f.fechaEnProceso){
          fechas.push(this.modFecha(f.fechaEnProceso))
        }
        if(f.fechaCierre){
          fechas.push(this.modFecha(f.fechaCierre))
        }
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
      usu.forEach(u=>{
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
        this.tiempo.intermedio = (u.color == '#d628289e') ? this.tiempo.intermedio  + 1 : this.tiempo.intermedio;
        this.tiempo.final = (u.color == '#c30c0c') ? this.tiempo.final  + 1 : this.tiempo.final;
      })
      this.barChartLabels = fechas;
      this.barChartData[0].data = data[0];
      this.barChartData[1].data = data[1];
      this.barChartData[2].data = data[2];
      this.barChartData[3].data = data[3];
      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: 'bottom' },
        scales: { xAxes: [{}], yAxes: [{ticks: {
          beginAtZero: true,
          max:Number(this.infoGeneral.total) + 1,
        }}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        },
      };
      this.infoGeneral.enviado = (this.infoGeneral.enviado/this.infoGeneral.total)*100
      this.infoGeneral.enproceso = (this.infoGeneral.enproceso/this.infoGeneral.total)*100
      this.infoGeneral.finalizadoResuelto = (this.infoGeneral.finalizadoResuelto/this.infoGeneral.total)*100
      this.infoGeneral.finalizadoSinSolucion = (this.infoGeneral.finalizadoSinSolucion/this.infoGeneral.total)*100
      this.mostrar = true;
    }
  }

  refresh(){
    this.mostrar = false;
    if(this._us.getIdentity().role == 'ROLE_USER'){
      this._us.getSolicitudesArea(this._us.getIdentity().area).then((res:any)=>{
        this.usuarios = res.solicitudes;
        this.filtrar()
      })
    }else{
      this._us.getSolicitudes().then((res:any)=>{
        this.usuarios = res.solicitudes;
        this.filtrar()
      })
    }
  }

  iniciar(){
    this._us.getArea().then((res:any)=>{
      this.areas = [{_id:'Todo',nombre:'Todo'}];
      this.areas = this.areas.concat(res.areas)
    })
  }

}
