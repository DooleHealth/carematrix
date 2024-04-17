import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddButtonComponent } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss'],
})
export class ButtonAddComponent  implements OnInit {
  @Input() content: AddButtonComponent;
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log("content", this.content)
  }

  goTo(type){
    this.dataUpdated.emit();
}
}
