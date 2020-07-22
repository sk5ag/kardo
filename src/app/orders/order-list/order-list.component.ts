import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { Order } from 'src/app/Modal/order';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) { }

  listData: MatTableDataSource<Order>;
  displayColumns: string[] = ['patientName', 'patientGender', 'patientAge', 'isCompleted', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.orderService.getOrders()
      .subscribe(
        list => {
          let array = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as Order
              }
            }
          );
          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        }
      );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.orderService.initializeFormGroup();
    const orderdialogConfig = new MatDialogConfig();
    orderdialogConfig.disableClose = true;
    orderdialogConfig.autoFocus = true;
    orderdialogConfig.width = "75%";
    orderdialogConfig.height = "90%";
    this.dialog.open(OrderComponent, orderdialogConfig)
  }

  onEdit(row) {

    this.orderService.populateForm(row);
    const orderdialogConfig = new MatDialogConfig();
    orderdialogConfig.disableClose = true;
    orderdialogConfig.autoFocus = true;
    orderdialogConfig.width = "75%";
    orderdialogConfig.height = "90%";
    this.dialog.open(OrderComponent, orderdialogConfig)
  }

  onDelete(row) {
    if (confirm('Are you sure to delete this record?')) {
      this.orderService.deleteOrder(row.id)
    }
  }

  onClose() {
    this.dialog.closeAll();
  }

}
