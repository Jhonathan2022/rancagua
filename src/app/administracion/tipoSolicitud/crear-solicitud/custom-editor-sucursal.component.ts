import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { UserService } from '../../../servicios/services/user/user.service';

@Component({
template: `

    <mat-select placeholder="Área" (click)="onClick.emit($event);" class="form-control bordes"  [ngClass]="inputClass" [name]="cell.getId()" [(ngModel)]="cell.newValue">
      <mat-option disabled="true">Selecciona Área</mat-option>
      <mat-option *ngFor="let item of areas" [value]="item._id">
        {{item.nombre}}
      </mat-option>
    </mat-select>

<div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
`,
})

  
export class CustomEditorAreasComponent extends DefaultEditor implements OnInit {

    @ViewChild('name') name: any;
    @ViewChild('url') url: ElementRef;
    @ViewChild('htmlValue') htmlValue: ElementRef;
    
    areas;
    constructor(dateTimeAdapter: DateTimeAdapter<any>,public _userService:UserService) {
      super();
    
    }
    
  
    ngOnInit() {
      this._userService.getArea().then((res:any)=>{
        this.areas = res.areas;
        this.areas.forEach(s=>{
          if(s.nombre == this.cell.newValue){
            this.cell.newValue = s._id;
          }
        })
      })
      
 }


   
 
  }