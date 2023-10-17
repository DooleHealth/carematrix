import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrakPage } from './trak.page';

describe('TrakPage', () => {
  let component: TrakPage;
  let fixture: ComponentFixture<TrakPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
