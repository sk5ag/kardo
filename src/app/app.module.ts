import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { ListVisitsComponent } from './visit/newvisit/listvisits.component';
import { CreatevisitComponent } from './visit/createvisit/createvisit.component';
import { ModifyvisitComponent } from './visit/modifyvisit/modifyvisit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EncounterComponent } from './encounter/encounter.component';
import { PrescriptionComponent } from './encounter/prescription/prescription.component';
import { LabOrderComponent } from './encounter/lab-order/lab-order.component';
import { RadOrderComponent } from './encounter/rad-order/rad-order.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    ListVisitsComponent,
    CreatevisitComponent,
    ModifyvisitComponent,
    EncounterComponent,
    PrescriptionComponent,
    LabOrderComponent,
    RadOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
