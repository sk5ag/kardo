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

  constructor(
    private db: AngularFirestore) {
      this.appointmentsCollection = this.db.collection(this.collectionPath)
   }

   appointmentList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    id: new FormControl('null'),
    currentDate: new FormControl(''),
    clinicName: new FormControl(''),
    userName: new FormControl(''),
    appointmentStatus: new FormControl(false),
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
      appointmentStatus: false,
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

  changeClinic(appointment, myclinicName){
    //change the values of clinic here
    console.log('original clinic name: ', appointment.clinic);
    appointment.clinicName=myclinicName;
    console.log('new clinic name: ', appointment.clinicName);
  }

  changeUsername(appointment, myuserName){
    //change the values of username here
    //change the values of clinic here
    console.log('original clinic name: ', appointment.userName);
    appointment.userName=myuserName;
    console.log('new clinic name: ', appointment.userName);
  }

  changeStatusTrue(row){

    row.appointmentStatus = true;
    this.updateAppointment(row);
  }

  changeStatusFalse(row){

    row.appointmentStatus = false;
    this.updateAppointment(row);
  }

  changeWaitTrue(row){

    row.isWaiting = true;

    this.updateAppointment(row);

  }

  changeWaitFalse(row){

    row.isWaiting = false;

    this.updateAppointment(row);

  }

  async insertAppointment(appointment){

    await this.db.collection('appointments').add(appointment)
      .then(function (docRef){
        docRef.update({
          id: docRef.id,
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
       isWaiting: row.isWaiting,
       userName: row.userName,
     }
    );
  }
}
