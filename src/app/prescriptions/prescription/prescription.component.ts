import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../shared/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  selectedMeds = ""; 

  constructor(
    public prescriptionService: PrescriptionService,
  ) { }

  prescriptions = [
    {pres_id: 1, medicineGenericName: 'metoprolol', dosage_form: 'TABLET', route:'ORAL', ingredient: '100 mg/1 - METOPROLOL TARTRATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 2, medicineGenericName: 'metoprolol', dosage_form: 'TABLET', route:'ORAL', ingredient: '50 mg/1 - METOPROLOL TARTRATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 3, medicineGenericName: 'metoprolol', dosage_form: 'TABLET', route:'ORAL', ingredient: '25 mg/1 - METOPROLOL TARTRATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 4, medicineGenericName: 'metoprolol succinate', dosage_form: 'CAPSULE, EXTENDED RELEASE', route:'ORAL', ingredient: '100 mg/1 - METOPROLOL SUCCINATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 5, medicineGenericName: 'metoprolol succinate', dosage_form: 'TABLET, EXTENDED RELEASE', route:'ORAL', ingredient: '200 mg/1 - METOPROLOL SUCCINATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 6, medicineGenericName: 'metoprolol succinate', dosage_form: 'TABLET, FILM COATED, EXTENDED RELEASE', route:'ORAL', ingredient: '50 mg/1 - METOPROLOL SUCCINATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 7, medicineGenericName: 'metoprolol succinate', dosage_form: 'TABLET, EXTENDED RELEASE', route:'ORAL', ingredient: '25 mg/1 - METOPROLOL SUCCINATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 8, medicineGenericName: 'metoprolol succinate', dosage_form: 'TABLET, EXTENDED RELEASE', route:'ORAL', ingredient: '50 mg/1 - METOPROLOL TARTRATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 9, medicineGenericName: 'metoprolol succinate', dosage_form: 'TABLET, EXTENDED RELEASE', route:'ORAL', ingredient: '200 mg/1 - METOPROLOL TARTRATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 10, medicineGenericName: 'metoprolol succinate', dosage_form: 'TABLET, EXTENDED RELEASE', route:'ORAL', ingredient: '100 mg/1 - METOPROLOL TARTRATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 11, medicineGenericName: 'metoprolol succinate', dosage_form: 'TABLET, EXTENDED RELEASE', route:'ORAL', ingredient: '25 mg/1 - METOPROLOL TARTRATE', type: 'HUMAN PRESCRIPTION DRUG'},
    {pres_id: 12, medicineGenericName: 'metoprolol succinate and hydrochlorothiazide', dosage_form: 'TABLET', route:'ORAL', ingredient: '12.5 mg/1 - HYDROCHLOROTHIAZIDE', type: 'HUMAN PRESCRIPTION DRUG'}
  ];

  ngOnInit(): void {
  }
  onClear(){
    this.prescriptionService.form.reset();
    this.prescriptionService.initializeFormGroup()
    this.selectedMeds = ""; 
  }
}
