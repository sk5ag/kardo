import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DoctorNotesTableDataSource, DoctorNotesTableItem } from './doctor-notes-table-datasource';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  note_id: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['note'];

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(note: string, id: string) {
    this._snackBar.open(note, id, {
      duration: 3000,
    });
  }


  ngOnInit() {
    this.dataSource = new DoctorNotesTableDataSource();
    this.note_id = this.dataSource?.data.length;
    this.note_id++;
    console.log('Doctor note length is: ' + this.note_id);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onSubmit(frm: NgForm) {
    console.log(frm.value);
    this.dataSource.data.push(frm.value);
    console.log(frm.valid);
    console.log(this.dataSource.data);
    frm.reset();
    this.note_id = this.dataSource?.data.length;
    this.note_id++;
    console.log('Data after frm reset: ' + this.note_id);
    this.table.dataSource = this.dataSource;

  }

}
