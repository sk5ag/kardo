import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Appointment } from '../Modal/appointments';
import { AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';

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
    id: new FormControl('null'),
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
      id: null,
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
    return this.db.collection('appointments').snapshotChanges()

  }

  async insertAppointment(appointment){

    await this.db.collection('appointments').add(appointment)
      .then(function (docRef){
        docRef.update({
          id: docRef.id
        })
      });
  }

  updateAppointment(appointment){
    this.db.collection('appointments').doc(appointment.id).update(appointment).then(function() {
      console.log("Document successfully updated!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  deleteAppointment(docId){
    this.db.collection('appointments').doc(docId).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }


  populateForm(row){

    this.form.patchValue(
       {
       id: row.id,
       appointmentDoctor: row.appointmentDoctor,
       patientName: row.patientName,
       patientAge: row.patientAge,
       patientGender: row.patientGender,
       patientMobile: row.patientMobile,
       isWaiting: row.isWaiting
     }
    );
  }
}
