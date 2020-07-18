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

  
  onSubmit() {
    console.log('onSubmit button clicked ...')
    if (this.appointmentService.form.valid) {
      this.appointmentService.insertTest(this.appointmentService.form.value);
      console.log('form has been submitted to insert function ...')

      this.appointmentService.form.reset();
      console.log('form has been reset ...')

      this.appointmentService.initializeFormGroup();
      console.log('form has been initialized with empty strings ...')
    }
    else{
      console.log('form not validated ...')

    }
  }
}
