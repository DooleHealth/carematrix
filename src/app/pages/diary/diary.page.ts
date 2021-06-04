import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides} from '@ionic/angular'; 


@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {
  public items: any = [];
  @ViewChild('slides') slides: IonSlides;
  constructor() {
    this.items = [
      { expanded: false }
    ];
  }

  ngOnInit() {
  }
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}

