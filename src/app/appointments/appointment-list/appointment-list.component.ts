import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/app/Modal/appointments';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppointmentComponent } from '../appointment/appointment.component';
import { VisitService } from 'src/app/shared/visit.service';
import { VisitComponent } from 'src/app/visits/visit/visit.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(
    private appointmentService: AppointmentService,
    private visitService: VisitService,
    private dialog: MatDialog
    ) { }

  listData: MatTableDataSource<Appointment>;
  displayColumns: string[] = ['patientName', 'patientGender','patientAge', 'isWaiting', 'appointmentDoctor','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.appointmentService.getAppointments()
    .subscribe(
      list => {
        let array = list.map(
          item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data() as Appointment
            }
          }
        );
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

      }
      
    );
  }
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.appointmentService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "75%";
    dialogConfig.height = "90%";
    this.dialog.open(AppointmentComponent, dialogConfig)
  }


  // this isn't a good idea.. therefor i will do the convert using a cloud function
  //once completed, remove this function.
  
  onConvert(row){
    delete row.id;
    this.visitService.initializeFormGroup();
    this.visitService.populateForm(row);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "75%";
    dialogConfig.height = "90%";
    this.dialog.open(VisitComponent, dialogConfig)
  }

  onEdit(row){

    console.log('ROW: ' , row)

    this.appointmentService.populateForm(row);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "75%";
    dialogConfig.height = "90%";
    this.dialog.open(AppointmentComponent, dialogConfig)
  }

onDelete(row){
  if(confirm('Are you sure to delete this record?')){
    this.appointmentService.deleteAppointment(row.id)  
}
}

onChangeTrue(row){

  if(confirm('Confirm you want to changing this doctor visit to appointment?')){
    this.appointmentService.changeStatusTrue(row);
  }
}
onChangeFalse(row){

  if(confirm('Confirm you want to changing this appointment to doctor visit?')){
    this.appointmentService.changeStatusFalse(row);
  }
}

onWaitingTrue(element){
  if(confirm('Confirm you want to change the waiting status to [Waiting]?')){
    this.appointmentService.changeWaitTrue(element);
  }
}

onWaitingFalse(element){

  if(confirm('Confirm you want to change the waiting status to [Not Waiting]?')){
    this.appointmentService.changeWaitFalse(element);
  }
}

onClose(){
  this.dialog.closeAll();
}


}
