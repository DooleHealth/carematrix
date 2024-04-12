import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GifPage } from './gif.page';

describe('GifPage', () => {
  let component: GifPage;
  let fixture: ComponentFixture<GifPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
