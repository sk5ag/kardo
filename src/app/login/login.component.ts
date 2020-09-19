import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  role: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  this.auth.user$.subscribe(user => {
    console.log('the user is: ', user.isDoctor);
    this.role = user.isDoctor;
  });
}
}