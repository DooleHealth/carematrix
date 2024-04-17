import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestVisitPage } from './request-visit.page';

describe('RequestVisitPage', () => {
  let component: RequestVisitPage;
  let fixture: ComponentFixture<RequestVisitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
