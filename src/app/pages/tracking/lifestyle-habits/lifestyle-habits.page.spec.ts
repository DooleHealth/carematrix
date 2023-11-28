import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifestyleHabitsPage } from './lifestyle-habits.page';

describe('LifestyleHabitsPage', () => {
  let component: LifestyleHabitsPage;
  let fixture: ComponentFixture<LifestyleHabitsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LifestyleHabitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
