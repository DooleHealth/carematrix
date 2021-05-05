import { TestBed } from '@angular/core/testing';

import { DooleService } from './doole.service';

describe('DooleService', () => {
  let service: DooleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DooleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
