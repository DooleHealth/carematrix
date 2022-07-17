import { TestBed } from '@angular/core/testing';

import { PusherAlarmService } from './pusher-alarm.service';

describe('PusherAlarmService', () => {
  let service: PusherAlarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherAlarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
