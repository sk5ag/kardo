import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitsComponent } from './listvisits.component';

describe('ListVisitsComponent', () => {
  let component: ListVisitsComponent;
  let fixture: ComponentFixture<ListVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
