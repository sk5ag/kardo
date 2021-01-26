import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../Modal/user';
import { MedOrder } from '../Modal/medorder';
import { Observable, of } from 'rxjs';
import { FavMedOrderList } from '../Modal/favmedorder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavmedorderService {

  favmedorderCollection: AngularFirestoreCollection<FavMedOrderList>;
  medorderCollection: AngularFirestoreCollection<MedOrder>;

  favmedorders: Observable<FavMedOrderList>;

  user$: Observable<User>;
  docID: string;
  genericName: string = "Procedure";
  myFavMedOrders: any;
  FavMedOrder_counts: number = 0;
  serverFavMedOrders: any = [];

  constructor(
    private db: AngularFirestore,
    private afAuth: AuthService,
  ) {
    this.favmedorderCollection = db.collection('/favmedorderlist', fmol => fmol.limit(5));
    //this.medorderCollection = db.collection('/medorders', mo => mo.orderBy('medorder_title'))
  }

  getUserId() {
    return this.afAuth.user$
  }
  getAllMedorders(): AngularFirestoreCollection<MedOrder> {
    // return this.medorderCollection;
    return this.db.collection('/medorders', mo => mo.where("medorder_category", "==", this.genericName).orderBy('medorder_title'))
  }
  getSelectedMedorders(category): AngularFirestoreCollection<MedOrder> {
    console.log('Category selecte is ;;;', category)
    // return this.medorderCollection;
    return this.db.collection('/medorders', mo => mo.where("medorder_category", "==", category).orderBy('medorder_title'))
  }
  getAllFav(): AngularFirestoreCollection<FavMedOrderList> {
    return this.favmedorderCollection;
  }
  getFavByDoctor(usr) {
    return this.favmedorderCollection.doc<FavMedOrderList>(usr);
  }
  createFav(fav: FavMedOrderList): any {
    return this.favmedorderCollection.add({ ...fav });
  }
  updateFav(id: string, favmedorder: any): Promise<void> {

    return this.favmedorderCollection.doc(id).update({ favmedorder });
  }



  deleteFav(id: string): Promise<void> {
    return this.favmedorderCollection.doc(id).delete();
  }

  getOrdersByDocID() {
  }

  getOnlyMyFav() {
  }

  countMyFavOrders() {
  }

  getFavMedOrders() {
  }

  insertFavMedOrder() {
  }
} 