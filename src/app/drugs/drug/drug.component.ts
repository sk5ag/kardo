import { Component, OnInit } from '@angular/core';
import { DrugService } from 'src/app/shared/drug.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {

  constructor(
    public drugService: DrugService,
    public dialogRef: MatDialogRef<DrugComponent>,
  ) { }


  ngOnInit() {
    this.drugService.getDrugs()
  }
  onClear(){
    this.drugService.drugForm.reset();
    this.drugService.initializedrugFormGroup()
  }

  onSubmit() {
    if (this.drugService.drugForm.valid) {
      if (!this.drugService.drugForm.get('id').value) {
        this.drugService.insertDrug(this.drugService.drugForm.value);
      }
      else 
        this.drugService.updateDrug(this.drugService.drugForm.value);
        this.drugService.drugForm.reset();
        this.drugService.initializedrugFormGroup();
        this.onClose()  
    }
    else {
      console.log('The form is not valid ...')
    }
  }
  
  onClose() {
    console.log('close function called');
    this.drugService.drugForm.reset();
    console.log('form reset called and run')
    this.drugService.initializedrugFormGroup();
    console.log('the form reinitialized and will close dialog')
    this.dialogRef.close();
    console.log('dialog closed')
  }

}
