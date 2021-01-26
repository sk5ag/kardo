import { Component, OnInit, ViewChild } from '@angular/core';
import { MedordersService } from 'src/app/shared/medorders.service';
import { MedOrder } from 'src/app/Modal/medorder';
import { FavMedOrderList } from 'src/app/Modal/favmedorder';
import { FavmedorderService } from 'src/app/shared/favmedorder.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-medorders-favourites',
  templateUrl: './medorders-favourites.component.html',
  styleUrls: ['./medorders-favourites.component.css']
})
export class MedordersFavouritesComponent implements OnInit {

  constructor(
    // private medorderService: MedordersService,
    private dialog: MatDialog,
    private favMedOrdersService: FavmedorderService,
  ) { }

  listMedOrders: MatTableDataSource<MedOrder>;
  medordersArray: MatTableDataSource<FavMedOrderList>;
  MeddisplayColumns: string[] = ['medorder_title', 'medorder_category', 'medorder_description', 'testID', 'actions'];
  medorderCategory: string[] = ['Procedure', 'Radiology', 'Laboratory'];
  pickedOrdercategory: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ordersearchKey: string;
  cart?: any = [];
  myFavMedOrders_count: number;
  medordersList?: MedOrder[];
  favourites?: FavMedOrderList[];
  favourites2?: any = [];
  searchArray: any = [];
  usr$: string;

  ngOnInit(): void {

    //Call the methodes here, add more as you go along
    this.getUsr();
    this.loadCart();
    //this.retrieveAllMedorders();

  }
  getUsr() {
    this.favMedOrdersService.getUserId().subscribe(usr => {
      console.log('the user id is ::: ', usr.uid);
      this.usr$ = usr.uid
    })
  }
  radiochangedHandler(event: any) {
    this.pickedOrdercategory = event.value;
    console.log('picked order category', this.pickedOrdercategory);
    this.retrieveSelectedMedOrder(event.value);
  }
  retrieveSelectedMedOrder(category) {
    console.log('Selected Order to Retrieve', category);
    this.favMedOrdersService.getSelectedMedorders(category).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.medordersList = data;
      console.log('Assign data to the MatTable Data source', this.medordersList);
      this.listMedOrders = new MatTableDataSource(this.medordersList);
      this.listMedOrders.sort = this.sort;
      this.listMedOrders.paginator = this.paginator
    });
  }
  retrieveAllMedorders(): void {
    this.favMedOrdersService.getAllMedorders().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.medordersList = data;
      console.log('Assign data to the MatTable Data source', this.medordersList);
      this.listMedOrders = new MatTableDataSource(this.medordersList);
      this.listMedOrders.sort = this.sort;
      this.listMedOrders.paginator = this.paginator
    });
  }
  retrieveDocFav(user) {
    console.log('the user received by this crap:::: ', user)
    this.favMedOrdersService.getFavByDoctor(user).snapshotChanges().subscribe(data => {
      this.favourites2 = data.payload.data().favmedorder;
      // this.favourites2.forEach(element => {
      //   this.medordersArray..concat(element);
      // });
      console.log('Med Order Array Contains:::::: ', this.favourites2)
    });

  }
  add2MyFavorite(item) {
    this.add2Cart(item);
  }
  add2Cart(item: any) {
    let result = this.compareTocart(item);
    if(result.length > 0){
      console.log('Do not add since exists!')
    }else{
      console.log('Adding since it doesnt exist!!!');
      this.cart.push(item);
    }
    console.log('Cart has these items', this.cart)
  }
  compareTocart(item: any) {
    return this.cart.filter(f => 
      f.id === item.id &&
      f.testID === item.testID);
  }
  saveCart() {
    if (this.cart.length == 0) {
      console.log('Cart is empty . . . ')
    } else {
      this.favMedOrdersService.updateFav(this.usr$, this.cart);
      this.cart = [];
    }
    this.loadCart();
  }
  loadCart() {
    this.favMedOrdersService.getUserId().subscribe(usr => {
      console.log('the user id is ::: ', usr.uid);
      this.usr$ = usr.uid;
      console.log('Loading FAV for the following doctor:  ', this.usr$)
      this.favMedOrdersService.getFavByDoctor(this.usr$).snapshotChanges().subscribe(data => {
        this.cart = data.payload.data().favmedorder;
        console.log('Cart Loaded  . . ', this.cart)
      });
    })
    }
retrieveAllFav(): void {
      this.favMedOrdersService.getAllFav().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.favourites = data;
      })
    }
onSearchClear() {
      this.ordersearchKey = "";
      this.applyFilter();
    }
applyFilter() {
      this.listMedOrders.filter = this.ordersearchKey.trim().toLowerCase();
    }
onClose() {
      this.dialog.closeAll();
    }
}
