import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DietsPage } from './diets.page';

describe('DietsPage', () => {
  let component: DietsPage;
  let fixture: ComponentFixture<DietsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DietsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
