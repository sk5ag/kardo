import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RadOrderTableDataSource, RadOrderTableItem } from './rad-order-table-datasource';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rad-order-table',
  templateUrl: './rad-order-table.component.html',
  styleUrls: ['./rad-order-table.component.css']
})
export class RadOrderTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<RadOrderTableItem>;
  dataSource: RadOrderTableDataSource;
  rad_id: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rad_id', 'rad_name'];

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(rad_name: string, id: string) {
    this._snackBar.open(rad_name, id, {
      duration: 3000,
    });  }

  ngOnInit() {
    this.dataSource = new RadOrderTableDataSource();
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
