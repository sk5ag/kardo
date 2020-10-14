import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {

  drugAdmin: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.drugAdmin = user.isdrugAdmin;
    });
  }

}
