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
import { ListVisitsComponent } from './visit/newvisit/listvisits.component';
import { CreatevisitComponent } from './visit/createvisit/createvisit.component';
import { ModifyvisitComponent } from './visit/modifyvisit/modifyvisit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PrescriptionTableComponent } from './prescription-table/prescription-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TestformComponent } from './prescription-table/test-form/testform/testform.component';
import { TestsComponent } from './tests/tests.component';
import { TestComponent } from './tests/test/test.component';
import { TestService } from './shared/test.service';
import { DepartmentService } from './shared/department.service';
import { TesttypeService} from './shared/testtype.service';
import { AlltestsComponent } from './tests/alltests/alltests.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ListVisitsComponent,
    CreatevisitComponent,
    ModifyvisitComponent,
    PrescriptionTableComponent,
    TestformComponent,
    TestsComponent,
    TestComponent,
    AlltestsComponent,
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
  providers: [TestService, DepartmentService, TesttypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
