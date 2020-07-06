import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RadOrderTableDataSource, RadOrderTableItem } from './rad-order-table-datasource';
import { NgForm } from '@angular/forms';

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

  ngOnInit() {
    this.dataSource = new RadOrderTableDataSource();
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
