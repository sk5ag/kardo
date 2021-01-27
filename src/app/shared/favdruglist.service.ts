import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../Modal/user';
import { Observable, of } from 'rxjs';
import { FavDrugList } from '../Modal/favdrugs';
import { AuthService } from './auth.service';

 
@Injectable({
  providedIn: 'root'
})
export class FavdruglistService {

  favdrugsCollection: AngularFirestoreCollection<FavDrugList>;
  favdrugs: Observable<FavDrugList>;
  collectionPath: string = '/favdruglist';

  user$: Observable<User>;
  docID: string;


  constructor(
    private db: AngularFirestore,
    private afAuth: AuthService,
  ) {
    this.favdrugsCollection = this.db.collection(this.collectionPath);

    this.afAuth.user$.subscribe(usr => {
      this.docID = usr.uid;
      console.log('USER ID :::: ', this.docID);
    }

    )
  }

  getFavDrugs() {
    return this.db.collection('favdruglist').snapshotChanges()
  }

  async insertFavDrug(favdrug) {
    console.log('This item received from the component :::', favdrug);

    console.log('Current docID is ::::: ', this.docID);

    await this.db.collection('favdruglist').doc(this.docID).set({ favdrug });

    // // To update age and favorite color:
    // this.db.collection('favdruglist').doc(this.docID).update({
    //   "itemID": favdrug.generic_name,
    // })
    //   .then(function () {
    //     console.log("Document successfully updated!");
    //   });


    console.log('This item added to favdruglist collection successfully:::', favdrug)

  }
}
