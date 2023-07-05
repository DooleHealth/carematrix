import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BioquimicComponent } from './bioquimic.component';

describe('BioquimicComponent', () => {
  let component: BioquimicComponent;
  let fixture: ComponentFixture<BioquimicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioquimicComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BioquimicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
