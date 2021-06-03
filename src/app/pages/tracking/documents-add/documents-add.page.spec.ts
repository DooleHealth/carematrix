import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentsAddPage } from './documents-add.page';

describe('DocumentsAddPage', () => {
  let component: DocumentsAddPage;
  let fixture: ComponentFixture<DocumentsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
