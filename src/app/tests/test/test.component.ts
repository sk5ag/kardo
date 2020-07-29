import { Component, OnInit } from '@angular/core';
import { TestService } from '../../shared/test.service';
import { DepartmentService } from '../../shared/department.service';
import { Test } from 'src/app/Modal/test';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TesttypeService } from 'src/app/shared/testtype.service';
import { MatTableDataSource } from '@angular/material/table';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


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

  myTests = [
    // {$key: null, Name: "Test -001", Type: "Blood Test", Department: "2", isActive: true},
    // {$key: null, Name: "Test -002", Type: "Blood Test", Department: "2", isActive: true},
    // {$key: null, Name: "Test -003", Type: "Blood Test", Department: "2", isActive: true},
    // {$key: null, Name: "Test -004", Type: "Blood Test", Department: "2", isActive: true},
  ];

  displayColumns: string[] = ['Name', 'Type', 'Department', 'isActive', 'actions'];


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
    console.log('onSumit PRESSED - the values now: ', this.myTests);
    this.myTests = this.myTests.concat(this.service.form.value);
    
    console.log('onSumit UPDATED ARRAY - the values now: ', this.myTests);
    // console.log('onSubmit button clicked ...')
    // if (this.service.form.valid) {
    //   this.service.insertTest(this.service.form.value);
    //   console.log('form has been submitted to insert function ...')

    //   this.service.form.reset();
    //   console.log('form has been reset ...')

    //   this.service.initializeFormGroup();
    //   console.log('form has been initialized with empty strings ...')
    // }
    // else{
    //   console.log('form not validated ...')

    // }
  }

  saveTests(){
    console.log('save test button clicked', this.myTests);
    this.service.insertTest(this.myTests)
    
  }

  removeTest(row){
    console.log('remove test button clicked', this.myTests);
    this.myTests = this.myTests.filter(item => item !== row);
    console.log('after remove test button clicked', this.myTests);
  }
}
