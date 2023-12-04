import { Component, OnInit } from '@angular/core';
import { LifestyleIndexComponent } from '../lifestyle-index/lifestyle-index.component';

@Component({
  selector: 'app-content-date',
  templateUrl: './content-date.component.html',
  styleUrls: ['./content-date.component.scss'],
})
export class ContentDateComponent extends LifestyleIndexComponent implements OnInit {

 // export class ContentComponent  implements OnInit {
    // @Input() content: SharedCarePlan
    // @Output() redirect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {}

}
