import { Component, OnInit } from '@angular/core';

import { IMenuItem } from './menu-item';
import { MenuService } from './menu.service';
import { UserService } from 'app/servicios/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService,UserService],
  host: {
    'class': 'app-menu'
  }
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[];
  expectedRole
  constructor( private menuService: MenuService, private userService:UserService,public Router: Router) { 
    let identity = this.userService.getIdentity();
    this.expectedRole =  identity.role;
  }

  getMenuItems(): void {
		const OBSERVER = {
			next: x => this.menuItems = x,
			error: err => this.menuService.handleError(err)
    }
    // this.menuService.getData().subscribe(OBSERVER);

    if(this.expectedRole == 'ROL_SUPER_ADMIN'){
      this.menuService.getData().subscribe(OBSERVER);
    }
    if(this.expectedRole == 'ROLE_ADMIN'){
      this.menuService.getDataAdmin().subscribe(OBSERVER);
    }
    if(this.expectedRole == 'ROLE_ALCALDE'){
      this.menuService.getDataAlcalde().subscribe(OBSERVER);
    }
    if(this.expectedRole == 'ROLE_USER'){
      this.menuService.getDataUser().subscribe(OBSERVER);
    }
  }

  getLiClasses(item: any, isActive: any) {
    return {
      'has-sub': item.sub,
      'active': item.active || isActive,
      'menu-item-group': item.groupTitle,
      'disabled': item.disabled
    };
  }
  getLiClasses2(item: any, isActive: any) {
    return {
      'has-sub': item.sub,
      'active': item.active || isActive,
      'menu-item-group': item.groupTitle,
      'disabled': item.disabled
    };
  }
  getStyles(item: any) {
    return {
      'background': item.bg,
      'color': item.color
    };
  }
  getStyles2(item: any) {
    return {
      'background': item.bg,
      'color': item.color
    };
  }
  ngOnInit(): void {
    this.getMenuItems();
  }

  toggle(event: Event, item: any, el: any) {
    event.preventDefault();

    let items: any[] = el.menuItems;

    if (item.active) {
      item.active = false;
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
      }
      item.active = true;
    }

  }
  toggle2(event: Event, item: any, el: any) {
    event.preventDefault();
    let items: any[] = el.sub;

    if (item.active) {
      item.active = false;
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
      }
      item.active = true;
    }
  }
}
