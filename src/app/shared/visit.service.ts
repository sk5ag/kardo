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
    patientName: new FormControl('', Validators.required),
    patientAge: new FormControl('', Validators.required),
    patientGender: new FormControl('1'),
    patientMobile: new FormControl('', [Validators.minLength(11),Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]),
    patientBloodGroup: new FormControl(''),
    patientLongtermIllness: new FormControl(''),
    patientLongtermMedicine: new FormControl(''),
    visitDescription: new FormControl(''),
    prescription: new FormControl([]),
    order: new FormControl([]),
    isClosed: new FormControl(false)
  });

  visitForm: FormGroup = new FormGroup({

    visitId: new FormControl(''),
    currentDate: new FormControl(''),
    createdDate: new FormControl(''),
    clinicName: new FormControl(''),
    doctorName: new FormControl(''),
    doctorSig: new FormControl('', Validators.required),
    visitStatus: new FormControl(''),
    visitDate: new FormControl(''),
    visitDoctor: new FormControl(''),
  });  
  notesForm: FormGroup = new FormGroup({
    examination_title: new FormControl('', Validators.required),
    examination_description: new FormControl('', Validators.required),
  })  
  ordersForm: FormGroup = new FormGroup({
    order_title: new FormControl('', Validators.required),
    order_type: new FormControl(''),
    order_category: new FormControl(''),
  });
  prescriptionsForm: FormGroup = new FormGroup({
    generic_name: new FormControl('', Validators.required),
    active_ingredients: new FormControl(''),
    route: new FormControl(''),
    dosage_form: new FormControl(''),
    strength: new FormControl('')
  });
 
  initializeFormGroup(){
    this.form.setValue({
      id: null,
      patientName: '',
      patientAge: '',
      patientGender: '',
      patientMobile: '',
      patientBloodGroup: '',
      patientLongtermIllness: '',
      patientLongtermMedicine: '',
      visitDescription: '',
      prescription: [],
      order: [],
      isClosed: false
    });
  }

  initializevisitFormGroup(){
    this.visitForm.setValue({
      visitId: null,
      currentDate: '',
      createdDate: '',
      clinicName: '',
      doctorName: '',
      doctorSig: '',
      visitStatus: '',
      visitDate: '',
      visitDoctor: '',
    });
  }

  initializenotesFormGroup(){
    this.notesForm.setValue({
      examination_title: '',
      examination_description: '',
    });
  }

  initializeordersFormGroup(){
    this.ordersForm.setValue({
      order_title: '',
      order_type: '',
      order_category: '',
    });
  }

  initializeprescriptionsFormGroup(){
    this.prescriptionsForm.setValue({
      generic_name: '',
      active_ingredients: '',
      route: '',
      dosage_form: '',
      strength: '',
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
    console.log('RECEIEVD BY UPDATE METHOD: ', visit[0].id);
    this.db.collection('visits').doc(visit[0].id).update(visit[0]).then(function () {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }
  modifyVisit(visit) {
    console.log('RECEIEVD BY UPDATE METHOD: ', visit.id);
    this.db.collection('visits').doc(visit.id).update(visit).then(function () {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  deletevisit(docId) {
    this.db.collection('visits').doc(docId).delete().then(function () {
      // console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  populateForm(row) {
    console.log('populateForm - Values in Row ',row);
    this.form.patchValue(
      {
        id: row.id,        
        patientName: row.patientName,
        patientAge: row.patientAge,
        patientGender: row.patientGender,
        patientMobile: row.patientMobile,
        // visitStatus: row.visitStatus,
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


  populatevisitForm(row) {
    console.log('populatevisitForm - Values in Row ',row.visitStatus);
    this.form.patchValue(
      {
        visitStatus: row.visitStatus,
      }
    );
  }

  populateSelectedorder(item: any) {
    this.ordersForm.patchValue(
      {
        order_title: item.order_title,
        order_type: item.order_type,
        order_category: item.order_category,
      }
    )
  }

  populateSelectednote(row) {
    this.notesForm.patchValue(
      {
        examination_title: row.examination_title,
        examination_description: row.examination_description,
      }
    )
    }   

    populateSelectedprescription(item: any) {
      // console.log('');
      // console.log('2 - POPULATE SELECTED PRESCRIPTION');
      // console.log('    GENERIC: ', item.generic_name);
      // console.log('    INGREDIENTS: ', item.ingredient);
      // console.log('    ROUTE: ', item.route);
      // console.log('    STRENGTH: ', item.strength);
      this.prescriptionsForm.patchValue(
        {
          generic_name: item.generic_name,
          strength: item.strength,
          active_ingredients: item.ingredient,
          route: item.route,
          dosage_form: item.dosage_form,
         }
      );  
      // console.log('');
      // console.log('3 - you are about to clear the item array', item);
      // console.log('------------------------------------');
      item = [];  
      // console.log('');
      // console.log('4 - the item array is now empty', item);
      // console.log('------------------------------------');

    }

}
