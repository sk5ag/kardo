import { Component, OnInit, ViewChild } from '@angular/core';
import { MedordersService } from 'src/app/shared/medorders.service';
import { MedOrder } from 'src/app/Modal/medorder';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medorders-favourites',
  templateUrl: './medorders-favourites.component.html',
  styleUrls: ['./medorders-favourites.component.css']
})
export class MedordersFavouritesComponent implements OnInit {

  constructor(
    private medorderService: MedordersService,
    private dialog: MatDialog,
  ) { } 

  listMedOrders: MatTableDataSource<MedOrder>;
  MeddisplayColumns: string[] = ['medorder_title', 'medorder_category','medorder_description', 'testID','actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ordersearchKey: string;
  
  ngOnInit(): void {
    this.medorderService.getMedorders()
      .subscribe(
        list => {
          let array = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as MedOrder
              }
            }
          );
          this.listMedOrders = new MatTableDataSource(array);
          this.listMedOrders.sort = this.sort;
          this.listMedOrders.paginator = this.paginator;
        }
      )
  }

  onSearchClear(){
    this.ordersearchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listMedOrders.filter = this.ordersearchKey.trim().toLowerCase();
  }
  onClose(){
    this.dialog.closeAll();
  }

}
