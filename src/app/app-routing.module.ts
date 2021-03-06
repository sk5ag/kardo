import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DrugsComponent } from './drugs/drugs.component';
import { OrdersComponent } from './orders/orders.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { VisitsComponent } from './visits/visits.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard]},
  {path: 'drugs', component: DrugsComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'prescriptions', component: PrescriptionsComponent, canActivate: [AuthGuard]},
  {path: 'visits', component: VisitsComponent, canActivate: [AuthGuard]},
  {path: 'myfavourites', component: FavouritesComponent},

  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
