import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-health-card',
  templateUrl: './add-health-card.page.html',
  styleUrls: ['./add-health-card.page.scss'],
})
export class AddHealthCardPage implements OnInit {
  cards = [
    {
      modality: "Mutuas Seguros",
      color: "BDC3C7"
    },
    {
      modality: "Sanidad Pública",
      color: "2980B9"
    },
    {
      modality: "Sanidad Privada",
      color: "09f"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
