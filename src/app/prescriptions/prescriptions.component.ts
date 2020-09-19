import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  pharma: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  this.auth.user$.subscribe(user => {
    this.pharma = user.isPharma;

  });
}

}
