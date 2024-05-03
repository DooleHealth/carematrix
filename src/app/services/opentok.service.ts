import { Injectable } from '@angular/core';
import { CallCapacitor } from '@doole/videocall-notications-plugins';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpentokService {

  agendaId$: string;
  token$: string;
  sessionId$: string;
  apiKey$: string;

  private callEventSubject = new Subject<ICallEvent>();
  callEvent$ = this.callEventSubject.asObservable();

  constructor() {
    CallCapacitor.addListener('disconnected-call', () => {
      this.emitCallEvent({ type: "hangup" });
    })
  }

  emitCallEvent(data: ICallEvent) {
    this.callEventSubject.next(data);
  }

}

interface ICallEvent {
  type: 'hangup';
}
