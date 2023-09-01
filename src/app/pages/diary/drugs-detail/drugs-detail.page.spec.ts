import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrugsDetailPage } from './drugs-detail.page';

describe('DrugsDetailPage', () => {
  let component: DrugsDetailPage;
  let fixture: ComponentFixture<DrugsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrugsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
