import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderEditService {
  constructor(){ }

  private subject = new BehaviorSubject('');

  sendMessage(orderArray: string):void {
    console.log(orderArray)
    this.subject.next(orderArray);
  }

  clearMessages():void {

      this.subject.next('');
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }    
  }

