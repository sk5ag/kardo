import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { MedOrder } from 'src/app/Modal/medorder';
import { OrderEditService } from '../../shared/order-edit.service';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css']
})
export class EditOrdersComponent implements OnDestroy {

  subscription: Subscription;
  orderArray: any[] = [];
  listOrderData: MatTableDataSource<MedOrder>;
  displayOrderColumns: string[] = ['medorder_title', 'medorder_category', 'medorder_description', 'actions'];
  orderTable: any[] = [];

  constructor(
    private OrderMsgService: OrderEditService,
    public orderDialogRef: MatDialogRef<OrderEditService>,

  ) {
    this.orderArray = [],
      // subscribe to home component messages
      this.subscription = this.OrderMsgService.getMessage().subscribe(message => {
        if (message){
          this.orderArray.push(message);
          console.log('HERE IS THE ORDER MESSAGE: ', this.orderArray[0].id);
        } else {
             // clear messages when empty message received
          //console.log('Empty message received!!');
          this.orderArray = [];
        }
      }
     
      )
  }

  ngOnInit(){
    console.log('Items in the order section: ', this.orderArray[0].order);
    this.orderTable.push(this.orderArray[0].order);
    console.log('Items in the order TABLE: ', this.orderTable[0]);
  }
  
  onClose() {
    // Close opened dialogbox
    this.orderDialogRef.close();
  }

  ngOnDestroy(){
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();  
  }

}
