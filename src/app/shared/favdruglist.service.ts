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
    this.favdrugsCollection = db.collection('/favdruglist', fdl => fdl.limit(5));

    // this.afAuth.user$.subscribe(usr => {
    //   this.docID = usr.uid;
    //   console.log('USER ID :::: ', this.docID);
    // }
    // )
  
  }
  getUserId() {
    return this.afAuth.user$
  }
  getAllDrugs(): AngularFirestoreCollection<FavDrugList> {
    return this.db.collection('/drugs', drug => drug.where("generic_name", "==", "Levothyroxine Sodium").orderBy('generic_name'))
  }
  getSelectedDrugs(route, dosage_form): AngularFirestoreCollection<FavDrugList> {
    console.log('Route selected is ;;;', route)
    return this.db.collection('/drugs', drug => drug.where("route", "==", route).where("dosage_form","==", dosage_form).orderBy('generic_name'))
  }
  getAllFav(): AngularFirestoreCollection<FavDrugList> {
    return this.favdrugsCollection;
  }
  getFavByDoctor(usr) {
    return this.favdrugsCollection.doc<FavDrugList>(usr);
  }
  createFav(fav: FavDrugList): any {
    return this.favdrugsCollection.add({ ...fav });
  }
  updateFav(id: string, favdrug: any): Promise<void> {

    return this.favdrugsCollection.doc(id).update({ favdrug });
  }

  deleteFav(id: string): Promise<void> {
    return this.favdrugsCollection.doc(id).delete();
  }
  getFavDrugs() {
    return this.db.collection('favdruglist').snapshotChanges()
  }
  // async insertFavDrug(favdrug) {
  //   console.log('This item received from the component :::', favdrug);
  //   console.log('Current docID is ::::: ', this.docID);
  //   await this.db.collection('favdruglist').doc(this.docID).set({ favdrug });
  //   // // To update age and favorite color:
  //   // this.db.collection('favdruglist').doc(this.docID).update({
  //   //   "itemID": favdrug.generic_name,
  //   // })
  //   //   .then(function () {
  //   //     console.log("Document successfully updated!");
  //   //   });
  //   console.log('This item added to favdruglist collection successfully:::', favdrug)
  // }
}
