import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { Prescriptions } from '../Modal/prescriptions';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  prescriptionsCollection: AngularFirestoreCollection<Prescriptions>;
  prescriptions: Observable<Prescriptions>;
  collectionPath: string = "/prescriptions";

  constructor(
    private db: AngularFirestore
  ) {
    this.prescriptionsCollection = this.db.collection(this.collectionPath)
  }

  prescriptionList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    currentDate: new FormControl(''),
    createdDate: new FormControl(''),
    clinicName: new FormControl(''),

    doctorSig: new FormControl('', Validators.required),

    patientName: new FormControl('', Validators.required),
    patientAge: new FormControl('', Validators.required),
    patientGender: new FormControl('1'),
    patientMobile: new FormControl('', [Validators.minLength(11), Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]),

    prescriptionStatus: new FormControl(''),
    prescriptionDate: new FormControl(''),
    prescribingDoctor: new FormControl(''),
    medicineGenericName: new FormControl('', Validators.required),
    medicineDosageForm: new FormControl(''),
    medicineRoute: new FormControl(''),
    medicineIngredient: new FormControl(''),
    medicineType: new FormControl(''),
    medicineQuantity: new FormControl(''),
    medicineDirectionforuse: new FormControl(''),
    medicineRemarks: new FormControl(''),
    isDispensed: new FormControl(false)
  })

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      currentDate: '',
      createdDate: '',
      clinicName: '',

      doctorSig: '',

      patientName: '',
      patientAge: '',
      patientGender: '',
      patientMobile: '',

      prescriptionStatus: '',
      prescriptionDate: '',
      prescribingDoctor: '',

      medicineGenericName: '',
      medicineDosageForm: '',
      medicineRoute: '',
      medicineIngredient: '',
      medicineType: '',
      medicineQuantity: '',
      medicineDirectionforuse: '',
      medicineRemarks: '',
      isDispensed: false
    });
  }

  getPrescriptions() {
    return this.db.collection('prescriptions').snapshotChanges()
  }

  async insertPrescription(prescription) {
    console.log('Inserting the new prescription')

    await this.db.collection('prescriptions').add(prescription)
      .then(function (docRef) {
        docRef.update({
          id: docRef.id,
          visitId: Math.random().toString(20).substr(2, 6)
        })
      });
  }

  updateOrder(prescription) {
    this.db.collection('prescriptions').doc(prescription.id).update(prescription).then(function () {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  deleteOrder(docId) {
    this.db.collection('prescription').doc(docId).delete().then(function () {
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

        prescriptionStatus: row.prescriptionStatus,
        prescriptionDate: row.prescriptionDate,
        prescribingDoctor: row.prescribingDoctor,
        medicineGenericName: row.medicineGenericName,
        medicineDosageForm: row.medicineDosageForm,
        medicineRoute: row.medicineRoute,
        medicineIngredient: row.medicineIngredient,
        medicineType: row.medicineType,
        medicineQuantity: row.medicineQuantity,
        medicineDirectionforuse: row.medicineDirectionforuse,
        medicineRemarks: row.medicineRemarks,
        isDispensed: row.isDispensed,
      }
    );
  }
}
