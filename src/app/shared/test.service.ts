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
    // private firebase:AngularFireDatabase,
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
    // this.testList = this.firebase.list('tests');
    // return this.testList.snapshotChanges();

    this.db.collection('tests').stateChanges()
      .subscribe(snaps => {

        const alltests: Test[] = snaps.map(snap =>{
          return{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as Test
          } 
        }) 
        console.log(alltests)
      });

  }

  insertTest(test: Test){
    // this.testList.push({
    //   Name: test.Name,
    //   Type: test.Type,
    //   Department: test.Department,
    //   isActive: test.isActive
    // }); 

    this.testsCollection.add(test)

  }

  updateTest(test){
    this.testList.update(test.$key, 
      {
        Name: test.Name,
        Type: test.Type,
        Department: test.Department,
        isActive: test.isActive
      });
  }

  deleteEmployee($key: string){
    this.testList.remove($key);
  }
}
