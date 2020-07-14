import { Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TesttypeService {


  testtypeList: AngularFireList<any>;
  array = [];

  constructor(
    private firebase: AngularFireDatabase,
    ) {
      this.testtypeList = this.firebase.list('testtypes');
      this.testtypeList.snapshotChanges()
      .subscribe(list => {
        this.array = list.map(item => {
          return {
            $key: item.payload.key,
            ...item.payload.val()
          }
        });
      })
    }


}
