import { Component, OnInit, NgZone,AfterContentInit } from '@angular/core';
import { UserService } from '../../servicios/services/user/user.service';
import { MapsAPILoader,AgmMap } from '@agm/core';
import * as alertFunction from '../../servicios/data/sweet-alerts';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  providers:[UserService]
})
export class MapaComponent implements OnInit, AfterContentInit {
  latitude: number = -33.4726900;
  longitude: number = -70.6472400; 
  zoom: number = 11;
  markers:any = [];
  data;
  public recepcionado = {
    url: require('assets/img/1.png'), 
    scaledSize: {
      height: 40,
      width: 40,
    }
  };
  public proceso = {
    url: require('assets/img/2.png'), 
    scaledSize: {
      height: 40,
      width: 40,
    }
  };
  public finalizadoSolucion = {
    url: require('assets/img/3.png'), 
    scaledSize: {
      height: 40,
      width: 40,
    }
  };
  public finalizadoSinSolucion = {
    url: require('assets/img/4.png'), 
    scaledSize: {
      height: 40,
      width: 40,
    }
  };
  map;
  constructor(public _us:UserService,private socket: Socket,
    private mapsAPILoader: MapsAPILoader,public ngZone: NgZone) { }

    ngOnInit() {
      this.refresh()
      this.socket.fromEvent('recargar').subscribe((data:any) => {
        if(data.recargar){
          this.refresh()
        }
      })
    }

    onMapReady(map?: google.maps.Map) {
      if (map)
      this.map = map;
        this.map.setOptions({
          streetViewControl: false,
          zoomControl: true,
          fullscreenControl: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ]
        });
    }

    ngAfterContentInit(): void {
      this.mapsAPILoader.load().then(() => {
       
      });
    }
    info(marker){
      // console.log(marker)
      this.data = marker;
      this.map.setOptions({
        center: {lat: marker.lat, lng: marker.lng},
        zoom:17,
      });
    }
    refresh(){
      this._us.getSolicitudes().then((res:any)=>{
        this.markers = res.solicitudes;
        this.latitude = -33.4726900;
        this.longitude = -70.6472400; 
        this.zoom = 11;
        this.map.setOptions({
          center: {lat: this.latitude, lng: this.longitude},
          zoom:this.zoom,
        });
      })
    }
}
