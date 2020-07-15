import { Component, OnInit } from '@angular/core';
import { TestService } from '../../shared/test.service';
import { DepartmentService } from '../../shared/department.service';
import { Test } from 'src/app/Modal/test';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TesttypeService } from 'src/app/shared/testtype.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  test: Test;
  alltests: Test;
  testForm: FormGroup;

  constructor(
    public service: TestService,
    public departmentService: DepartmentService,
    public testtypeService: TesttypeService
  ) {

  }

  departments = [
    { id: 1, value: 'Test 1' },
    { id: 2, value: 'Test 2' },
    { id: 3, value: 'Test 3' }
  ];


  ngOnInit() {
    this.initForm();
    this.service.getTests();
  }

  private initForm() {

    this.testForm = new FormGroup({
      $key: new FormControl(null),
      Name: new FormControl('', Validators.required),
      Type: new FormControl('', Validators.required),
      Department: new FormControl(''),
      isActive: new FormControl(false)
    })
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    console.log('onSubmit button clicked ...')
    if (this.service.form.valid) {
      this.service.insertTest(this.service.form.value);
      console.log('form has been submitted to insert function ...')

      this.service.form.reset();
      console.log('form has been reset ...')

      this.service.initializeFormGroup();
      console.log('form has been initialized with empty strings ...')
    }
    else{
      console.log('form not validated ...')

    }
  }

}
