import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

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
    patientName: new FormControl('', Validators.required),
    patientAge: new FormControl('', Validators.required),
    patientGender: new FormControl('1'),
    patientMobile: new FormControl('', [Validators.minLength(11),Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]),
    patientBloodGroup: new FormControl(''),
    patientLongtermIllness: new FormControl(''),
    patientLongtermMedicine: new FormControl(''),
    visitShortDescription: new FormControl(''),
    isClosed: new FormControl(false)
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
      patientMobile: '',
      patientBloodGroup: '',
      patientLongtermIllness: '',
      patientLongtermMedicine: '',
      visitShortDescription: '',
      isClosed: false
    });
  }

}