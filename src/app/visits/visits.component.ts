import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  doctor: boolean;


  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  this.auth.user$.subscribe(user => {
    this.doctor = user.isDoctor;
  });
}

  
}
