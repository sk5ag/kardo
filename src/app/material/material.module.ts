import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule} from '@angular/material/table';
import { MatTabsModule} from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


const MaterialComponent = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatRadioModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTableModule,
  MatTabsModule,
  MatGridListModule,
  MatSelectModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatExpansionModule,
  MatMenuModule,
  MatBadgeModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [],
  imports: [MaterialComponent],
  exports:[MaterialComponent]
})
export class MaterialModule { }
