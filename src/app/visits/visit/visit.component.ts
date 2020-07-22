import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../shared/visit.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  visitId = Math.random().toString(20).substr(2, 6)

  constructor(
    public visitService: VisitService,
    public visitdialogRef: MatDialogRef<VisitComponent>,
  ) { }

  visitors = [
    {visit_id:1, patient_name:'Donald Duck', patient_age:'20', patient_gender:'Male', patient_mobile:'07701323367'},
    {visit_id:2, patient_name:'Tom an Jerry', patient_age:'30', patient_gender:'Male', patient_mobile:'07701323367'},
    {visit_id:3, patient_name:'John Smith', patient_age:'40', patient_gender:'Female', patient_mobile:'07701323367'},
    {visit_id:4, patient_name:'Eddy Murphy', patient_age:'45', patient_gender:'Male', patient_mobile:'07701323367'},
    {visit_id:5, patient_name:'Peppa Pig', patient_age:'50', patient_gender:'Other', patient_mobile:'07701323367'},
    {visit_id:6, patient_name:'Laura Explorer', patient_age:'60', patient_gender:'Female', patient_mobile:'07701323367'},
  ];

  bloodgroups = [
    {bg_id: 1, value: 'A+'},
    {bg_id: 2, value: 'A-'},
    {bg_id: 3, value: 'B+'},
    {bg_id: 4, value: 'B-'},
    {bg_id: 5, value: 'O+'},
    {bg_id: 6, value: 'O-'},
    {bg_id: 7, value: 'AB+'},
    {bg_id: 8, value: 'AB-'},
  ];

  ngOnInit() {
    console.log('Visit ID: ', this.visitId)
    this.visitService.getVisits()
  }
  onClear(){
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
