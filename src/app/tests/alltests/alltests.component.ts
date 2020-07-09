import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Test } from 'src/app/Modal/test';

@Component({
  selector: 'app-alltests',
  templateUrl: './alltests.component.html',
  styleUrls: ['./alltests.component.css']
})
export class AlltestsComponent implements OnInit {

  alltests: Test;
  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('tests').stateChanges()
      .subscribe(snaps => {

        const alltests: Test[] = snaps.map(snap =>{
          return{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as Test
          } 
        }) 
        console.log(alltests);

      });
  }

}
