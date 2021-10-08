import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.page.html',
  styleUrls: ['./new-detail.page.scss'],
})
export class NewDetailPage implements OnInit {
  id : any;
  isLoading = false
  new : any = {};
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
  like = false;
  favourite = false;
  hide = false;
  constructor(
    private iab: InAppBrowser, 
    private auth: AuthenticationService,
    public loadingController: LoadingController, 
    public alertCtrl: AlertController,     
    public navCtrl: NavController, 
    private dooleService: DooleService,
    public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id)
    this.getDetailNew();
  }

  async getDetailNew(onlyStatus?){
    console.log('[DiaryPage] getDetailNew()');
    this.isLoading = true
    this.dooleService.getAPIdetailNew( this.id).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailNew()', await json);

        //Refresh only status content
        if(onlyStatus){
          let news =json.news;
          let status = this.getStatusable(news?.statusable)
          this.like = (status?.liked_at)? true:false
          this.favourite = status?.favourited_at? true:false
          this.hide = (status?.hided_at !== null)? false:true
          return
        }

        this.new=json.news;
        this.isLoading = false
        if(this.new.content){
          this.new.content=this.new.content.replace('"//www.','"https://www.');
          this.new.content=this.sanitizer.bypassSecurityTrustHtml(this.new.content);
        }
        
        if((this.new.url!='') && (this.new.url!=null)){
          this.link=this.sanitizer.bypassSecurityTrustResourceUrl(this.new.url);
        }
  
        this.new.files.forEach(element => {
          if(element.mime_type=="application/pdf"){
            element.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl("https://api.doole.io/v2/PDFViewer/web/viewer.html?file="+encodeURIComponent(element.temporaryUrl));
            this.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl("https://api.doole.io/v2/PDFViewer/web/viewer.html?file="+encodeURIComponent(element.temporaryUrl));
            this.linkpdf2=this.sanitizer.bypassSecurityTrustResourceUrl(element.temporaryUrl);
            this.thumbnail=(element.thumbnailTemporaryUrl);
            this.linkPdfDescription=(element.description);
            this.linkPdfTitle=(element.name);
          }
        });
        this.new.files.forEach(element => {
          if(element.mime_type=="video/mp4"){
            this.video=(element.temporaryUrl);
            this.videoThumbnail=(element.thumbnailTemporaryUrl);
            this.videoDescription=(element.description);
            this.videoTitle=(element.name);
          }
        });

        let status = this.getStatusable(this.new?.statusable)
        this.like = (status?.liked_at)? true:false
        this.favourite = status?.favourited_at? true:false
    
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDetailnews() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }



  openFile(){
    console.log("files", this.new.files);
    console.log("miniatura", this.thumbnail);
    console.log("news", this.linkpdf2.changingThisBreaksApplicationSecurity);
    window.open(this.linkpdf2.changingThisBreaksApplicationSecurity, "");
  
  }

  openVideo(){
    console.log("files", this.new.files);
    console.log("video", this.video);
    console.log("miniaturaVideo", this.videoThumbnail);
    window.open(this.video, "");
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
    }
    else if(type == 'hide'){
      this.hide = !this.hide
      value =  this.hide? 0:1
    }
    else{
      this.favourite = !this.favourite
      value = this.favourite? 1:0
    }
    let params = {
      model: 'Advice',
      id: this.new?.id,
      type: type,
      status: value
    }
    if(this.id)
    this.dooleService.postAPIContentStatus(params).subscribe(
      async (res: any) =>{
          if(res.success){
            this.getDetailNew('onlyStatus');
          }
      }
    )
  }

  
}


