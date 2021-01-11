import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { MedOrder } from 'src/app/Modal/medorder';
import { OrderService } from 'src/app/shared/order.service';
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
    public orderService: OrderService,

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

  onUpdateList(item){


    console.log('isDispensed is set to ::: ', item.isComplete);
    console.log('Changing status of this item ::: ', item.id);

    if(confirm('Are you sure you want to change this prescription status?\n\n')){
      if (item.isComplete == false){
        this.orderArray[0].order.forEach(element => {
          console.log('ELEMENT ID :::', element.id );  
          if (element.id == item.id){
            element.isComplete = true;
          }    
        });
        console.log('array updated ::: ', this.orderArray[0]);
      }else{
        this.orderArray[0].order.forEach(element => {
          console.log('ELEMENT ID :::', element.id );  
          if (element.id == item.id){
            element.isComplete = false;
          }    
        });
        console.log('array updated ::: ', this.orderArray[0]);
  
      };
      this.orderService.updateOrder(this.orderArray[0]);

    }else{
      console.log('Nothing changed..')
    }

  }

  ngOnDestroy(){
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();  
  }

}
