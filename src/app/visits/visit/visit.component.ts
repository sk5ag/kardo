import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../shared/visit.service';
import { DrugService } from '../../shared/drug.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Drug } from 'src/app/Modal/drug';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  pipe = new DatePipe('en-US');
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'short');

  today: number = Date.now();
  visitId: string;
  filteredOrders: Observable<any[]>;
  filteredNotes: Observable<any[]>;
  filteredPrescription: Observable<any[]>;

  orderControl = new FormControl();
  noteControl = new FormControl();
  prescriptionControl = new FormControl();

  myPrescriptions: any[] = [
    // {
    //   "generic_name": "Levothyroxine Sodium", 
    //   "active_ingredients": [{ "strength": ".075 mg/1", "name": "LEVOTHYROXINE SODIUM" }],
    //   "marketing_category": "NDA",
    //   "dosage_form": "TABLET",
    //   "route": ["ORAL"],
    //   "product_type": "HUMAN PRESCRIPTION DRUG"
    // }
  ];

  displayprescriptionColumns: string[] = ['generic_name', 'strength', 'dosage_form', 'route', 'active_ingredients', 'actions'];

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
      "examination_title": "Note 01",
      "examination_description": "This is a generic note",
    },
    {
      "examination_title": "Note 02",
      "examination_description": "This is a generic note",
    },
  ];

  displaynoteColumns: string[] = ['examination_title', 'examination_description', 'actions'];

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
  prescriptions: any = [];
  heartPrescription: any = [];
  noteItems = {};
  orderItems = {};
  prescriptionItems = {};

  constructor(
    public visitService: VisitService,
    public drugService: DrugService,
    public visitdialogRef: MatDialogRef<VisitComponent>,
  ) {

    // console.log('Constructor #1');
    this.drugService.getDrugs()
      .subscribe(
        list => {
          let medArray = list.map(
            item => {
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as Drug
              }
            }
          )
          this.myPrescriptions = this.myPrescriptions.concat(medArray);
          // console.log('VALUE IN myPrescription', this.myPrescriptions);

          this.filteredPrescription = this.prescriptionControl.valueChanges
            .pipe(
              startWith(''),
              map(prescriptionvalue => prescriptionvalue ? this._filterPrescription(prescriptionvalue) : this.myPrescriptions.slice())
            );
          // console.log('Constructor #5 - Filtered Prescriptions', this.filteredPrescription); 

        }
      )

    // console.log('Constructor #2', this.myPrescriptions);

    this.filteredNotes = this.noteControl.valueChanges
      .pipe(
        startWith(''),
        map(notevalue => notevalue ? this._filterNote(notevalue) : this.myNotes.slice())
      );

    // console.log('Constructor #3');

    this.filteredOrders = this.orderControl.valueChanges
      .pipe(
        startWith(''),
        map(ordervalue => ordervalue ? this._filterOrder(ordervalue) : this.myOrders.slice())
      );

    // console.log('Constructor #4');

    this.filteredPrescription = this.prescriptionControl.valueChanges
      .pipe(
        startWith(''),
        map(prescriptionvalue => prescriptionvalue ? this._filterPrescription(prescriptionvalue) : this.myPrescriptions.slice())
      );
    // console.log('Constructor #5 - Filtered Prescriptions', this.filteredPrescription); 
  }


  private _filterNote(value_note: string): string[] {
    const notefilterValue = value_note.toLowerCase();
    return this.myNotes.filter(noteOption => noteOption.examination_title.toLowerCase().indexOf(notefilterValue) === 0);
  }

  private _filterOrder(value_order: string): string[] {
    const orderfilterValue = value_order.toLowerCase();
    return this.myOrders.filter(orderOption => orderOption.order_title.toLowerCase().indexOf(orderfilterValue) === 0);
  }

  private _filterPrescription(value_prescription: string): string[] {
    const prescriptionfilterValue = value_prescription.toLowerCase();
    return this.myPrescriptions.filter(prescriptionOption => prescriptionOption.generic_name.toLowerCase().indexOf(prescriptionfilterValue) === 0);
  }

  ngOnInit() {
    console.log('Visit ID: ', this.visitId);
    this.visitService.getVisits();
    // console.log('Constructor #6');
  }


  onClear() {
    this.visitService.form.reset();
    this.visitService.initializeFormGroup();
    this.visitService.initializevisitFormGroup();
    this.visitService.initializenotesFormGroup();
    this.visitService.initializeordersFormGroup();
    this.visitService.initializeprescriptionsFormGroup();
  }

  onSave() {
      let mapNotes = new Map()
        .set("notesMap", this.notes);

      mapNotes.forEach(noteItems => {
        console.log('Values inside mapNotes', noteItems)
        this.noteItems = noteItems;
      });

      let mapOrders = new Map()
      .set("orderssMap", this.orders);

    mapOrders.forEach(orderItems => {
      console.log('Values inside mapNotes', orderItems)
      this.orderItems = orderItems;
    });

    let mapPrescriptions = new Map()
    .set("orderssMap", this.prescriptions);

    mapPrescriptions.forEach(prescriptionItems => {
    console.log('Values inside mapNotes', prescriptionItems)
    this.prescriptionItems = prescriptionItems;
  });

      console.log('VISITS: ', this.visits);
      
      let copiedObject = JSON.parse(JSON.stringify(this.visits));
      console.log('ID: ',copiedObject[0].id);
      let final = {
          id: copiedObject[0].id,
          patientName: copiedObject[0].patientName, 
          patientAge: copiedObject[0].patientAge,
          patientMobile: copiedObject[0].patientMobile,
          patientGender: copiedObject[0].patientGender,
          isClosed: copiedObject[0].isClosed,
          patientBloodGroup: copiedObject[0].patientBloodGroup,
          patientLongtermIllness: copiedObject[0].patientLongtermIllness,
          patientLongtermMedicine: copiedObject[0].patientLongtermMedicine,
          createdOn: this.myFormattedDate,
          visitNotes: this.noteItems,
          visitOrders: this.orderItems,
          visitPrescription: this.prescriptionItems

          };
      console.log('FINAL', final);
      this.visitService.insertVisit(final)
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
    // console.log('close function called');
    this.visitService.form.reset();
    // console.log('form reset called and run')
    this.visitService.initializeFormGroup();
    this.visitService.initializevisitFormGroup();
    this.visitService.initializenotesFormGroup();
    this.visitService.initializeordersFormGroup();
    this.visitService.initializeprescriptionsFormGroup();
    // console.log('the form reinitialized and will close dialog')
    this.visitdialogRef.close();
    // console.log('dialog closed')
  }

  addVisit() {
    console.log('addVisit PRESSED - the values now: ', this.visits);

    if (this.visitService.form.invalid || !this.visitService.form.get('patientName').value) {
      console.log('THIS FORM IS EMPTY...', this.visitService.form.get('patientName').value)
    }
    else {
      console.log('THIS FORM IS NOT EMPTY...',this.visitService.form.get('patientName').value)
      this.visits = this.visits.concat(this.visitService.form.value);
      this.visits[0].id = Math.random().toString(20).substr(2, 6);
      console.log('addVisit PRESSED - the values after update: ', this.visits);
      this.visitService.form.reset();
      this.visitService.initializeFormGroup()
    }
  }

  addNote() {
    // console.log('addNote PRESSED - the values now: ', this.notes);

    if (this.visitService.notesForm.invalid || !this.visitService.notesForm.get('examination_title').value) {
      // console.log('THIS FORM IS EMPTY...', this.visitService.notesForm.get('note_title').value)
    }
    else {
      // console.log('THIS FORM IS NOT EMPTY...',this.visitService.notesForm.get('note_title').value)
      this.notes = this.notes.concat(this.visitService.notesForm.value);
      // console.log('addNote PRESSED - the values after update: ', this.notes);
      this.visitService.notesForm.reset();
      this.visitService.initializenotesFormGroup()
    }
    this.noteControl.setValue('');
  }

  addOrder() {
    // console.log('addOrder PRESSED - the values now: ', this.orders);

    if (this.visitService.ordersForm.invalid || !this.visitService.ordersForm.get('order_title').value) {
      // console.log('THIS FORM IS EMPTY...', this.visitService.ordersForm.get('order_title').value)
    }
    else {
      // console.log('THIS FORM IS NOT EMPTY...',this.visitService.ordersForm.get('order_title').value)
      this.orders = this.orders.concat(this.visitService.ordersForm.value);
      // console.log('addOrder PRESSED - the values after update: ', this.orders);
      this.visitService.ordersForm.reset();
      this.visitService.initializeordersFormGroup()
    }
    this.orderControl.setValue('');
  }

  addPrescription() {
    // console.log('addPrescription PRESSED - the values now: ', this.prescriptions);

    if (this.visitService.prescriptionsForm.invalid || !this.visitService.prescriptionsForm.get('generic_name').value) {
      console.log('THIS FORM IS EMPTY...', this.visitService.prescriptionsForm.get('generic_name').value)
    }
    else {
      // console.log('THIS FORM IS NOT EMPTY...',this.visitService.prescriptionsForm.get('generic_name').value)
      this.prescriptions = this.prescriptions.concat(this.visitService.prescriptionsForm.value);
      console.log('addPrescription PRESSED - the values after update: ', this.prescriptions);
      this.visitService.prescriptionsForm.reset();
      this.visitService.initializeprescriptionsFormGroup();
    }
    this.prescriptionControl.setValue('');
  }

  populateNote(item) {
    // console.log('POPULATE NOTE - function called', item);
    this.visitService.populateSelectednote(item);
  }

  populateOrder(item) {
    // console.log('POPULATE ORDER - function called', item);
    this.visitService.populateSelectedorder(item)
  }

  populatePrescription(item) {
    // console.log('');
    // console.log('1 - POPULATE PRESCRIPTION', item);
    this.visitService.populateSelectedprescription(item);

    // console.log('');
    // console.log('5 - back to component, check if item array is empty: ', item);
    // console.log('------------------------------------');

    item = [];

    // console.log('6 - LOCALLY EMPTIED THE item ARRAY - whats in it for now?', item);
    this.prescriptionControl.setValue('');
    // console.log('7 - prescription control has been reset');
    // console.log('=======================================');
  }

  removeNote(row) {
    // console.log('remove test button clicked', this.notes);
    this.notes = this.notes.filter(item => item !== row);
    // console.log('after remove test button clicked', this.notes);
  }

  removeTest(row) {
    // console.log('remove test button clicked', this.orders);
    this.orders = this.orders.filter(item => item !== row);
    // console.log('after remove test button clicked', this.orders);
  }

  removePrescription(row) {
    // console.log('remove prescription button clicked', this.prescriptions);
    this.prescriptions = this.prescriptions.filter(item => item !== row);
    // console.log('after remove prescription button clicked', this.prescriptions);
  }

  favPrescription() {

  }
}
