import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { MedPrescription } from 'src/app/Modal/medprescription';
import { PrescriptionEditService } from '../../shared/prescription-edit.service';

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
    console.log('Items in the prescription section: ', this.prescriptionArray[0]);
    this.prescriptionTable.push(this.prescriptionArray[0].prescriptions);
    console.log('Items in the order TABLE: ', this.prescriptionArray[0]);
  }
  
  onClose() {
    // Close opened dialogbox
    this.PrescriptionDialogRef.close();
  }

  ngOnDestroy(){
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();  
  }

}
