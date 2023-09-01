import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextShellComponent } from './text-shell.component';

describe('TextShellComponent', () => {
  let component: TextShellComponent;
  let fixture: ComponentFixture<TextShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextShellComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
