import { Component, Input, OnInit } from '@angular/core';
import { ItemForm } from '../shared/item-form';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements  OnInit, ItemForm {
  @Input() data: any;
  @Input() desactive: boolean;
  label = ''
  
  constructor() { 
  }

  ngOnInit() {
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
  }
  checkValue(){
  }

}
