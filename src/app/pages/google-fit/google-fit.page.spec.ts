import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleFitPage } from './google-fit.page';

describe('GoogleFitPage', () => {
  let component: GoogleFitPage;
  let fixture: ComponentFixture<GoogleFitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoogleFitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
