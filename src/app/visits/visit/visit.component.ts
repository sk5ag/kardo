import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../shared/visit.service';
import { MatDialogRef } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith, concatAll} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Test } from 'src/app/Modal/test';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  today: number = Date.now();
  visitId = Math.random().toString(20).substr(2, 6)
  mainArray = [];
  visitArray = [];
  notesArray = [];
  ordersArray = [];
  prescriptionsArray = [];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  myTests = [
    {name: 'kardo', secondName: 'sarbast', A: '1234567890', B: 'asdfghjklpo'},
    {name: 'kurda', secondName: 'AWAT', A: '1234567890', B: 'asdfghjklpo'},
    {name: 'chenar', secondName: 'Sarbast', A: '1234567890', B: 'asdfghjklpo'}
  ];
  
  options: any=[];

  constructor(
    public visitService: VisitService,
    public visitdialogRef: MatDialogRef<VisitComponent>,
  ) { }


  bloodgroups = [
    { bg_id: 1, value: 'A+' },
    { bg_id: 2, value: 'A-' },
    { bg_id: 3, value: 'B+' },
    { bg_id: 4, value: 'B-' },
    { bg_id: 5, value: 'O+' },
    { bg_id: 6, value: 'O-' },
    { bg_id: 7, value: 'AB+' },
    { bg_id: 8, value: 'AB-' },
  ];
  visitstatus = [
    { vs_id: 1, value: 'Open'},
    { vs_id: 2, value: 'Close'},
    { vs_id: 3, value: 'Close & Wait'},
    { vs_id: 4, value: 'Refer & Wait'},
    { vs_id: 4, value: 'Refer & Close'},

  ];
  ngOnInit() {
    console.log('Visit ID: ', this.visitId)
    this.visitService.getVisits();

    this.myTests.forEach(element => {
      this.options.push(element.name+' | '+element.secondName+' | '+element.A+' | '+element.B)
    });

    console.log('Values inside OPTIONS: ', this.options);
     this.filteredOptions = this.myControl.valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter(value))
     );
  }

   private _filter(value: string): string[] {
     const filterValue = value.toLowerCase();
     return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onClear() {
    this.visitService.form.reset();
    this.visitService.initializeFormGroup()

  }

  onSubmit() {
    if (this.visitService.form.valid) {
      if (!this.visitService.form.get('id').value) {
        this.visitService.insertVisit(this.visitService.form.value);
      }
      else
        this.visitService.updateVisit(this.visitService.form.value);
      this.visitService.form.reset();
      this.visitService.initializeFormGroup();
      this.onClose()
    }
    else {
      console.log('The form is not valid ...')
    }
  }

  onClose() {
    console.log('close function called');
    this.visitService.form.reset();
    console.log('form reset called and run')
    this.visitService.initializeFormGroup();
    console.log('the form reinitialized and will close dialog')
    this.visitdialogRef.close();
    console.log('dialog closed')
  }


}
