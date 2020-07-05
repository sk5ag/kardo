import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-testform',
  // templateUrl: './testform.component.html',
  template: `
  <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
    <input name="id" ngModel required #first="ngModel">
    <input name="name" ngModel>
    <input name="amount" ngModel>

    <button>Submit</button>
  </form>

  <p>First name value: {{ first.value }}</p>
  <p>First name valid: {{ first.valid }}</p>
  <p>Form value: {{ f.value | json }}</p>
  <p>Form valid: {{ f.valid }}</p>
`,

  styleUrls: ['./testform.component.css']
})
export class TestformComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

}
