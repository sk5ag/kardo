import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LabOrderTableDataSource, LabOrderTableItem } from './lab-order-table-datasource';
import { NgForm } from '@angular/forms';

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

  ngOnInit() {
    this.dataSource = new LabOrderTableDataSource();
    this.test_id=this.dataSource?.data.length;
    this.test_id++;
    console.log('Lab order length is: '+this.test_id);
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
