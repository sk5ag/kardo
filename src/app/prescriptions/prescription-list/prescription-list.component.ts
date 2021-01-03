import { Component, OnInit, ViewChild } from '@angular/core';
import { PrescriptionService } from '../../shared/prescription.service';
import { Prescriptions } from '../../Modal/prescriptions';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { PrescriptionEditService } from 'src/app/shared/prescription-edit.service';
import { EditPrescriptionsComponent } from '../edit-prescriptions/edit-prescriptions.component';


@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  constructor(
    private prescriptionService: PrescriptionService,
    private dialog: MatDialog,
    private prescriptionedit: PrescriptionEditService
  ) { }

  listPrescriptionData: MatTableDataSource<Prescriptions>;
  displayColumns: string[] = ['patientName', 'patientGender', 'patientAge', 'isDispensed', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    
    this.prescriptionService.getPrescriptions()
      .subscribe(
        list => {
          let arrayPrescription = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as Prescriptions
              }
            }
          );
          console.log('=== Is there an error? : ', arrayPrescription),
          this.listPrescriptionData = new MatTableDataSource(arrayPrescription);
          this.listPrescriptionData.sort = this.sort;
          this.listPrescriptionData.paginator = this.paginator;
        }
      );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
 
  applyFilter() {
    this.listPrescriptionData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.prescriptionService.initializeFormGroup();
    const prescriptiondialogConfig = new MatDialogConfig();
    prescriptiondialogConfig.disableClose = true;
    prescriptiondialogConfig.autoFocus = true;
    prescriptiondialogConfig.width = "75%";
    prescriptiondialogConfig.height = "90%";
    this.dialog.open(PrescriptionComponent, prescriptiondialogConfig)
  }

  onEdit(row) {
    console.log('onEdit Called - here is the data in Row object: ', row)

    this.prescriptionedit.sendMessage(row);
    // this.prescriptionService.populateForm(row);
    const prescriptiondialogConfig = new MatDialogConfig();
    prescriptiondialogConfig.disableClose = true;
    prescriptiondialogConfig.autoFocus = true;
    prescriptiondialogConfig.width = "75%";
    prescriptiondialogConfig.height = "90%";
    this.dialog.open(EditPrescriptionsComponent, prescriptiondialogConfig)
  }

  
  onDelete(row) {
    if (confirm('Are you sure to delete this record?')) {
      this.prescriptionService.deleteOrder(row.id)
    }
  }

  onClose() {
    this.dialog.closeAll();
  }
}
