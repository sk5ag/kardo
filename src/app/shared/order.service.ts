import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    currentDate: new FormControl(''),
    clinicName: new FormControl(''),
    userName: new FormControl(''),
    appointmentStatus: new FormControl(''),
    appointmentDate: new FormControl(''),
    doctorName: new FormControl(''),

    doctorSig: new FormControl('', Validators.required),
    patientName: new FormControl(''),
    patientAge: new FormControl(''),
    patientGender: new FormControl('1'),

    orderTitle: new FormControl('', Validators.required),
    orderDescription: new FormControl(''),
    orderComment: new FormControl(''),
    isCompleted: new FormControl(false)
  })

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      currentDate: 'auto value',
      clinicName: 'auto value',
      userName: 'auto value',
      appointmentStatus: 'auto value',
      appointmentDate: '',
      doctorName: '',
      doctorSig: '',
      patientName: '',
      patientAge: '',
      patientGender: '1',
      orderTitle: '',
      orderDescription: '',
      orderComment: '',      
      isCompleted: false
    });

}
}
