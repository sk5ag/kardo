import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadOrderComponent } from './rad-order.component';

describe('RadOrderComponent', () => {
  let component: RadOrderComponent;
  let fixture: ComponentFixture<RadOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
