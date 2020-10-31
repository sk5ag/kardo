import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VisitEditService } from '../../shared/visit-edit.service';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.css']
})
export class EditVisitComponent implements OnDestroy {

  messages: any[] = [];
  subscription: Subscription;

  constructor(private messageService: VisitEditService) {  }

  showMessage(){
          // subscribe to home component messages
          this.subscription = this.messageService.getMessage().subscribe(message =>{
            if (message) {
              this.messages.push(message);
              console.log('HERE IS THE MESSAGE: ',this.messages)
            } else {
              // clear messages when empty message received
              console.log('Empty message received!!');
              this.messages = [];
            }
          });
    
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
