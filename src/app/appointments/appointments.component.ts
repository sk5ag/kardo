import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  assistant: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.assistant = user.isAssistant;
    });
  }

}
