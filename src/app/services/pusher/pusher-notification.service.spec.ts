import { TestBed } from '@angular/core/testing';

import { PusherNotificationService } from './pusher-notification.service';

describe('PusherNotificationService', () => {
  let service: PusherNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
