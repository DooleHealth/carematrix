import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {
  listItem: any[] = []
  nameContent: string = ContentTypeTranslatedName.Monitoring
  iconContent = ContentTypeIcons.Monitoring
  constructor() { }

  ngOnInit() {
  }

}
