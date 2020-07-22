import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { Visit } from '../Modal/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  visitsCollection: AngularFirestoreCollection<Visit>;
  visits: Observable<Visit>;
  collectionPath: string = "/visits";

  constructor(
    private db: AngularFirestore
  ) {
    this.visitsCollection = this.db.collection(this.collectionPath)
   } 

   visitList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    visitId: new FormControl(''),
    currentDate: new FormControl(''),
    createdDate: new FormControl(''),
    clinicName: new FormControl(''),
    doctorName: new FormControl(''),
    
    doctorSig: new FormControl('', Validators.required),

    patientName: new FormControl('', Validators.required),
    patientAge: new FormControl('', Validators.required),
    patientGender: new FormControl('1'),
    patientMobile: new FormControl('', [Validators.minLength(11),Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]),
    
    visitStatus: new FormControl(''),
    visitDate: new FormControl(''),
    visitDoctor: new FormControl(''),

    patientBloodGroup: new FormControl(''),
    patientLongtermIllness: new FormControl(''),
    patientLongtermMedicine: new FormControl(''),
    visitShortDescription: new FormControl(''),
    hasOrders: new FormControl(false),
    hasPrescriptions: new FormControl(false),
    isClosed: new FormControl(false)
  })

  initializeFormGroup(){
    this.form.setValue({
      id: null,
      visitId: '',
      currentDate: '',
      createdDate: '',
      clinicName: '',
      doctorName: '',
      
      doctorSig: '',
  
      patientName: '',
      patientAge: '',
      patientGender: '',
      patientMobile: '',
      
      visitStatus: '',
      visitDate: '',
      visitDoctor: '',

      patientBloodGroup: '',
      patientLongtermIllness: '',
      patientLongtermMedicine: '',
      visitShortDescription: '',
      hasOrders: false,
      hasPrescriptions: false,
      isClosed: false
    });
  }
  
  getVisits() {
    return this.db.collection('visits').snapshotChanges()
  }

  async insertVisit(visit) {
    console.log('Inserting the new visit')

    await this.db.collection('visits').add(visit)
      .then(function (docRef) {
        docRef.update({
          id: docRef.id,
          visitId: Math.random().toString(20).substr(2, 6)
        })
      });
  }

  updateVisit(visit) {
    this.db.collection('visits').doc(visit.id).update(visit).then(function () {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  deletevisit(docId) {
    this.db.collection('visits').doc(docId).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  populateForm(row) {

    this.form.patchValue(
      {
        id: row.id,        
        patientName: row.patientName,
        patientAge: row.patientAge,
        patientGender: row.patientGender,
        patientMobile: row.patientMobile,
        visitStatus: row.visitStatus,
        visitDate: row.visitDate,
        visitDoctor: row.visitDoctor,

        patientBloodGroup: row.patientBloodGroup,
        patientLongtermIllness: row.patientLongtermIllness,
        patientLongtermMedicine: row.patientLongtermMedicine,
        visitShortDescription: row.visitShortDescription,
        hasOrders: row.hasOrders,
        hasPrescriptions: row.hasPrescriptions,
        isClosed: row.isClosed
      }   
    );
  }


}
