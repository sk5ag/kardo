import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../Modal/user';
import { Observable, of } from 'rxjs';
import { FavMedOrderList } from '../Modal/favmedorder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavmedorderService {
  
  favmedorderCollection: AngularFirestoreCollection<FavMedOrderList>;
  favmedorders: Observable<FavMedOrderList>;
  collectionPath: string = '/favmedorderlist';

  user$: Observable<User>;
  docID: string;
  myFavMedOrders: any;

  constructor(
    private db: AngularFirestore,
    private afAuth: AuthService,
  ) { 
    //this.favmedorderCollection = this.db.collection(this.collectionPath);

    // this.afAuth.user$.subscribe(usr => {
    //   this.docID = usr.uid;
    //   console.log('USER ID :::: ', this.docID);
    // }

    // );    
    //this.db.collection('favmedorderlist').snapshotChanges()

  }

  getDocID(docid){
    console.log('Doctor ID Received::: ', docid);
    return this.db.collection('favmedorderlist').doc(docid).get();
  }


  getFavMedOrders() {
    return this.db.collection('favmedorderlist').snapshotChanges();    
  }

  async insertFavMedOrder(favmedorder) {

    console.log('Item received by insert method is ::::', favmedorder);
    console.log('Looking for this document ref ::::', this.docID);
    await this.db.collection('favmedorderlist').doc(this.docID).set({favmedorder});
  }
} 
