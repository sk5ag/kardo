import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsFavouritesComponent } from './drugs-favourites.component';

describe('DrugsFavouritesComponent', () => {
  let component: DrugsFavouritesComponent;
  let fixture: ComponentFixture<DrugsFavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsFavouritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
