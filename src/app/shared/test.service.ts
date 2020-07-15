import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Test } from '../Modal/test';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  testsCollection: AngularFirestoreCollection<Test>;
  tests: Observable<Test>;
  collectionPath: string = "/tests";

  constructor(
    private db:AngularFirestore
    ) { 
      this.testsCollection = this.db.collection(this.collectionPath);
    }

  testList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Name: new FormControl('', Validators.required),
    Type: new FormControl('', Validators.required),
    Department: new FormControl(''),
    isActive: new FormControl(false)
  })


  initializeFormGroup(){
   this.form.setValue({
     $key: null,
     Name: '',
     Type: '',
     Department: 0,
     isActive: false,
   }); 
  }

  getTests(){
    console.log('Getting all tests...')
    return this.db.collection('tests').stateChanges()
      .subscribe(snaps => {
        snaps.map(snap =>{
          return{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as Test
          } 
        }) 
        console.log('Tests have been collected from the firestore')
      });
  }

  insertTest(test: Test){

    console.log('insert function called...')


    this.testsCollection.add(test)

    console.log('data has been submitted to database ...')


  }

  updateTest(test){

  }

  deleteEmployee($key: string){
  }
}
