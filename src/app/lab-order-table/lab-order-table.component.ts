import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LabOrderTableDataSource, LabOrderTableItem } from './lab-order-table-datasource';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lab-order-table',
  templateUrl: './lab-order-table.component.html',
  styleUrls: ['./lab-order-table.component.css']
})
export class LabOrderTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<LabOrderTableItem>;
  dataSource: LabOrderTableDataSource;
  test_id: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['test_id', 'test_name'];

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(test_name: string, id: string) {
    this._snackBar.open(test_name, id, {
      duration: 3000,
    });  }
    
  ngOnInit() {
    this.dataSource = new LabOrderTableDataSource();
    this.test_id=this.dataSource?.data.length;
    this.test_id++;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
  onSubmit(frm: NgForm) {
   this.dataSource.data.push(frm.value);

  }
}
