import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { IntroGuard } from './intro.guard';

describe('IntroGuard', () => {
  let guard: IntroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule,FormsModule]
    });
    guard = TestBed.inject(IntroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
