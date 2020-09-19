import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  medOrder: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  this.auth.user$.subscribe(user => {
    this.medOrder = user.isMedOrder;

  });
}

}
