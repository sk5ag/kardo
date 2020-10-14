import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/Modal/user';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  myName: any;
  myClinic: any

  constructor(
    public appointmentService: AppointmentService,
    public userService: UserService,
    public dialogRef: MatDialogRef<AppointmentComponent>,
    public auth: AuthService,
  ) { }

  doctors = [
    { id: 1, name: 'Dr. Ibrahim Amin 2' },
    { id: 2, name: 'Dr. Muhabad Saeed' },
    { id: 3, name: 'Dr. Kozar Awat' },
  ];
  docArray = [];

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.myName = user.displayName;
      this.myClinic = user.clinic;
      this.userService.getUsers()
        .subscribe(
          list => {
            let array = list.map(
              usr => {
                return {
                  id: usr.payload.doc.id,
                  ...usr.payload.doc.data() as User
                }
              }
            )
            array.forEach(element => {
              if (this.myClinic == element.clinic) {
                this.docArray.push(element)
              }
            });
            console.log('Values inside docArray', this.docArray)
          }          
        );
    });
    console.log('Doctor names: ', this.docArray);

    
    this.appointmentService.getAppointments()
  }

  onClear() {
    this.appointmentService.form.reset();
    this.appointmentService.initializeFormGroup()

  }


  onSubmit() {
    this.appointmentService.changeClinic(this.appointmentService.form.value, this.myClinic);
    this.appointmentService.changeUsername(this.appointmentService.form.value, this.myName);

    if (this.appointmentService.form.valid) {

      if (!this.appointmentService.form.get('id').value) {

        this.appointmentService.insertAppointment(this.appointmentService.form.value);
      }
      else 
        this.appointmentService.updateAppointment(this.appointmentService.form.value);
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
