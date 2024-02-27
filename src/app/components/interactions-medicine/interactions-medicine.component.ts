import { Component, Input, OnInit } from '@angular/core';
import { TrakPageRoutingModule } from 'src/app/pages/home/trak/trak-routing.module';

@Component({
  selector: 'app-interactions-medicine',
  templateUrl: './interactions-medicine.component.html',
  styleUrls: ['./interactions-medicine.component.scss'],
})
export class InteractionsMedicineComponent  implements OnInit {
  severity= true
  @Input() interactions: any
  constructor() { }

  ngOnInit() {
    console.log("interactions", this.interactions)
  }

}
