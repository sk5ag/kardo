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
  FavMedOrder_counts: number = 0;
  serverFavMedOrders: any = [];

  constructor(
    private db: AngularFirestore,
    private afAuth: AuthService,
  ) {
    //this.favmedorderCollection = this.db.collection(this.collectionPath);
    this.afAuth.user$.subscribe(usr => {
      this.docID = usr.uid;
      console.log('USER ID :::: ', this.docID);
      this.countMyFavOrders(this.docID);
    }
    );
  }

  getOrdersByDocID(docid) {
    console.log('Doctor ID Received::: ', docid);
    return this.db.collection('favmedorderlist').doc(docid).get();
  }

  getOnlyMyFav(){

    console.log('Method called................');

    return this.db.collection('favmedorderlist');
    
  }

  countMyFavOrders(docid) {

    this.getFavMedOrders()
      .subscribe(
        list => {
          let myfav = list.map(
            myitem => {
              return {
                id: myitem.payload.doc.id,
                ...myitem.payload.doc.data() as FavMedOrderList
              }
            }
          );
          var arr: any[] = myfav;
          console.log('this is the ARR;;;', arr);
          console.log('for this doctor;;;', this.docID);

          arr.forEach(element => {
            if (element.id == docid) {
              this.FavMedOrder_counts = element.favmedorder.length;
              this.myFavMedOrders = element;
            }
          });
        })
    // this.FavMedOrder_counts = this.getOrdersByDocID;
  }

  getFavMedOrders() {
    return this.db.collection('favmedorderlist').snapshotChanges();
  }

  async insertFavMedOrder(bucket) {

    console.log('Item received by insert method is ::::', bucket);
    console.log('Looking for this document ref ::::', this.docID);

    // console.log('Total count of FAV MED ORDERS ::::', this.FavMedOrder_counts);

    // let favmedorder: any = [].concat(bucket);
    // await this.db.collection('favmedorderlist').doc(this.docID).set( {favmedorder});
    // favmedorder = [];

    // this.getOrdersByDocID(this.docID)
    // .subscribe(
    //   list => {
    //     console.log('the container has these many items::: ',list.data().favmedorder);

    //     var LocalContainer = list.data().favmedorder;
    //     console.log('Local Container', LocalContainer);

        // if(LocalContainer.length > 0){
        //   favmedorder.forEach(element => {
        //     LocalContainer.forEach(content => {
        //       if(content.id == element.id){
        //         console.log('DOING NOTHING');
        //       }else{

                
        //         // this.db.collection('favmedorderlist').doc(this.docID).update({ favmedorder }); 
        //       }
        //     });
            
        //   });
        // }

      // });

    //   await this.db.collection('favmedorderlist').doc(this.docID).update({ favmedorder });

  }
} 
