import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PrescriptionTableDataSource, PrescriptionTableItem } from './prescription-table-datasource';
import { NgForm } from '@angular/forms';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['generic_name', 'strength', 'dosage_form', 'instruction_for_use', 'supply'];

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
