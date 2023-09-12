import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-advices-detail',
  templateUrl: './advices-detail.page.html',
  styleUrls: ['./advices-detail.page.scss'],
})
export class AdvicesDetailPage implements OnInit {
  private data: any = history.state?.data;
  @Input()id: any;
  loading : any;
  advice : any = [];
  like = false;
  favourite = false;
  hide = false;
  videoThumbnail: any = null;
  link : any = null;
  linkpdf : any = null;
  linkpdf2 : any = null;
  linkPdfDescription : any = null;
  linkPdfTitle : any = null;
  video : any = null;
  videoDescription: any = null;
  videoTitle: any = null;
  thumbnail : any = null;
  isLoading = false
  constructor(
    private router: Router,
    public loadingController: LoadingController, 
    public alertCtrl: AlertController,     
    public navCtrl: NavController, 
    private dooleService: DooleService,
    public translate: TranslateService,
    private modalCtrl: ModalController,
    public sanitizer: DomSanitizer,private location: Location) {
  }
  ngOnInit() {
  }

  ionViewWillEnter(){
    if(history.state?.id)
      this.id = history.state.id;

    if(this.id)
      this.getDetailAdvices();
  }

  async getDetailAdvices(onlyStatus?){
    console.log('[DiaryPage] getDetailAdvices()');
    this.isLoading = true
    this.dooleService.getAPIdetailAdvices( this.id).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailAdvices()', await json);
        //Refresh only status content
        if(onlyStatus){
          this.like = this.getStatusable(json.advice?.statusable, 'like')
          this.favourite = this.getStatusable(json.advice?.statusable, 'favourite')
          this.hide = this.getStatusable(json.advice?.statusable, 'hide')
          return
        }

        this.advice=json.advice;

        if(this.advice.description){
          this.advice.description=this.advice.description.replace('"//www.','"https://www.');
          this.advice.description=this.sanitizer.bypassSecurityTrustHtml(this.advice.description);
        }
        
        if((this.advice.url!='') && (this.advice.url!=null)){
          this.link=this.sanitizer.bypassSecurityTrustResourceUrl(this.advice.url);
        }
  
        this.advice.media.forEach(element => {
          if(element.mime_type=="application/pdf"){
            element.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl("https://api.doole.io/v2/PDFViewer/web/viewer.html?file="+encodeURIComponent(element.temporaryUrl));
            this.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl("https://api.doole.io/v2/PDFViewer/web/viewer.html?file="+encodeURIComponent(element.temporaryUrl));
            this.linkpdf2=this.sanitizer.bypassSecurityTrustResourceUrl(element.temporaryUrl);
            this.thumbnail=(element.thumbnailTemporaryUrl);
            this.linkPdfDescription=(element.description);
            this.linkPdfTitle=(element?.name);
          }
        });
        this.advice.media.forEach(element => {
          if(element.mime_type=="video/mp4"){
            this.video=(element.temporaryUrl);
            this.videoThumbnail=(element.thumbnailTemporaryUrl);
            this.videoDescription=(element.description);
            this.videoTitle=(element?.name);
          }
        });

        this.like = this.getStatusable(this.advice?.statusable, 'like')
        this.favourite = this.getStatusable(this.advice?.statusable, 'favourite')
        this.hide = this.getStatusable(this.advice?.statusable, 'hide')
   
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDetailAdvices() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  openFile(media?){
    console.log("media", this.advice.media);
    // console.log("video", this.video);
    console.log("miniatura", this.thumbnail);
    console.log("advices", this.linkpdf2.changingThisBreaksApplicationSecurity);
    window.open(this.linkpdf2.changingThisBreaksApplicationSecurity, "");
  
  }

  openVideo(media?){
    console.log("media", this.advice.media);
    console.log("video", this.video);
    console.log("miniaturaVideo", this.videoThumbnail);
    window.open(this.video, "");
  }

  async backButton(){
    const modal = await this.modalCtrl.getTop();
    if (modal)
      await modal.dismiss({error:null});
    else if(this.data)
      this.router.navigate([`/home`]);
    else
      this.location.back(); 
  }

  async close() {
    const modal = await this.modalCtrl.getTop();
    if (modal)
      await modal.dismiss({error:null});
    else if(this.data)
      this.router.navigate([`/home`]);
   /*  else
      this.router.navigate([`/advices`]); */
  }

  getStatusable(list, type){
    if(list?.length >0){
      let statu = list.find(status => (status?.type == type));
      return statu? true:false
    }
    else return false
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
    let params = {
      model: 'Advice',
      id: this.advice?.id,
      type: type,
      status: value
    }
    if(this.id)
    this.dooleService.postAPIContentStatus(params).subscribe(
      async (res: any) =>{
          if(res.success){
            this.getDetailAdvices('onlyStatus');
          }
      }
    )
  }

  async presentChallengeNotification() {

    let message = '';
   
      message =  `<div class="pyro">
      <div class="before"></div>
      <ion-row><ion-col class="text-align-center"><img src="assets/images/duly_campeon.gif" class="card-alert"></img><ion-text>`+this.translate.instant('health_path.level_accomplished')+`</ion-text></ion-col></ion-row>
      <div class="after"></div>
    </div>`; 
    
      
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('health_path.level_congratulations'),
      cssClass:'challenge-alert',
      message: message,
      buttons: [
        {
          text: this.translate.instant('info.button'),
          role: 'confirm',
          handler: () => {
           
          },
        },
      ],
    });
    await alert.present();
  
  }
}

