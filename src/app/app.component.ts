import { Component } from '@angular/core';
import { UserService } from 'app/servicios/services/user/user.service';
import { CommonServiceService } from './common-service.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  providers:[UserService,CommonServiceService]
})
export class AppComponent {
  constructor(public _us:UserService, public _cs:CommonServiceService,public Router: Router){
    this._cs.message.subscribe(res=>{
      if(res == 'salir'){
        this.Router.navigate(['/inicio'])
      }
    })
  }
}
