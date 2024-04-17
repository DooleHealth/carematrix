import { Component, Input, OnInit } from '@angular/core';
import { TrakPageRoutingModule } from 'src/app/pages/home/trak/trak-routing.module';

@Component({
  selector: 'app-interactions-medicine',
  templateUrl: './interactions-medicine.component.html',
  styleUrls: ['./interactions-medicine.component.scss'],
})
export class InteractionsMedicineComponent  implements OnInit {
  severity= true
  ShowIngredient:boolean = false;
  @Input() interactions: any
  @Input() drug: any
  constructor() { }

  ngOnInit() {
    console.log("interactions", this.interactions)
  }


  getNameInteraction(int){
    if (int.affected_ingredient.name.toLowerCase() !== this.drug.toLowerCase()) {
      return int.affected_ingredient.name
    }else{
      return  int.ingredient.name

    }
  }
}
