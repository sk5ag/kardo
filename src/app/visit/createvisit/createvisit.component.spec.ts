import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevisitComponent } from './createvisit.component';

describe('CreatevisitComponent', () => {
  let component: CreatevisitComponent;
  let fixture: ComponentFixture<CreatevisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatevisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
