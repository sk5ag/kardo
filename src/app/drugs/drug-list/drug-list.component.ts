import { Component, OnInit, ViewChild } from '@angular/core';
import { DrugService } from 'src/app/shared/drug.service';
import { Drug } from 'src/app/Modal/drug';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DrugComponent } from '../drug/drug.component';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})
export class DrugListComponent implements OnInit {

  constructor(
    private drugService: DrugService,
    private dialog: MatDialog,
  ) { }

  listData: MatTableDataSource<Drug>;
  displayColumns: string[] = ['generic_name', 'strength','ingredient', 'dosage_form', 'route','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {    
    this.drugService.getDrugs()
    .subscribe(
      list => {
        let array = list.map(
          item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data() as Drug
            }
          }
        );
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }      
    );
  }

  
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.drugService.initializedrugFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "75%";
    dialogConfig.height = "90%";
    this.dialog.open(DrugComponent, dialogConfig)
  }

  onEdit(row){

    this.drugService.populateForm(row);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "75%";
    dialogConfig.height = "90%";
    this.dialog.open(DrugComponent, dialogConfig)
  }

onDelete(row){
  if(confirm('Are you sure to delete this record?')){
    this.drugService.deleteDrug(row.id)  
}

}

onClose(){
  this.dialog.closeAll();
}

}
