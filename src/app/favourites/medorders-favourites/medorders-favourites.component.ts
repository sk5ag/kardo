import { Component, OnInit, ViewChild } from '@angular/core';
import { MedordersService } from 'src/app/shared/medorders.service';
import { MedOrder } from 'src/app/Modal/medorder';
import { FavMedOrderList } from 'src/app/Modal/favmedorder';
import { FavmedorderService } from 'src/app/shared/favmedorder.service';
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
    private favMedOrdersService: FavmedorderService,
  ) { } 

  listMedOrders: MatTableDataSource<MedOrder>;
  medordersArray: MatTableDataSource<FavMedOrderList>;
  MeddisplayColumns: string[] = ['medorder_title', 'medorder_category','medorder_description', 'testID','actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ordersearchKey: string;
  bucket: any = [];
  myFavMedOrders_count: number;
  
  ngOnInit(): void {

    console.log('STARTED');
    
    const docRef = this.favMedOrdersService.getOnlyMyFav();
    console.log(docRef)

    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a)=> {
        console.log('THE DOC YOU ARE LOOKING FOR:::', a.payload.doc.data)
      })
    });


    console.log('ENDED');

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
          //this.myFavMedOrders_count = array.length;
          console.log('No. of orders in the database:::: ', this.myFavMedOrders_count);
          this.listMedOrders = new MatTableDataSource(array);
          this.listMedOrders.sort = this.sort;
          this.listMedOrders.paginator = this.paginator;
        }
      )

  
      this.favMedOrdersService.getFavMedOrders()
      .subscribe(
        list => {
          let myfav = list.map(
            myitem => {
              return{
                id: myitem.payload.doc.id,
                ...myitem.payload.doc.data() as FavMedOrderList
              }
            }
          );

          this.medordersArray = new MatTableDataSource(myfav);
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

  add2FavMedOrders(item){
    console.log('addnig this item to favmedorders :::', item);
    console.log('Whats inside medordersArray? :::', item);

   
    console.log('Bucket contains ::::', this.bucket);

    
    if(confirm("Would you like to add more med orders to the bucket?")){

      this.bucket.push(item);
      console.log('Select more orders', this.bucket);
    }else{

      this.bucket.push(item);
      
      console.log('Writing to the database now!', this.bucket);
      this.favMedOrdersService.insertFavMedOrder(this.bucket);
    }
  }

}
