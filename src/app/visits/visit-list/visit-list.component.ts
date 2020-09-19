import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitService } from '../../shared/visit.service';
import { Visit } from '../../Modal/visit';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VisitComponent } from '../visit/visit.component';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  constructor(
    private visitService: VisitService,
    private dialog: MatDialog
  ) { }

  listData: MatTableDataSource<Visit>;
  displayColumns: string[] = ['patientName', 'patientGender', 'patientAge', 'isClosed', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.visitService.getVisits()
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

  onEdit(row) {
    this.visitService.populateForm(row);
    const visitdialogConfig = new MatDialogConfig();
    visitdialogConfig.disableClose = true;
    visitdialogConfig.autoFocus = true;
    visitdialogConfig.width = "75%";
    visitdialogConfig.height = "90%";
    this.dialog.open(VisitComponent, visitdialogConfig)
    
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
