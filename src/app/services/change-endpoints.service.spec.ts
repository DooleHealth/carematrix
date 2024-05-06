import { TestBed } from '@angular/core/testing';

import { ChangeEndpointsService } from './change-endpoints.service';

describe('ChangeEndpointsService', () => {
  let service: ChangeEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
