import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltestsComponent } from './alltests.component';

describe('AlltestsComponent', () => {
  let component: AlltestsComponent;
  let fixture: ComponentFixture<AlltestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
