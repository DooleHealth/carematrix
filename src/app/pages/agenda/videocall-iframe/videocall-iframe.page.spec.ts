import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideocallIframePage } from './videocall-iframe.page';

describe('VideocallIframePage', () => {
  let component: VideocallIframePage;
  let fixture: ComponentFixture<VideocallIframePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocallIframePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideocallIframePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
