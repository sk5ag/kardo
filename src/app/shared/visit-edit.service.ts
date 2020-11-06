import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitEditService {
  constructor(){}

  private subject = new BehaviorSubject('');

  sendMessage(visitArray: string):void {
    console.log(visitArray)
    this.subject.next(visitArray);
  }

  clearMessages():void {

      this.subject.next('');
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }    
  }

