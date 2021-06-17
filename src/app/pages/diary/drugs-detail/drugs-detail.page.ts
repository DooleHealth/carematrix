import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drugs-detail',
  templateUrl: './drugs-detail.page.html',
  styleUrls: ['./drugs-detail.page.scss'],
})
export class DrugsDetailPage implements OnInit {
  drug : any
  id:any
  name:any
  constructor() { }

  ngOnInit() {
    this.id = history.state.id;
    this.name = history.state.name;
    if(this.id)
    this.drug = {id: this.id, name: this.name}
  }

}
