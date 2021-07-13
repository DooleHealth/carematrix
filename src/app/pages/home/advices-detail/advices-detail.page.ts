import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';


@Component({
  selector: 'app-advices-detail',
  templateUrl: './advices-detail.page.html',
  styleUrls: ['./advices-detail.page.scss'],
})
export class AdvicesDetailPage implements OnInit {
  id : any;
  loading : any;
  advice : any = [];
  link : any = null;
  linkpdf : any = null;
  constructor(
    private iab: InAppBrowser, 
    public loadingController: LoadingController, 
    public alertCtrl: AlertController,     
    public navCtrl: NavController, 
    private dooleService: DooleService,
    public sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.id = history.state.id;
    if(this.id)
    this.getDetailAdvices();
  }

  async getDetailAdvices(){
    console.log('[DiaryPage] getDetailAdvices()');
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIdetailAdvices( this.id).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailAdvices()', await json);

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
          }
        });

        loading.dismiss();
       },(err) => { 
          console.log('[DiaryPage] getDetailAdvices() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          throw err; 
      });
  }
}

