import { Component, OnInit, ViewChild } from '@angular/core';
import { DrugService } from 'src/app/shared/drug.service';
import { Drug } from 'src/app/Modal/drug';
import { FavdruglistService } from 'src/app/shared/favdruglist.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-drugs-favourites',
  templateUrl: './drugs-favourites.component.html',
  styleUrls: ['./drugs-favourites.component.css']
})
export class DrugsFavouritesComponent implements OnInit {

  constructor(
    private drugsService: DrugService,
    private favDrugsService: FavdruglistService,
    private dialog: MatDialog,
  ) { }

  listOfDrugs: MatTableDataSource<Drug>;
  drugsDisplayColumns: string[] = ['generic_name', 'strength','ingredient', 'dosage_form', 'route','actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  drugsearchKey: string;
  drugsArray: any= [];

  ngOnInit(): void {
    this.drugsService.getDrugs()
      .subscribe(
        list => {
          let array = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as Drug
              }
            }
          );
          this.listOfDrugs = new MatTableDataSource(array);
          this.listOfDrugs.sort = this.sort;
          this.listOfDrugs.paginator = this.paginator;
        }
      )
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

  add2FavDrugs(item){
    console.log('addnig this item to favdrugs :::', item);
    this.drugsArray.push(item);
    console.log('your items have been added to the drugsarray:::', this.drugsArray);
    this.favDrugsService.insertFavDrug(this.drugsArray)
  }

}
