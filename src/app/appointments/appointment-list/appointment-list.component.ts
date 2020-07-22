import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/app/Modal/appointments';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(
    private appointmentService: AppointmentService,
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

  onEdit(row){

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

onClose(){
  this.dialog.closeAll();
}


}
