import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpentokService {

  public agendaId: string;
  public token$: string;
  public sessionId$: string;
  public apiKey$: string;
  constructor() { }

}
