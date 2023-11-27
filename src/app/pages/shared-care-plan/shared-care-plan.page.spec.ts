import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedCarePlanPage } from './shared-care-plan.page';

describe('SharedCarePlanPage', () => {
  let component: SharedCarePlanPage;
  let fixture: ComponentFixture<SharedCarePlanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SharedCarePlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
