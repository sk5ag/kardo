import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { Order } from '../Modal/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order>;
  collectionPath: string = "/orders";

  constructor(private db: AngularFirestore) { 
    this.ordersCollection = this.db.collection(this.collectionPath)
  }

  orderList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    currentDate: new FormControl(''),
    createdDate: new FormControl(''),
    clinicName: new FormControl(''),

    doctorSig: new FormControl('', Validators.required),

    patientName: new FormControl(''),
    patientAge: new FormControl(''),
    patientGender: new FormControl('1'),
    patientMobile: new FormControl('', [Validators.minLength(11), Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]),

    orderStatus: new FormControl(''),
    orderDate: new FormControl(''),
    orderingDoctor: new FormControl(''),
    orderTitle: new FormControl('', Validators.required),
    orderDescription: new FormControl(''),
    orderComment: new FormControl(''),
    isCompleted: new FormControl(false)
  })

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      currentDate: '',
      createdDate: '',
      clinicName: '',
      orderStatus: '',
      orderDate: '',
      orderingDoctor: '',
      doctorSig: '',
      patientName: '',
      patientAge: '',
      patientGender: '',
      patientMobile: '',
      orderTitle: '',
      orderDescription: '',
      orderComment: '',
      isCompleted: false
    });
  }

  getOrders() {
    return this.db.collection('orders').snapshotChanges()
  }

  async insertOrder(order) {

    await this.db.collection('orders').add(order)
      .then(function (docRef) {
        docRef.update({
          id: docRef.id,
          visitId: Math.random().toString(20).substr(2, 6)
        })
      });
  }

  updateOrder(order) {
    this.db.collection('orders').doc(order.id).update(order).then(function () {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  deleteOrder(docId) {
    this.db.collection('orders').doc(docId).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }


  populateForm(row) {

    this.form.patchValue(
      {
        id: row.id,
        // appointmentDoctor: row.appointmentDoctor,
        orderTitle: row.orderTitle,
        orderDescription: row.orderDescription,
        orderComment: row.orderComment,
        patientName: row.patientName,
        patientAge: row.patientAge,
        patientGender: row.patientGender,
        patientMobile: row.patientMobile,
        isComplete: row.isComplete
      }
    );
  }
}
