import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
 

  messages: "";
  message: BehaviorSubject<String>;

  constructor(public http: HttpClient) {
    this.message = new BehaviorSubject(this.messages)

  }

  nextmessage(data) {
    this.message.next(data);
  }
}
