import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { from, Observable, Subscription } from 'rxjs';
import { VisitEditService } from '../../shared/visit-edit.service';
import { DrugService } from '../../shared/drug.service';
import { MedordersService } from '../../shared/medorders.service';
import { MatTableDataSource } from '@angular/material/table';
import { FavmedorderService } from '../../shared/favmedorder.service';
import { AuthService } from '../../shared/auth.service';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { VisitPrescription } from 'src/app/Modal/visitPrescription';
import { MedOrder } from 'src/app/Modal/medorder';
import { Drug } from 'src/app/Modal/drug';
import { VisitService } from '../../shared/visit.service';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.css']
})
export class EditVisitComponent implements OnDestroy {

  visitArray: any[] = [];
  visitPrescription: any[] = [];
  prescriptionCount = 0;
  visitOrder: any[] = [];
  orderCount = 0;
  orderOn: boolean = false;
  prescriptionOn: boolean = true;
  // testData = [
  //   {generic_name: "Paracetamol", strength: "125 mg/l", dosage_form:"Tablet", route: "Oral", isDispensed: true},
  //   {generic_name: "Simvol", strength: "05 mg/l", dosage_form:"Tablet", route: "Oral", isDispensed: false},

  // ];

  subscription: Subscription;
  listPrescriptionData: MatTableDataSource<VisitPrescription>;
  listOrderData: MatTableDataSource<MedOrder>;
  FavMedOrderList: any = [];
  FavMedOrderbuffer: any = [];

  displayPrescriptionColumns: string[] = ['generic_name', 'strength', 'dosage_form', 'route', 'actions'];
  displayOrderColumns: string[] = ['medorder_title', 'medorder_category', 'medorder_description', 'actions'];
  displayFavMedOrderColumns: string[] = ['medorder_title', 'medorder_category', 'medorder_description', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  prescription_searchKey: string;
  order_searchKey: string;
  docID: string;

  constructor(
    private messageService: VisitEditService,
    private visitService: VisitService,
    private drugService: DrugService,
    private medorderService: MedordersService,
    private FavmedorderService: FavmedorderService,
    private afAuth: AuthService,


    public visitPrescriptiondialogRef: MatDialogRef<EditVisitComponent>,
  ) {

    this.visitArray = [],
      // subscribe to home component messages
      this.subscription = this.messageService.getMessage().subscribe(message => {
        if (message) {
          this.visitArray.push(message);
          console.log('HERE IS THE MESSAGE: ', this.visitArray[0].id)
        } else {
          // clear messages when empty message received
          //console.log('Empty message received!!');
          this.visitArray = [];
        }
      });

  }

  ngOnInit() {

    this.afAuth.user$.subscribe(usr => {
      this.docID = usr.uid;
      console.log('USER ID :::: ', this.docID);

      this.FavmedorderService.getDocID(this.docID)
      .subscribe(
        list => {
          let favorderArray = list.data()
          
          this.FavMedOrderbuffer = favorderArray.favmedorder;
          console.log('FavMedOrderBuffer', this.FavMedOrderbuffer.favmedorder);
          console.log('favorderarray:::', favorderArray.favmedorder)
        }
      );
    });   



    console.log('are you looking for:', this.FavMedOrderbuffer);


    this.drugService.getDrugs()
      .subscribe(
        list => {
          let prescriptionArray = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as Drug
              }
            }
          );
          this.listPrescriptionData = new MatTableDataSource(prescriptionArray);
          this.listPrescriptionData.sort = this.sort;
          this.listPrescriptionData.paginator = this.paginator;
        }
      );

    this.visitArray.forEach(element => {
      this.visitPrescription.push(element.prescription);
      console.log('Items in prescription array counts to :', element.prescription.length);
      this.prescriptionCount = element.prescription.length;
    });

    this.medorderService.getMedorders()
      .subscribe(
        list => {
          let orderArray = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as MedOrder
              }
            }
          );
          this.listOrderData = new MatTableDataSource(orderArray);
          this.listOrderData.sort = this.sort;
          this.listOrderData.paginator = this.paginator;
        }
      );

    this.visitArray.forEach(element => {
      this.visitOrder.push(element.order);
      console.log('Items in order array counts to :', element.order.length);
      this.orderCount = element.order.length;
    });
  }

  addPrescription() {
    this.visitPrescription[0].push({ generic_name: "Iron", strength: "25 mg/L", dosage_form: "Tablet", route: "Oral", isDispensed: true });
    this.prescriptionCount + 1;
  }

  addOrder() {
    this.visitOrder[0].push({ medorder_title: "Test 1", medorder_category: "Test 2", medorder_description: "Test 3" })
  }
  applyPrescriptionFilter() {
    this.listPrescriptionData.filter = this.prescription_searchKey.trim().toLowerCase();
  }

  applyOrderFilter() {
    this.listOrderData.filter = this.order_searchKey.trim().toLowerCase();
  }

  onAdd(row) {
    console.log('Items in the ROW object', row);
    var data = Object.assign(row, { isDispensed: false });
    console.log('Items in the ROW object after added fields', data);

    if (!this.visitPrescription[0]) {
      //console.log('Its Empty');
      this.visitPrescription = [];
      this.visitPrescription.push([data]);
      //console.log('visitPrescription: ', this.visitPrescription);
      this.visitArray[0] = Object.assign(this.visitArray[0], { prescription: [data] })
    } else {
      this.visitPrescription[0].push(data);
    };
    this.prescription_searchKey = '';
    this.prescriptionCount = this.prescriptionCount + 1;
    console.log('Prescription Count', this.prescriptionCount);

  }

  removePrescription(j) {
    console.log('items in visitOrder:', this.visitPrescription[0][j]);
    console.log('remove order called for: ', j);
    this.visitPrescription[0].splice(j, 1);
    console.log('items in visitOrder:', this.visitPrescription);
    this.prescriptionCount = this.prescriptionCount - 1;
    console.log('Prescription Count', this.prescriptionCount);
  }

  onAddOrder(row) {
    console.log('Items in the ORDER object', row);

    if (!this.visitOrder[0]) {
      //console.log('Its Empty');
      this.visitOrder = [];
      this.visitOrder.push([row]);
      //console.log('visitPrescription: ', this.visitPrescription);
      this.visitArray[0] = Object.assign(this.visitArray[0], { order: [row] })
    } else {
      this.visitOrder[0].push(row);
    }
    this.order_searchKey = '';
    this.orderCount = this.orderCount + 1;
    console.log('Order Count', this.orderCount);
  }

  removeOrder(i) {
    console.log('items in visitOrder:', this.visitOrder[0][i]);
    console.log('remove order called for: ', i);
    this.visitOrder[0].splice(i, 1);
    console.log('items in visitOrder:', this.visitOrder);
    this.orderCount = this.orderCount - 1;
    console.log('Order Count', this.orderCount);
  }

  onUpdate() {
    this.visitService.updateVisit(this.visitArray);
    this.onClose();
  }


  onClose() {
    // Close opened dialogbox
    this.visitPrescriptiondialogRef.close();
  }

  onSwitch() {
    if (this.prescriptionOn == false && this.orderOn == true) {
      this.prescriptionOn = true;
      this.orderOn = false;
    } else {
      this.prescriptionOn = false;
      this.orderOn = true;
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}