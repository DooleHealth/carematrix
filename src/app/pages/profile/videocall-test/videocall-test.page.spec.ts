import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideocallTestPage } from './videocall-test.page';

describe('VideocallTestPage', () => {
  let component: VideocallTestPage;
  let fixture: ComponentFixture<VideocallTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocallTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideocallTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
