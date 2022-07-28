import { throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	constructor(private http: HttpClient) { }

	public getData() {
		const URL: string = '../../../../assets/data/main-menu.json';
		return this.http.get(URL);
	}
	public getDataAdmin() {
		const URL: string = '../../../../assets/data/main-menu-ad.json';
		return this.http.get(URL);
	}
	public getDataUser() {
		const URL: string = '../../../../assets/data/main-menu-user.json';
		return this.http.get(URL);
	}
	public getDataAlcalde() {
		const URL: string = '../../../../assets/data/main-menuAlcalde.json';
		return this.http.get(URL);
	}

	public handleError(error: any) {
		return observableThrowError(error.error || 'Server Error');
	}
}
