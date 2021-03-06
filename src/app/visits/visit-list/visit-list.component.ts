import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitService } from '../../shared/visit.service';
import { Visit } from '../../Modal/visit';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VisitComponent } from '../visit/visit.component';
import { VisitEditService } from '../../shared/visit-edit.service';
import { EditVisitComponent } from '../edit-visit/edit-visit.component';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {
  
  docEmail: string;
  docClinic: string;
  docId: string;

  constructor(
    private visitService: VisitService,
    private dialog: MatDialog,
    private visitedit: VisitEditService,
    public auth: AuthService
  ) { 
  
  }

  notesList:any = [];
  bufferArray:Array<any> = [];

  listData: MatTableDataSource<Visit>;
  displayColumns: string[] = ['patientName', 'patientGender', 'patientAge', 'isClosed', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;  

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.docEmail = user.email;
      this.docClinic =  user.clinic;
      this.docId = user.uid;
      console.log('Doctor Email: ', this.docEmail);
      console.log('Doctor Clinic: ', this.docClinic);

      this.visitService.getVisits(this.docEmail)
      .subscribe(
        list => {
          let array = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as Visit
              }
            }
          );
      
          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator; 
        
        }
      );
    });

  }  

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.visitService.initializeFormGroup();
    const visitdialogConfig = new MatDialogConfig();
    visitdialogConfig.disableClose = true;
    visitdialogConfig.autoFocus = true;
    visitdialogConfig.width = "75%";
    visitdialogConfig.height = "90%";
    this.dialog.open(VisitComponent, visitdialogConfig) 
  }

  onModify(row) {
    console.log('onEdit Called - here is the data in Row object: ', row.visitNotes)
    this.visitService.populateForm(row);
    this.visitService.populatevisitForm(row);

    const visitdialogConfig = new MatDialogConfig();
    visitdialogConfig.disableClose = true;
    visitdialogConfig.autoFocus = true;
    visitdialogConfig.width = "75%";
    visitdialogConfig.height = "90%";
    this.dialog.open(VisitComponent, visitdialogConfig)
    
  }

  onEdit(row) {
    console.log('onEdit Called - here is the data in Row object: ', row)
    // this.visitService.populateForm(row);
    // this.visitService.populatevisitForm(row);
    this.visitedit.sendMessage(row);
    const visitPrescriptiondialogConfig = new MatDialogConfig();
    visitPrescriptiondialogConfig.disableClose = true;
    visitPrescriptiondialogConfig.autoFocus = true;
    visitPrescriptiondialogConfig.width = "75%";
    visitPrescriptiondialogConfig.height = "90%";
    this.dialog.open(EditVisitComponent, visitPrescriptiondialogConfig)
    
  }

  onDelete(row) {
    if (confirm('Are you sure to delete this record?')) {
      this.visitService.deletevisit(row.id)
    }
  }

  onClose() {
    this.dialog.closeAll();
  }

}
