import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent implements OnInit {
  @Input('backButtonRoute') backButtonRoute: string;
  constructor(public translate: TranslateService) { }
  
  ngOnInit(): void {
   
  }

}
