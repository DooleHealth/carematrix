import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.page.html',
  styleUrls: ['./agenda-detail.page.scss'],
})
export class AgendaDetailPage implements OnInit {
  event: any = {}
  title
  constructor() { }

  ngOnInit() {
    this.event = history.state.event;
    this.title = history.state.title;
    console.log('[AgendaDetailPage] ngOnInit()', this.event);
  }

}
