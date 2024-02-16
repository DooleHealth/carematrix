import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-more-information',
  templateUrl: './view-more-information.component.html',
  styleUrls: ['./view-more-information.component.scss'],
})
export class ViewMoreInformationComponent  implements OnInit {
  @Input() content: any;
  @Input() segment: string;
  like = false;
  hide = false;
  favourite = false;
  constructor() { }

  ngOnInit() {
    console.log("lo que llega", this.content)
  }

  setContentStatus(type){
    let value = 0
    if(type == 'like'){
      this.like = !this.like
      value =  this.like? 1:0
    }else if(type == 'hide'){
      this.hide = !this.hide
      value =  this.hide? 1:0
    }
    else{
      this.favourite = !this.favourite
      value = this.favourite? 1:0
    }  
  }

  truncateDescription(description: string, maxLength: number): string {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    } else {
      return description;
    }
  }
}
