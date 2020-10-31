import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitEditService {
  constructor(){}

  private subject = new BehaviorSubject('');

  sendMessage(message: string):void {
    console.log(message)
    this.subject.next(message);
  }

  clearMessages():void {

      this.subject.next('');
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }    
  }

