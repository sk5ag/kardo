import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Appointment } from '../Modal/appointments';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentsCollection: AngularFirestoreCollection<Appointment>;
  appointments: Observable<Appointment>;
  collectionPath: string = "/appointments";

  constructor(private db: AngularFirestore) {
    this.appointmentsCollection = this.db.collection(this.collectionPath)
   }

   appointmentList: AngularFireList<any>;


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    currentDate: new FormControl(''),
    clinicName: new FormControl(''),
    userName: new FormControl(''),
    appointmentStatus: new FormControl(''),
    appointmentDate: new FormControl(''),
    appointmentDoctor: new FormControl('', Validators.required),
    patientName: new FormControl('', Validators.required),
    patientAge: new FormControl('', Validators.required),
    patientGender: new FormControl('1'),
    patientMobile: new FormControl('', [Validators.minLength(11),Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]),
    isWaiting: new FormControl(false)
  })

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      currentDate: '',
      clinicName: '',
      userName: '',
      appointmentStatus: '',
      appointmentDate: '',
      appointmentDoctor: '',
      patientName: '',
      patientAge: '',
      patientGender: '1',
      patientMobile: '',
      isWaiting: false
    });
  }


  getAppointments(){
    console.log('Getting all appointments...')
    return this.db.collection('appointments').snapshotChanges()
      // .subscribe(snaps => {
      //   const array = snaps.map(snap =>{
      //     return{
      //       id: snap.payload.doc.id,
      //       ...snap.payload.doc.data() as Appointment
      //     } 
      //   }) 
      //   console.log('Appointments have been collected from the firestore', array)
      // });
  }


  insertTest(appointment: Appointment){

    console.log('insert function called...')
    this.appointmentsCollection.add(appointment)
    console.log('data has been submitted to database ...')
  }

  updateTest(test){

  }

  deleteEmployee($key: string){
  }
}
