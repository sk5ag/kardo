import { Injectable } from '@angular/core'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../Modal/user';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User>;
  collectionPath: string = "/users";

  constructor(private db: AngularFirestore) {
    this.usersCollection = this.db.collection(this.collectionPath)
   }
   userList: AngularFireList<any>;


   getUsers() {
    return this.db.collection('users').snapshotChanges()
  }
  updateUser() {
    //add the code for updating user settings here
  }
}
