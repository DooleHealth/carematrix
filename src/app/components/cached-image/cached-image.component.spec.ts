import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CachedImageComponent } from './cached-image.component';

describe('CachedImageComponent', () => {
  let component: CachedImageComponent;
  let fixture: ComponentFixture<CachedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CachedImageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CachedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
