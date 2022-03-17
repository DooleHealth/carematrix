import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatPusherPage } from './chat-pusher.page';

describe('ChatPusherPage', () => {
  let component: ChatPusherPage;
  let fixture: ComponentFixture<ChatPusherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPusherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPusherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
