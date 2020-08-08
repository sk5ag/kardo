import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Drug } from '../Modal/drug';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  drugsCollection: AngularFirestoreCollection<Drug>;
  drugs: Observable<Drug>;
  collectionPath: string='/drugs';

  constructor(
    private db: AngularFirestore
  ) {
    this.drugsCollection = this.db.collection(this.collectionPath)
   }

   drugList: AngularFireList<any>;

   drugForm: FormGroup = new FormGroup({
     id: new FormControl('null'),
    generic_name: new FormControl('', Validators.required),
    strength: new FormControl('', Validators.required),
    ingredient: new FormControl('', Validators.required),
    dosage_form: new FormControl(''),
    route:new FormControl(''),
    description: new FormControl(''),
    warnings: new FormControl('')
   })

   initializedrugFormGroup(){
    this.drugForm.setValue({
      id: null,
      generic_name: '',
      strength: '',
      ingredient: '',
      dosage_form: '',
      route: '',
      description: '',
      warnings: ''
    });
  }

  getDrugs(){
    return this.db.collection('drugs').snapshotChanges()
  }

  async insertDrug(drug){
    await this.db.collection('drugs').add(drug)
    .then(function (docRef){
      docRef.update({
        id: docRef.id
      })
    });
  }

  
  updateDrug(drug){
    this.db.collection('drugs').doc(drug.id).update(drug).then(function() {
      console.log("Document DRUG successfully updated!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  deleteDrug(docId){
    this.db.collection('drugs').doc(docId).delete().then(function() {
      console.log("Document DRUG successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  populateForm(row){

    this.drugForm.patchValue(
       {
       id: row.id,
       generic_name: row.generic_name,
       strength: row.strength,
       ingredient: row.ingredient,
       dosage_form: row.dosage_form,
       route: row.route,
       description: row.description,
       warnings: row.warnings
     }
    );
  }

}
