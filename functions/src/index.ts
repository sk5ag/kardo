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


//when a visit updated
exports.visitUpdate = functions.firestore.document('/{collection}/{id}')
  .onUpdate((snap, context) => {

    const collection = context.params.collection;
    const values = snap.after.data();

    //const activities = admin.firestore().collection('activities');
    const orders = admin.firestore().collection('orders');

    if (collection === 'visits') {

        console.log("ADD VisitOrder TO ORDERS COLLECTION");
        return orders.add({

          id: '',
          patientName: values.patientName,
          patientAge: values.patientAge,
          patientGender: values.patientGender,
          order: values.order,
          prescription: values.prescription,
          patientMobile: '',
          patientBloodGroup: '',
          patientLongtermIllness: '',
          patientLongtermMedicine: '',
          visitDescription: '',
          isClosed: false,

        });      
    }
    return null;
  })
