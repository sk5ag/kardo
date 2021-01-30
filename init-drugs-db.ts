
import {DRUGS} from './drugs_db'; 

import * as firebase from 'firebase'; 

var config = {  
  apiKey: "AIzaSyDSatdRZPD2aUhyMOSALSuQ6kcHjojxTXU",
  authDomain: "test-cad50.firebaseapp.com",
  databaseURL: "https://test-cad50.firebaseio.com",
  projectId: "test-cad50",
  storageBucket: "test-cad50.appspot.com",
  messagingSenderId: "3706584181",
  appId: "1:3706584181:web:d59ec49b6cc03f19f94c3c"

};

console.log("Uploading data to the database with the following config:\n");

console.log(JSON.stringify(config));

console.log("\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n");

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then(r => console.log('Done.'));

async function uploadData() {
  const drugs = await db.collection('drugs');
  for (let drug of Object.values(DRUGS)) {
    await drugs.add(drug);
    console.log(`Uploading drug item: ${drug["generic_name"]["route"]}`);
  }
}

async function main(){
  try {
    console.log('Start main...\n\n');
    await uploadData();
    console.log('\n\nClosing Application...');
    await app.delete();
  }catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}

