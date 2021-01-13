import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MedOrder } from '../Modal/medorder';
import { AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class MedordersService {

  medordersCollection: AngularFirestoreCollection<MedOrder>;
  medorders: Observable<MedOrder>;
  collectionPath: string='/medorders';
 
  constructor(
    private db: AngularFirestore
  ) { 
    this.medordersCollection = this.db.collection(this.collectionPath)

  }

  medorderList: AngularFireList<any>;

  medorderForm: FormGroup = new FormGroup({
    id: new FormControl('null'),
   medorder_title: new FormControl('', Validators.required),
   medorder_category: new FormControl('', Validators.required),
   medorder_description: new FormControl('')
  })

  initializedrugFormGroup(){
    this.medorderForm.setValue({
      id: null,
      medorder_title: '',
      medorder_category: '',
      medorder_description: ''
    });
  }

  getMedorders(){
    return this.db.collection('medorders').snapshotChanges()
  }

  async insertMedorder(medorder){
    await this.db.collection('medorders').add(medorder)
    .then(function (docRef){
      docRef.update({
        id: docRef.id
      })
    });
  }
  
  updateMedorder(medorder){
    this.db.collection('medorders').doc(medorder.id).update(medorder).then(function() {
      console.log("Document MEDORDER successfully updated!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  deleteMedorder(docId){
    this.db.collection('medorders').doc(docId).delete().then(function() {
      console.log("Document MEDORDER successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  populateMedOrderForm(row){

    this.medorderForm.patchValue(
       {
       id: row.id,
       medorder_title: row.medorder_title,
       medorder_category: row.medorder_category,
       medorder_description: row.medorder_description
     }
    );
  }
}
