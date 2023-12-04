import { TestBed } from '@angular/core/testing';

import { SharedCarePlanService } from './shared-care-plan.service';

describe('SharedCarePlanService', () => {
  let service: SharedCarePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCarePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
