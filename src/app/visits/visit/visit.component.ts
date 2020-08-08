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
  visitId = Math.random().toString(20).substr(2, 6);
  filteredOrders: Observable<any[]>;
  filteredNotes: Observable<any[]>;
  filteredPrescription: Observable<any[]>;

  orderControl = new FormControl();
  noteControl = new FormControl();
  prescriptionControl = new FormControl();

  
  myPrescriptions: any[] = [
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
  displayprescriptionColumns: string[] = ['generic_name', 'dosage_form', 'route', 'active_ingredients', 'actions'];


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

  myNotes: any[] = [
    {
      "note_title": "Note 01", 
      "note_description": "This is a generic note",
    },
    {
      "note_title": "Note 02", 
      "note_description": "This is a generic note",
    },
  ];
  
  displaynoteColumns: string[] = ['note_title', 'note_description', 'actions'];

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

  visits: any = [];
  orders: any = [];
  notes: any = [];
  prescriptions: any=[];
  heartPrescription: any = [];

  constructor(
    public visitService: VisitService,
    public visitdialogRef: MatDialogRef<VisitComponent>,
  ) {

    this.filteredNotes = this.noteControl.valueChanges
    .pipe(
      startWith(''),
      map(notevalue => notevalue ? this._filterNote(notevalue) : this.myNotes.slice())
    );

    this.filteredOrders = this.orderControl.valueChanges
    .pipe(
      startWith(''),
      map(ordervalue => ordervalue ? this._filterOrder(ordervalue) : this.myOrders.slice())
    );

    this.filteredPrescription = this.prescriptionControl.valueChanges
      .pipe(
        startWith(''),
        map(prescriptionvalue => prescriptionvalue ? this._filterPrescription(prescriptionvalue) : this.myPrescriptions.slice())
      );

  }


  private _filterNote(value_note: string): string[] {
    const notefilterValue = value_note.toLowerCase();
    return this.myNotes.filter(noteOption => noteOption.note_title.toLowerCase().indexOf(notefilterValue) === 0);
  }

  private _filterOrder(value_order: string): string[] {
    const orderfilterValue = value_order.toLowerCase();
    return this.myOrders.filter(orderOption => orderOption.order_title.toLowerCase().indexOf(orderfilterValue) === 0);
  }

  private _filterPrescription(value_prescription: string): string []{    
    const prescriptionfilterValue = value_prescription.toLowerCase();
    return this.myPrescriptions.filter(prescriptionOption => prescriptionOption.generic_name.toLowerCase().indexOf(prescriptionfilterValue) === 0);
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

  addVisit()
  {
    console.log('addVisit PRESSED - the values now: ', this.visits);
  
    if (this.visitService.form.invalid || !this.visitService.form.get('patientName').value)
    {
      console.log('THIS FORM IS EMPTY...', this.visitService.form.get('patientName').value)
    }
    else{
      console.log('THIS FORM IS NOT EMPTY...',this.visitService.form.get('patientName').value)
      this.visits = this.visits.concat(this.visitService.form.value);
      this.visits[0].id = this.visitId;
      console.log('addVisit PRESSED - the values after update: ', this.visits);
      this.visitService.form.reset();
      this.visitService.initializeFormGroup()
    }
  }

  addNote()
  {
    console.log('addNote PRESSED - the values now: ', this.notes);
  
    if (this.visitService.notesForm.invalid || !this.visitService.notesForm.get('note_title').value)
    {
      console.log('THIS FORM IS EMPTY...', this.visitService.notesForm.get('note_title').value)
    }
    else{
      console.log('THIS FORM IS NOT EMPTY...',this.visitService.notesForm.get('note_title').value)
      this.notes = this.notes.concat(this.visitService.notesForm.value);
      console.log('addNote PRESSED - the values after update: ', this.notes);
      this.visitService.notesForm.reset();
      this.visitService.initializenotesFormGroup()
    }
    this.noteControl.setValue('');
  }

  addOrder()
  {
    console.log('addOrder PRESSED - the values now: ', this.orders);
  
    if (this.visitService.ordersForm.invalid || !this.visitService.ordersForm.get('order_title').value)
    {
      console.log('THIS FORM IS EMPTY...', this.visitService.ordersForm.get('order_title').value)
    }
    else{
      console.log('THIS FORM IS NOT EMPTY...',this.visitService.ordersForm.get('order_title').value)
      this.orders = this.orders.concat(this.visitService.ordersForm.value);
      console.log('addOrder PRESSED - the values after update: ', this.orders);
      this.visitService.ordersForm.reset();
      this.visitService.initializeordersFormGroup()
    }
    this.orderControl.setValue('');
  }

  addPrescription()
  {
    console.log('addPrescription PRESSED - the values now: ', this.prescriptions);
  
    if (this.visitService.prescriptionsForm.invalid || !this.visitService.prescriptionsForm.get('generic_name').value)
    {
      console.log('THIS FORM IS EMPTY...', this.visitService.prescriptionsForm.get('generic_name').value)
    }
    else{
      console.log('THIS FORM IS NOT EMPTY...',this.visitService.prescriptionsForm.get('generic_name').value)
      this.prescriptions = this.prescriptions.concat(this.visitService.prescriptionsForm.value);
      console.log('addPrescription PRESSED - the values after update: ', this.prescriptions);
      this.visitService.prescriptionsForm.reset();
      this.visitService.initializeprescriptionsFormGroup();
    }
    this.prescriptionControl.setValue('');
    
  }

  populateNote(item)
  {
    console.log('POPULATE NOTE - function called', item);
    this.visitService.populateSelectednote(item);
  }

  populateOrder(item)
  {
    console.log('POPULATE ORDER - function called', item);
    this.visitService.populateSelectedorder(item)
  }

  populatePrescription(item)
  {
    console.log('');
    console.log('1 - POPULATE PRESCRIPTION', item);
    this.visitService.populateSelectedprescription(item);

    console.log('');
    console.log('5 - back to component, check if item array is empty: ', item);
    console.log('------------------------------------');

    item=[];
    console.log('6 - LOCALLY EMPTIED THE item ARRAY - whats in it for now?', item);

    this.prescriptionControl.setValue('');
    console.log('7 - prescription control has been reset');

    console.log('=======================================');
  
  }

  removeNote(row){
    console.log('remove test button clicked', this.notes);
    this.notes = this.notes.filter(item => item !== row);
    console.log('after remove test button clicked', this.notes);
  }

  removeTest(row){
    console.log('remove test button clicked', this.orders);
    this.orders = this.orders.filter(item => item !== row);
    console.log('after remove test button clicked', this.orders);
  }
  removePrescription(row){
    console.log('remove prescription button clicked', this.prescriptions);
    this.prescriptions = this.prescriptions.filter(item => item !== row);
    console.log('after remove prescription button clicked', this.prescriptions);
  }


}
