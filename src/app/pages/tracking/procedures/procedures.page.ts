import { Component, OnInit } from '@angular/core';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.page.html',
  styleUrls: ['./procedures.page.scss'],
})
export class ProceduresPage implements OnInit {
  listItem: any[] = []
  nameContent: string = ContentTypeTranslatedName.MedicalProcedure
  iconContent = ContentTypeIcons.MedicalProcedure
  constructor() { }

  ngOnInit() {
  }

}
