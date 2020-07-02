import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyvisitComponent } from './modifyvisit.component';

describe('ModifyvisitComponent', () => {
  let component: ModifyvisitComponent;
  let fixture: ComponentFixture<ModifyvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
