import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/app/Modal/appointments';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(private appointmentService: AppointmentService) { }

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
        // this.listData.filterPredicate = (arrayData, filter) => {
        //   return this.displayColumns.some(ele => {
        //       return ele !='actions' && arrayData[ele].toLowerCase().indexOf(filter) != -1;
        //     });
        // };
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

}
