import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-confirmation-answers',
  templateUrl: './confirmation-answers.component.html',
  styleUrls: ['./confirmation-answers.component.scss'],
})
export class ConfirmationAnswersComponent implements OnInit {
  @Input() answers  = [];
  @ViewChild(IonContent) content: IonContent;
  showArrow: boolean = false;
  isAndroid: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    public platform: Platform,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.isAndroid = this.platform.is('android');
    console.log("this.isAndroid: ", this.isAndroid);
  }

 ionViewDidEnter(){
 //this.checkForScrollbar()

 }

  send(){
    this.modalCtrl.dismiss({accept: true});
  }


  close(){
    this.modalCtrl.dismiss();
  }

  scrollToBottom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom(500);

  }

  async checkForScrollbar() {
    const scrollElement = await this.content.getScrollElement();
    this.showArrow = scrollElement?.scrollHeight > scrollElement?.clientHeight;
    console.log("checkForScrollbar: ",  this.showArrow)
  }

}
