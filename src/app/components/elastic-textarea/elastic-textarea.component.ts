import {AfterViewInit, Component, ContentChild, ElementRef} from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'elastic-textarea',
  templateUrl: './elastic-textarea.component.html',
  inputs: ['placeholder', 'lineHeight', 'maxExpand'],
  styleUrls: ['./elastic-textarea.component.scss'],
})

export class ElasticTextareaComponent implements AfterViewInit {

  @ContentChild(IonInput,{ read: ElementRef }) ionTxtArea: ElementRef;

  public txtArea: any;
  public content: string;
  public lineHeight: number;
  public placeholder: string;
  public maxHeight: number;
  public maxExpand: number;

  constructor() {
    this.content = "";
    this.lineHeight = 20;
    this.maxExpand = 8;
    this.maxHeight = this.lineHeight * this.maxExpand;
  }

  public ngAfterViewInit() {
    this.txtArea =  this.ionTxtArea.nativeElement;
    this.txtArea.style.height = this.lineHeight + "px";
    this.maxHeight = this.lineHeight * this.maxExpand;
    this.txtArea.style.resize = 'none';
  }

  public onChange(event?: any) {
   this.txtArea.style.height = this.lineHeight + "px";
    if (this.txtArea.scrollHeight < this.maxHeight) {
      this.txtArea.style.height = this.txtArea.scrollHeight + "px";
    } else {
      this.txtArea.style.height = this.maxHeight + "px";
    }
  }

  public clearInput() {
    this.content = "";
    this.txtArea.style.height = this.lineHeight + "px";
  }

  public setFocus() {
    this.txtArea.setFocus();
  }

}
