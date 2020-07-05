import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DoctorNotesTableDataSource, DoctorNotesTableItem } from './doctor-notes-table-datasource';

@Component({
  selector: 'app-doctor-notes-table',
  templateUrl: './doctor-notes-table.component.html',
  styleUrls: ['./doctor-notes-table.component.css']
})
export class DoctorNotesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DoctorNotesTableItem>;
  dataSource: DoctorNotesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new DoctorNotesTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
