import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TapPage } from './tap.page';

describe('TapPage', () => {
  let component: TapPage;
  let fixture: ComponentFixture<TapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
