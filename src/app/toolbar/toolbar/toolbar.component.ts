import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  pharma: boolean;
  doctor: boolean;
  medOrder: boolean;


  constructor(public auth: AuthService) { }

  onSignOut(){
    this.auth.signOut();
  }
  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.pharma = user.isPharma;
      this.doctor = user.isDoctor;
      this.medOrder = user.isMedOrder;

    });
  }

}
