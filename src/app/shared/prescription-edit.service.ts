import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionEditService {
  constructor() { }
  private subject = new BehaviorSubject('');
  sendMessage(prescriptionArray: string):void {
    console.log(prescriptionArray)
    this.subject.next(prescriptionArray);
  }
  clearMessages():void {
      this.subject.next('');
  }
  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }  
}