import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TestsComponent } from './tests/tests.component';
import { TestComponent } from './tests/test/test.component';
import { TestService } from './shared/test.service';
import { DepartmentService } from './shared/department.service';
import { TesttypeService} from './shared/testtype.service';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import { AppointmentService } from './shared/appointment.service';
import { VisitsComponent } from './visits/visits.component';
import { VisitComponent } from './visits/visit/visit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { PrescriptionComponent } from './prescriptions/prescription/prescription.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TestsComponent,
    TestComponent,
    AppointmentsComponent,
    AppointmentComponent,
    VisitsComponent,
    VisitComponent,
    OrdersComponent,
    OrderComponent,
    PrescriptionsComponent,
    PrescriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [TestService, DepartmentService, TesttypeService, AppointmentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
