import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-diets-detail',
  templateUrl: './diets-detail.page.html',
  styleUrls: ['./diets-detail.page.scss'],
})
export class DietsDetailPage implements OnInit {
  id : any;
  loading : any;
  isLoading = false
  diet : any = [];
  link : any = null;
  linkpdf : any = null;
  linkpdf2 : any = null;
  linkPdfDescription : any = null;
  linkPdfTitle : any = null;
  video : any = null;
  videoDescription: any = null;
  videoTitle: any = null;
  thumbnail : any = null;
  constructor(
    private iab: InAppBrowser, 
    public alertCtrl: AlertController,     
    public navCtrl: NavController, 
    private dooleService: DooleService,
    public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id)
    this.getDetailDiet();

  }

  async getDetailDiet(){
    console.log('[DiaryPage] getDetailDiet()');
    this.isLoading = true
    this.dooleService.getAPIdetailDiets( this.id).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailDiet()', await json);

        this.diet=json.diet;
        if(this.diet.description){
          this.diet.description=this.diet.description.replace('"//www.','"https://www.');
          this.diet.description=this.sanitizer.bypassSecurityTrustHtml(this.diet.description);
        }
        
        if((this.diet.url!='') && (this.diet.url!=null)){
          this.link=this.sanitizer.bypassSecurityTrustResourceUrl(this.diet.url);
        }
  
        this.diet.media.forEach(element => {
          if(element.mime_type=="application/pdf"){
            element.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl("https://api.doole.io/v2/PDFViewer/web/viewer.html?file="+encodeURIComponent(element.temporaryUrl));
            this.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl("https://api.doole.io/v2/PDFViewer/web/viewer.html?file="+encodeURIComponent(element.temporaryUrl));
            this.linkpdf2=this.sanitizer.bypassSecurityTrustResourceUrl(element.temporaryUrl);
            this.thumbnail=(element.thumbnailTemporaryUrl);
            this.linkPdfDescription=(element.description);
            this.linkPdfTitle=(element.name);
          }
        });
        this.diet.media.forEach(element => {
          if(element.mime_type=="video/mp4"){
            this.video=(element.temporaryUrl);
            this.videoDescription=(element.description);
            this.videoTitle=(element.name);
          }
        });
    
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDetailDiet() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }
  openFile(media){
    console.log("media", this.diet.media);
    // console.log("video", this.video);
    console.log("miniatura", this.thumbnail);
    console.log("advices", this.linkpdf2.changingThisBreaksApplicationSecurity);
    window.open(this.linkpdf2.changingThisBreaksApplicationSecurity, "");
  
  }

  openVideo(media){
    console.log("media", this.diet.media);
    console.log("video", this.video);
 
    window.open(this.video, "");
  }

}