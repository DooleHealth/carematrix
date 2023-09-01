import { TestBed } from '@angular/core/testing';

import { PusherChallengeNotificationsService } from './pusher-challenge-notifications.service';

describe('PusherChallengeNotificationsService', () => {
  let service: PusherChallengeNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherChallengeNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
