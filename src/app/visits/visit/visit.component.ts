import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../shared/visit.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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
  filteredOptions: Observable<any[]>;
  filteredOrders: Observable<any[]>;
  myControl = new FormControl();
  orderControl = new FormControl();


  myOrders: any[] = [
    {
      "order_title": "Test 01", 
      "order_type": "This is a generic order",
      "order_category": "Category of the order",
    },
    {
      "order_title": "Test 02", 
      "order_type": "This is a generic order 2",
      "order_category": "Category of the order 2",
    },
  ];

  displayorderColumns: string[] = ['order_title', 'order_type', 'order_category', 'actions'];

  myTests: any[] = [
    {
      "generic_name": "Levothyroxine Sodium", 
      "active_ingredients": [{ "strength": ".075 mg/1", "name": "LEVOTHYROXINE SODIUM" }],
      "marketing_category": "NDA",
      "dosage_form": "TABLET",
      "route": ["ORAL"],
      "product_type": "HUMAN PRESCRIPTION DRUG"
    },
    {
      "generic_name": "acetylcysteine",
      "brand_name": "Levothyroxine Sodium",
      "active_ingredients": [{ "strength": "200 mg/mL", "name": "ACETYLCYSTEINE" }],
      "marketing_category": "NDA",
      "dosage_form": "INJECTION, SOLUTION",
      "route": ["INTRAVENOUS"],
      "product_type": "HUMAN PRESCRIPTION DRUG"
    },
    {
      "generic_name": "metoclopramide",
      "active_ingredients": [{ "strength": "5 mg/1", "name": "METOCLOPRAMIDE HYDROCHLORIDE" }],
      "marketing_category": "NDA",
      "dosage_form": "TABLET",
      "route": ["ORAL"],
      "product_type": "HUMAN PRESCRIPTION DRUG"
    },
    {
      "generic_name": "metoclopramide",
      "active_ingredients": [{ "strength": "10 mg/1", "name": "METOCLOPRAMIDE HYDROCHLORIDE" }],
      "marketing_category": "NDA",
      "dosage_form": "TABLET",
      "route": ["ORAL"],
      "product_type": "HUMAN PRESCRIPTION DRUG"
    },
    {
      "generic_name": "metoclopramide",
      "active_ingredients": [{ "strength": "5 mg/mL", "name": "METOCLOPRAMIDE HYDROCHLORIDE" }],
      "marketing_category": "NDA",
      "dosage_form": "INJECTION, SOLUTION",
      "route": ["INTRAVENOUS"],
      "product_type": "HUMAN PRESCRIPTION DRUG"
    },
  ];

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
    { vs_id: 1, value: 'Open' },
    { vs_id: 2, value: 'Close' },
    { vs_id: 3, value: 'Close & Wait' },
    { vs_id: 4, value: 'Refer & Wait' },
    { vs_id: 4, value: 'Refer & Close' },

  ];

  orders: any = [];
  // options: any=[];

  constructor(
    public visitService: VisitService,
    public visitdialogRef: MatDialogRef<VisitComponent>,
  ) {
    this.filteredOrders = this.orderControl.valueChanges
    .pipe(
      startWith(''),
      map(value => value ? this._filterOrder(value) : this.myOrders.slice())
    );

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.myTests.slice())
      );
  }

  private _filterOrder(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.myOrders.filter(option => option.order_title.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.myTests.filter(option => option.generic_name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    console.log('Visit ID: ', this.visitId)
    this.visitService.getVisits();
  }


  onClear() {
    this.visitService.form.reset();
    this.visitService.initializeFormGroup();
    this.visitService.initializevisitFormGroup();
    this.visitService.initializenotesFormGroup();
    this.visitService.initializeordersFormGroup();
    this.visitService.initializeprescriptionsFormGroup();
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
      this.visitService.initializevisitFormGroup();
      this.visitService.initializenotesFormGroup();
      this.visitService.initializeordersFormGroup();
      this.visitService.initializeprescriptionsFormGroup();
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
    this.visitService.initializevisitFormGroup();
    this.visitService.initializenotesFormGroup();
    this.visitService.initializeordersFormGroup();
    this.visitService.initializeprescriptionsFormGroup();
    console.log('the form reinitialized and will close dialog')
    this.visitdialogRef.close();
    console.log('dialog closed')
  }

  addOrder()
  {
    console.log('addOrder PRESSED - the values now: ', this.orders);
  
    if (this.visitService.ordersForm.untouched && this.visitService.ordersForm.invalid)
    {
      console.log('THIS FORM IS EMPTY...')
    }
    else{
      console.log('THIS FORM IS NOT EMPTY...')
      this.orders = this.orders.concat(this.visitService.ordersForm.value);
      console.log('addOrder PRESSED - the values after update: ', this.orders);
      this.visitService.initializeordersFormGroup()
    }
     
  }

  populateOrder(item)
  {
    console.log('POPULATE ORDER - function called', item);
    this.visitService.populateSelectedorder(item)
  }

  // saveTests(){
  //   console.log('save test button clicked', this.myTests);
  //   this.service.insertTest(this.myTests)
    
  // }

  removeTest(row){
    console.log('remove test button clicked', this.orders);
    this.orders = this.orders.filter(item => item !== row);
    console.log('after remove test button clicked', this.orders);
  }

}
