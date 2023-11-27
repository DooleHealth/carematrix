import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformedConsentPage } from './informed-consent.page';

describe('InformedConsentPage', () => {
  let component: InformedConsentPage;
  let fixture: ComponentFixture<InformedConsentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformedConsentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
