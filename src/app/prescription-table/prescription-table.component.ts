import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PrescriptionTableDataSource, PrescriptionTableItem } from './prescription-table-datasource';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.css'],

})
export class PrescriptionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PrescriptionTableItem>;
  dataSource: PrescriptionTableDataSource;
  expandedElement: PrescriptionTableItem | null;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['generic_name', 'strength', 'dosage_form'];
  
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(note: string, id: string) {
    this._snackBar.open(note, id, {
      duration: 3000,
    });  }

  ngOnInit() {
    this.dataSource = new PrescriptionTableDataSource();
    console.log(this.dataSource.data);
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
    
  }
}
