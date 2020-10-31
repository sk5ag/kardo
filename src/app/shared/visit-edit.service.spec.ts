import { TestBed } from '@angular/core/testing';

import { VisitEditService } from './visit-edit.service';

describe('VisitEditService', () => {
  let service: VisitEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
