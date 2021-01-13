import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedordersFavouritesComponent } from './medorders-favourites.component';

describe('MedordersFavouritesComponent', () => {
  let component: MedordersFavouritesComponent;
  let fixture: ComponentFixture<MedordersFavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedordersFavouritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedordersFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
