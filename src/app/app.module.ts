import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

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

import { TestService } from './shared/test.service';
import { DepartmentService } from './shared/department.service';
import { TesttypeService } from './shared/testtype.service';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import { AppointmentService } from './shared/appointment.service';
import { VisitsComponent } from './visits/visits.component';
import { VisitComponent } from './visits/visit/visit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { PrescriptionComponent } from './prescriptions/prescription/prescription.component';
import { VisitListComponent } from './visits/visit-list/visit-list.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderService } from './shared/order.service';
import { PrescriptionListComponent } from './prescriptions/prescription-list/prescription-list.component';
import { PrescriptionService } from './shared/prescription.service';
import { VisitService } from './shared/visit.service';
import { DrugsComponent } from './drugs/drugs.component';
import { DrugComponent } from './drugs/drug/drug.component';
import { DrugListComponent } from './drugs/drug-list/drug-list.component';
import { DrugService } from './shared/drug.service';
import { LoginComponent } from './login/login.component';
import { EditVisitComponent } from './visits/edit-visit/edit-visit.component';
import { VisitEditService } from './shared/visit-edit.service';
import { EditOrdersComponent } from './orders/edit-orders/edit-orders.component';
import { OrderEditService } from './shared/order-edit.service';
import { EditPrescriptionsComponent } from './prescriptions/edit-prescriptions/edit-prescriptions.component';
import { PrescriptionEditService } from './shared/prescription-edit.service';
import { HomeComponent } from './home/home.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { DrugsFavouritesComponent } from './favourites/drugs-favourites/drugs-favourites.component';
import { MedordersFavouritesComponent } from './favourites/medorders-favourites/medorders-favourites.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AppointmentsComponent,
    AppointmentComponent,
    VisitsComponent,
    VisitComponent,
    EditVisitComponent,
    OrdersComponent,
    OrderComponent,
    PrescriptionsComponent,
    PrescriptionComponent,
    VisitListComponent,
    AppointmentListComponent,
    OrderListComponent,
    PrescriptionListComponent,
    DrugsComponent,
    DrugComponent,
    DrugListComponent,
    LoginComponent,
    EditVisitComponent,
    EditOrdersComponent,
    EditPrescriptionsComponent,
    EditPrescriptionsComponent,
    HomeComponent,
    FavouritesComponent,
    DrugsFavouritesComponent,
    MedordersFavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Specify AvatarModule as an import
    AvatarModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,

  ],
  providers: [
    TestService,
    DepartmentService,
    TesttypeService,
    AppointmentService,
    OrderService,
    PrescriptionService,
    VisitService,
    DrugService,
    VisitEditService,
    OrderEditService,
    PrescriptionEditService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppointmentComponent,
    OrderComponent,
    PrescriptionComponent,
    VisitComponent,
    EditVisitComponent,
    EditOrdersComponent,
    EditPrescriptionsComponent,
    DrugsComponent
  ],
})
export class AppModule { }
