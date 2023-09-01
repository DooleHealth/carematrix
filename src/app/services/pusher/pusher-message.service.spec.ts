import { TestBed } from '@angular/core/testing';

import { PusherMessageService } from './pusher-message.service';

describe('PusherMessageService', () => {
  let service: PusherMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
