import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(
    public appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentComponent>,
  ) {

  }

  doctors = [
    { id: 1, name: 'Dr. Ibrahim Amin' },
    { id: 2, name: 'Dr. Muhabad Saeed' },
    { id: 3, name: 'Dr. Kozar Awat' },
  ];

  ngOnInit() {
    this.appointmentService.getAppointments()
  }

  onClear() {
    this.appointmentService.form.reset();
    this.appointmentService.initializeFormGroup()

  }


  onSubmit() {
    console.log('On-Submit - just been triggered and set these value: ', this.appointmentService.form.value);

    if (this.appointmentService.form.valid) {
      console.log('AHHH - this is a valid form, lets see.... the id value is: ');
      this.appointmentService.insertAppointment(this.appointmentService.form.value);

      // if (!this.appointmentService.form.get('id').value) {

      //   console.log('ON- SUBMIT - Perform an INSERT operation ..')
      //   this.appointmentService.insertAppointment(this.appointmentService.form.value);
      // }
      // else 
      //   console.log('ON- SUBMIT - Perform an UPDATE operation...', this.appointmentService.form.value)
      //   this.appointmentService.updateAppointment(this.appointmentService.form.value);


        this.appointmentService.form.reset();

        this.appointmentService.initializeFormGroup();
        this.onClose()
  
    }
    else {
      console.log('The form is not valid ...')

    }
  }

  onClose() {
    console.log('close function called');
    this.appointmentService.form.reset();
    console.log('form reset called and run')
    this.appointmentService.initializeFormGroup();
    console.log('the form reinitialized and will close dialog')
    this.dialogRef.close();
    console.log('dialog closed')
  }
}
