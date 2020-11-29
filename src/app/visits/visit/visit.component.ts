import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
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
  docEmail: string;
  docClinic: string;
  docId: string;
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

  @Input() myNotes: any[] = [];

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
    public auth: AuthService,
  ) {

    console.log('CONSTRUCTORE RUN');

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

    console.log('ONINIT RUN');

    this.auth.user$.subscribe(user => {
      this.docEmail = user.email;
      this.docClinic =  user.clinic;
      this.docId = user.uid;
      console.log('Doctor Email: ', this.docEmail);
      console.log('Doctor Clinic: ', this.docClinic);

      console.log('Values passed: ', this.visitId);
      this.visitService.getVisits(this.docEmail);
    });
    


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
    console.log('ONSUBMIT RUN');

    console.log('ID of the document received by onSubmit: ', this.visitService.form.get('id').value);
    if (this.visitService.form.valid) {
      console.log('FORM VALID');
      if (!this.visitService.form.get('id').value) {
        console.log('FORM had no ID');

        this.visitService.insertVisit(this.visitService.form.value, this.docId, this.docEmail, this.docClinic);
        console.log('Back to onSubmit From Insert Method');

        this.visitService.form.reset();
        this.visitService.initializeFormGroup();
        this.visitService.initializevisitFormGroup();
        this.visitService.initializenotesFormGroup();
        this.visitService.initializeordersFormGroup();
        this.visitService.initializeprescriptionsFormGroup();
        this.onClose();
        console.log('Last steps 1');
        
      }
      else {
        console.log('FORM has ID: ');
        this.visitService.modifyVisit(this.visitService.form.value);

        this.visitService.form.reset();
        this.visitService.initializeFormGroup();
        this.visitService.initializevisitFormGroup();
        this.visitService.initializenotesFormGroup();
        this.visitService.initializeordersFormGroup();
        this.visitService.initializeprescriptionsFormGroup();
        this.onClose();
        console.log('Last steps 2');
      }
    }
    else {
      console.log('END OF ONSUBMIT RUN');

      console.log('FORM NOT VALID...')
    }

  }

  onClose() {
    console.log('ONCLOSE RUN');

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

    console.log('ADDVISIT RUN');

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
    if (this.visitService.notesForm.invalid || !this.visitService.notesForm.get('examination_title').value) {
    }
    else {
      this.notes = this.notes.concat(this.visitService.notesForm.value);
      this.visitService.notesForm.reset();
      this.visitService.initializenotesFormGroup()
    }
    this.noteControl.setValue('');
  }

  addOrder() {

    if (this.visitService.ordersForm.invalid || !this.visitService.ordersForm.get('order_title').value) {
    }
    else {
      this.orders = this.orders.concat(this.visitService.ordersForm.value);
    }
    console.log('VALUE INSIDE OrderForm:', this.visitService.ordersForm.value);
    this.visitService.ordersForm.reset();
    this.visitService.initializeordersFormGroup();
    console.log('VALUE INSIDE OrderForm after reset and clear:', this.visitService.ordersForm.value);

    console.log('VALUE INSIDE orderControl:', this.orderControl.value);
    this.orderControl.setValue('');
    this.orderControl.reset();
    console.log('VALUE INSIDE orderControl after reset and clear:', this.orderControl.value);
  }

  addPrescription() {
    if (this.visitService.prescriptionsForm.invalid || !this.visitService.prescriptionsForm.get('generic_name').value) {
      console.log('THIS FORM IS EMPTY...', this.visitService.prescriptionsForm.get('generic_name').value)
    }
    else {
      this.prescriptions = this.prescriptions.concat(this.visitService.prescriptionsForm.value);
      console.log('addPrescription PRESSED - the values after update: ', this.prescriptions);
      this.visitService.prescriptionsForm.reset();
      this.visitService.initializeprescriptionsFormGroup();
    }
    this.prescriptionControl.setValue('');
  }

  populateNote(item) {
    this.visitService.populateSelectednote(item);
  }

  populateOrder(item) {
    this.visitService.populateSelectedorder(item)
  }

  populatePrescription(item) {
    this.visitService.populateSelectedprescription(item);


    item = [];

    // console.log('6 - LOCALLY EMPTIED THE item ARRAY - whats in it for now?', item);
    this.prescriptionControl.setValue('');

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
