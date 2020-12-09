import * as functions from 'firebase-functions';
import { db } from './init';
import * as express from "express";
import admin = require('firebase-admin');

const app = express();

app.get('/appointments', async (_request: any, response: any) => {

  const snaps = await db.collection('appointments').get();

  const appointments: any[] = [];

  snaps.forEach((snap: { data: () => any; }) => appointments.push(snap.data()));

  response.status(200).json({ appointments });
});

export const getAppointments = functions.https.onRequest(app);

//when status of appointment changes
exports.appointmentUpdate = functions.firestore.document('/{collection}/{id}')
  .onUpdate((snap, context) => {

    const collection = context.params.collection;
    const values = snap.after.data();

    //const activities = admin.firestore().collection('activities');
    const visits = admin.firestore().collection('visits');

    if (collection === 'appointments') {

      if (values.appointmentStatus === true) {
        console.log("CHANGING STATUS FROM APPOINTMENT TO VISIT");
        return visits.add({

          id: '',
          patientName: values.patientName,
          patientAge: values.patientAge,
          patientGender: values.patientGender,
          patientMobile: '',
          patientBloodGroup: '',
          patientLongtermIllness: '',
          patientLongtermMedicine: '',
          visitDescription: '',
          isClosed: false,

        });
      }
    }
    return null;
  })


//when status of appointment changes
exports.visitCreate = functions.firestore.document('/{collection}/{id}')
  .onCreate((snap, context) => {

    const collection = context.params.collection;
    const values = snap.data();
    const visitId = snap.ref.id;

    //const activities = admin.firestore().collection('activities');
    const visits = admin.firestore().collection('visits');

    if (collection === 'visits') {

      if (values.id != visitId) {
        return visits.doc(visitId).update({

          id: visitId,

        });
      }
    }
    return null;
  })


//when an order has been added to a visit
exports.updateOrders = functions.firestore.document('/{collection}/{id}')
  .onUpdate((snap, context) => {

    const collection = context.params.collection;
    const values = snap.after.data();
    const docRef = snap.after.id;

    console.log('The document reference is :: ', docRef);

    //const activities = admin.firestore().collection('activities');
    const orders = admin.firestore().collection('orders');

    if (collection === 'visits') {

      if (!values.order.length) {
        console.log('ORDER Array is empty :: ', values.order);
        if (orders.doc(docRef).path) {
          console.log('Document Exist but has no orders. Remove the document from orders collection!');
          return orders.doc(docRef).delete();
        }
      } else {
        console.log('Order array containes data!');
        if (orders.doc(docRef).path) {
          console.log('Document Exist. Update the document inside orders collection!');
          return orders.doc(docRef).set({
            visitId: docRef,
            patientName: values.patientName,
            patientAge: values.patientAge,
            patientGender: values.patientGender,
            order: values.order,
            patientMobile: values.patientMobile,
            patientBloodGroup: values.patientBloodGroup,
            patientLongtermIllness: values.patientLongtermIllness,
            patientLongtermMedicine: values.patientLongtermMedicine,
            isClosed: false
          })
        } else {
          console.log('document does not exist, going to create it now');
          return orders.doc(docRef).create({
            visitId: docRef,
            patientName: values.patientName,
            patientAge: values.patientAge,
            patientGender: values.patientGender,
            order: values.order,
            patientMobile: values.patientMobile,
            patientBloodGroup: values.patientBloodGroup,
            patientLongtermIllness: values.patientLongtermIllness,
            patientLongtermMedicine: values.patientLongtermMedicine,
            isClosed: false
          })
        }
      };
    }
    return null;
  })

  //when a prescription has been added to a visit
exports.updatePrescriptions = functions.firestore.document('/{collection}/{id}')
.onUpdate((snap, context) => {

  const collection = context.params.collection;
  const pvalues = snap.after.data();
  const pdocRef = snap.after.id;

  console.log('The document reference is :: ', pdocRef);

  //const activities = admin.firestore().collection('activities');
  const prescriptions = admin.firestore().collection('prescriptions');

  if (collection === 'visits') {

    if (!pvalues.prescription.length) {
      console.log('PRESCRIPTIONS Array is empty :: ', pvalues.prescription);
      if (prescriptions.doc(pdocRef).path) {
        console.log('Document Exist but has no prescriptions. Remove the document from prescriptions collection!');
        return prescriptions.doc(pdocRef).delete();
      }
    } else {

      console.log('Prescriptions array containes data!', pvalues.prescription);
      if (prescriptions.doc(pdocRef).path) {
        console.log('Document Exist. Update the document inside prescriptions collection!');
        return prescriptions.doc(pdocRef).set({
          visitId: pdocRef,
          patientName: pvalues.patientName,
          patientAge: pvalues.patientAge,
          patientGender: pvalues.patientGender,
          order: pvalues.prescription,
          patientMobile: pvalues.patientMobile,
          patientBloodGroup: pvalues.patientBloodGroup,
          patientLongtermIllness: pvalues.patientLongtermIllness,
          patientLongtermMedicine: pvalues.patientLongtermMedicine,
          isClosed: false
        });
      } else {
        console.log('document does not exist, going to create it now');
        return prescriptions.doc(pdocRef).create({
          visitId: pdocRef,
          patientName: pvalues.patientName,
          patientAge: pvalues.patientAge,
          patientGender: pvalues.patientGender,
          order: pvalues.prescription,
          patientMobile: pvalues.patientMobile,
          patientBloodGroup: pvalues.patientBloodGroup,
          patientLongtermIllness: pvalues.patientLongtermIllness,
          patientLongtermMedicine: pvalues.patientLongtermMedicine,
          isClosed: false
        })
      }
    };
  }
  return null;
})