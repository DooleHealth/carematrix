import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';


@Component({
  selector: 'app-advices-detail',
  templateUrl: './advices-detail.page.html',
  styleUrls: ['./advices-detail.page.scss'],
})
export class AdvicesDetailPage implements OnInit {
  private data: any = history.state?.data;
  id : any;
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
    private auth: AuthenticationService,
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

  async getDetailAdvices(onlyStatus?){
    console.log('[DiaryPage] getDetailAdvices()');
    this.isLoading = true
    this.dooleService.getAPIdetailAdvices( this.id).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailAdvices()', await json);

        //Refresh only status content
        if(onlyStatus){
          let advice =json.advice;
          let status = this.getStatusable(advice?.statusable)
          this.like = (status?.liked_at)? true:false
          this.favourite = status?.favourited_at? true:false
          this.hide = (status?.hided_at !== null)? false:true
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

        let status = this.getStatusable(this.advice?.statusable)
        this.like = (status?.liked_at)? true:false
        this.favourite = status?.favourited_at? true:false
    
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

  backButton(){
    if(this.data)
    this.router.navigate([`/home`]);
  }

  getStatusable(list){
    if(list?.length >0)
      return list.find(status => (this.auth.user.idUser == status.user_id))
    else return null
  }

  setContentStatus(type){
    let value = 0
    if(type == 'like'){
      this.like = !this.like
      value =  this.like? 1:0
    }else if(type == 'hide'){
      this.hide = !this.hide
      value =  this.hide? 0:1
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
}

