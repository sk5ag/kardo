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
    // console.log('Getting all appointments...')
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


  async insertAppointment(appointment){

    // console.log('insert function called...', appointment);
    var docRef = await this.db.collection('appointments').add(appointment)
      .then(function (docRef){
        // console.log('What to do with this docRef', docRef.id);
        docRef.update({
          id: docRef.id
        })
      });
    // console.log('Document Reference is: ', docRef);
  }

  updateAppointment(appointment){
    // console.log('UPDATE METHOD CALLED - Recieved id for update', appointment.id);
    this.db.collection('appointments').doc(appointment.id).update(appointment)
  }
  // updateAppointment(appointment){
  //   console.log('Document ID to be updated: ', appointment.id)
  //   this.db.doc('appointments/${appointment.id}').update({
  //     appointmentId: appointment.id,
  //     appointmentDoctor: appointment.appointmentDoctor,
  //     patientName: appointment.patientName,
  //     patientAge: appointment.patientAge,
  //     patientGender: appointment.patientGender,
  //     patientMobile: appointment.patientMobile,
  //     isWaiting: appointment.isWaiting
  //   });
  //   // this.getAppointments();
  // }

  deleteAppointment(appointment){
    console.log('SERVICE - this key received for deleting the records', appointment.$key);
    // this.db.collection('appointments').doc(appointment.id).delete();
    // this.db.doc(appointment.id).delete().catch(error => console.log(error))
  }


  populateForm(row){
    // console.log('POPULATE - the id received was: ', row.id);
    // console.log('POPULATE - the row received was: ', row.patientName);
    // console.log('POPULATE - the id received was: ', row.patientAge);
    // console.log('POPULATE - the row received was: ', row.patientGender);
    this.form.patchValue(
       {
       id: row.id,
    //   currentDate: '',
    //   clinicName: '',
    //   userName: '',
    //   appointmentStatus: '',
    //   appointmentDate: '',
       appointmentDoctor: row.appointmentDoctor,
       patientName: row.patientName,
       patientAge: row.patientAge,
       patientGender: row.patientGender,
       patientMobile: row.patientMobile,
       isWaiting: row.isWaiting
     }
    );
    // console.log('POPULATE - Form value after edit button click: ', this.form.value)
  }
}
