import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BiometricAuthPage } from './biometric-auth.page';

describe('BiometricAuthPage', () => {
  let component: BiometricAuthPage;
  let fixture: ComponentFixture<BiometricAuthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiometricAuthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BiometricAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
