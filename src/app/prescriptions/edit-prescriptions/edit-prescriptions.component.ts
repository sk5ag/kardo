import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { MedPrescription } from 'src/app/Modal/medprescription';
import { PrescriptionEditService } from '../../shared/prescription-edit.service';
import { PrescriptionService } from '../../shared/prescription.service';

@Component({
  selector: 'app-edit-prescriptions',
  templateUrl: './edit-prescriptions.component.html',
  styleUrls: ['./edit-prescriptions.component.css']
})
export class EditPrescriptionsComponent implements OnDestroy {

  subscription: Subscription;
  prescriptionArray: any[] = [];
  listPrescriptionData: MatTableDataSource<MedPrescription>;
  displayPrescriptionColumns: string[] = ['generic_name', 'dosage_form', 'strength', 'route', 'actions'];
  prescriptionTable: any[] = [];

  constructor(
    private PrescriptionMsgService: PrescriptionEditService,
    public PrescriptionDialogRef: MatDialogRef<PrescriptionEditService>,
    private prescriptionService: PrescriptionService,
   ) {
    this.prescriptionArray = [],
      // subscribe to home component messages
      this.subscription = this.PrescriptionMsgService.getMessage().subscribe(message => {
        if (message){
          this.prescriptionArray.push(message);
          console.log('HERE IS THE PRESCRIPTION MESSAGE: ', this.prescriptionArray);
        } else {
             // clear messages when empty message received
          //console.log('Empty message received!!');
          this.prescriptionArray = [];
        }
      }
      )
  }

  ngOnInit(){
    this.prescriptionTable.push(this.prescriptionArray[0].prescriptions);
  }

  onDataLoad(){

    this.prescriptionTable.push(this.prescriptionArray[0].prescriptions);
  }
  
  onClose() {
    // Close opened dialogbox
    this.PrescriptionDialogRef.close();
  }
  onUpdateList(item){


    console.log('isDispensed is set to ::: ', item.isDispensed);
    console.log('Changing status of this item ::: ', item.id);

    if(confirm('Are you sure?')){
      if (item.isDispensed == false){
        this.prescriptionArray[0].prescriptions.forEach(element => {
          console.log('ELEMENT ID :::', element.id );  
          if (element.id == item.id){
            element.isDispensed = true;
          }    
        });
        console.log('array updated ::: ', this.prescriptionArray[0]);
      }else{
        this.prescriptionArray[0].prescriptions.forEach(element => {
          console.log('ELEMENT ID :::', element.id );  
          if (element.id == item.id){
            element.isDispensed = false;
          }    
        });
        console.log('array updated ::: ', this.prescriptionArray[0]);
  
      };
      this.prescriptionService.updateOrder(this.prescriptionArray[0]);

    }else{
      console.log('Nothing changed..')
    }

  }

  ngOnDestroy(){
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();  
  }

}
