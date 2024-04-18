import { TestBed } from '@angular/core/testing';

import { SpeakRecordService } from './speak-record.service';

describe('SpeakRecordService', () => {
  let service: SpeakRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeakRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
