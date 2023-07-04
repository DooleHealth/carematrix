import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements OnInit {
  @Input() data: any;
  @Input() desactive: boolean;
  label = ''
  
  constructor() { 
  }

  ngOnInit() {
/*     let translate = this.data?.translate[`${this.data.type}`]
    this.label = translate[this.data?.userLang].replace('<p', '<div').replace('</p', '</div') */
    this.label = this.data.translate?.content_paragraph[this.data.userLang]
  }

  checkValue(){
  }

}
