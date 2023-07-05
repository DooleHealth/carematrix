import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.pdfSrc);
  }

  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
