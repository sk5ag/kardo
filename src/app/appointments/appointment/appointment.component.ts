import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor( 
    public appointmentService: AppointmentService,
  ) { }

  doctors = [
    {id:1, name:'Dr. Ibrahim Amin'},
    {id:2, name:'Dr. Muhabad Saeed'},
    {id:3, name:'Dr. Kozar Awat'},
  ];

  ngOnInit(): void {
  }
  onClear(){
    this.appointmentService.form.reset();
    this.appointmentService.initializeFormGroup()

  }
}
