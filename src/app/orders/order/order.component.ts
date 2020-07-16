import { Component, OnInit } from '@angular/core'; 
import { OrderService } from '../../shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public orderService: OrderService,
  ) { }

  orders = [
    {order_id:1, patient_name:'Donald Duck', patient_age:'20', patient_gender:'Male', orderTitle:'Procedure 001'},
    {order_id:2, patient_name:'Tom an Jerry', patient_age:'30', patient_gender:'Male', orderTitle:'Test 002'},
    {order_id:3, patient_name:'John Smith', patient_age:'40', patient_gender:'Female', orderTitle:'Procedure 008'},
    {order_id:4, patient_name:'Eddy Murphy', patient_age:'45', patient_gender:'Male', orderTitle:'Test 001'},
    {order_id:5, patient_name:'Peppa Pig', patient_age:'50', patient_gender:'Other', orderTitle:'Test 100'},
    {order_id:6, patient_name:'Laura Explorer', patient_age:'60', patient_gender:'Female', orderTitle:'Procedure 011'},
  ];

  tests = [
    {test_id: 1, shortcode: 'Procedure 001'},
    {test_id: 2, shortcode: 'Procedure 002'},
    {test_id: 3, shortcode: 'Procedure 003'},
    {test_id: 4, shortcode: 'Procedure 004'},
    {test_id: 5, shortcode: 'Test 001'},
    {test_id: 6, shortcode: 'Test 002'},
    {test_id: 7, shortcode: 'Test 003'},
    {test_id: 8, shortcode: 'Test 004'},
  ];


  ngOnInit(): void {
  }
  onClear(){
    this.orderService.form.reset();
    this.orderService.initializeFormGroup()
  }
}
