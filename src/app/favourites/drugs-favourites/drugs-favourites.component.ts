import { Component, OnInit, ViewChild } from '@angular/core';
import { DrugService } from 'src/app/shared/drug.service';
import { Drug } from 'src/app/Modal/drug';
import { FavdruglistService } from 'src/app/shared/favdruglist.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-drugs-favourites',
  templateUrl: './drugs-favourites.component.html',
  styleUrls: ['./drugs-favourites.component.css']
})
export class DrugsFavouritesComponent implements OnInit {

  constructor(
    //private drugsService: DrugService,
    private favDrugsService: FavdruglistService,
    private dialog: MatDialog,
  ) { }

  listOfDrugs: MatTableDataSource<Drug>;
  drugsDisplayColumns: string[] = ['generic_name', 'strength','ingredient', 'dosage_form', 'route','actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  drugsList?: any[];
  usr$: string;
  drugsearchKey: string;
  drugsArray: any= [];
  favourites3?: any = [];


  ngOnInit(): void {

    this.getUsr();
    this.retrieveSelectedDrugs('ORAL', 'TABLET')
    // this.drugsService.getDrugs()
    //   .subscribe(
    //     list => {
    //       let array = list.map(
    //         item => {
    //           return {
    //             id: item.payload.doc.id,
    //             ...item.payload.doc.data() as Drug
    //           }
    //         }
    //       );
    //       this.listOfDrugs = new MatTableDataSource(array);
    //       this.listOfDrugs.sort = this.sort;
    //       this.listOfDrugs.paginator = this.paginator;
    //     }
    //   )
  }
  getUsr() {
    this.favDrugsService.getUserId().subscribe(usr => {
      console.log('the user id is ::: ', usr.uid);
      this.usr$ = usr.uid
    })  
  }
  retrieveSelectedDrugs(route, dosage_form) {
    console.log('Selected Order to Retrieve', route);
    this.favDrugsService.getSelectedDrugs(route, dosage_form).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.drugsList = data;
      console.log('Assign data to the MatTable Data source', this.drugsList);
      this.listOfDrugs = new MatTableDataSource(this.drugsList);
      this.listOfDrugs.sort = this.sort;
      this.listOfDrugs.paginator = this.paginator
    });
  }
  retrieveDocFavDrugs(user) {
    console.log('the user received by this crap:::: ', user)
    this.favDrugsService.getFavByDoctor(user).snapshotChanges().subscribe(data => {
      this.favourites3 = data.payload.data().favdrug;
      // this.favourites2.forEach(element => {
      //   this.medordersArray..concat(element);
      // });
      console.log('Med Order Array Contains:::::: ', this.favourites3)
    });

  }
  onSearchClear(){
    this.drugsearchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listOfDrugs.filter = this.drugsearchKey.trim().toLowerCase();
  }
  onClose(){
    this.dialog.closeAll();
  }

  // add2FavDrugs(item){
  //   console.log('addnig this item to favdrugs :::', item);
  //   this.drugsArray.push(item);
  //   console.log('your items have been added to the drugsarray:::', this.drugsArray);
  //   this.favDrugsService.insertFavDrug(this.drugsArray)
  // }

}
