import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimonialsDetailsPage } from './testimonials-details.page';

describe('TestimonialsDetailsPage', () => {
  let component: TestimonialsDetailsPage;
  let fixture: ComponentFixture<TestimonialsDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestimonialsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
