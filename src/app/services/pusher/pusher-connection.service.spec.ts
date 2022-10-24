import { TestBed } from '@angular/core/testing';

import { PusherConnectionService } from './pusher-connection.service';

describe('PusherConnectionService', () => {
  let service: PusherConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
