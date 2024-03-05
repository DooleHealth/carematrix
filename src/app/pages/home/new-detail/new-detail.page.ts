import { Component, Input, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { LanguageService } from 'src/app/services/language.service';
import { DateService } from 'src/app/services/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.page.html',
  styleUrls: ['./new-detail.page.scss'],
})
export class NewDetailPage implements OnInit {
  @Input()id: any;
  data:any;
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
    private modalCtrl: ModalController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private dooleService: DooleService,
    private navigation: NavigationService,
    public sanitizer: DomSanitizer, private router: Router, private languageService: LanguageService, public dateService: DateService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(history.state?.id)
      this.id = history.state.id;

    if(this.id)
      this.getDetailNew();
  }

  getImageSource(listcontets): string {
    if (listcontets?.cover) return listcontets.cover
    else if (listcontets?.image?.temporaryUrl) return listcontets.image.temporaryUrl;
    else return '/assets/images/shared-care-plan/image-not-found.png';
  }
  

  async getDetailNew(onlyStatus?){
    console.log('[DiaryPage] getDetailNew()');
    this.isLoading = true
    this.dooleService.getAPIdetailNew( this.id).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailNew()', await json);

        //Refresh only status content
        if(onlyStatus){
          this.like = this.getStatusable(json.news?.statusable, 'like')
          this.favourite = this.getStatusable(json.news?.statusable, 'favourite')
          this.hide = this.getStatusable(json.news?.statusable, 'hide')
          return
        }
        this.new=json.news;
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

        this.like = this.getStatusable(this.new?.statusable, 'like')
        this.favourite = this.getStatusable(this.new?.statusable, 'favourite')
        this.hide = this.getStatusable(this.new?.statusable, 'hide')

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
    }
    else if(type == 'hide'){
      this.hide = !this.hide
      value =  this.hide? 1:0
    }
    else{
      this.favourite = !this.favourite
      value = this.favourite? 1:0
    }
    let params = {
      model: 'News',
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

  async close() {
    const modal = await this.modalCtrl.getTop();
    if (modal)
      await modal.dismiss({error:null});
    else if(this.data)
      this.router.navigate([`/home`]);
    /* else
      this.router.navigate([`/advices`]); */
  }

  // async close() {
  //   this.navigation.close(this.modalCtrl)
  // }


  formatSelectedDate(date){
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, this.dateService.getFormatSelectedDate2());
  }

  extractText(htmlContent: string): string {
    // Si el contenido es nulo o indefinido, retorna una cadena vacía
    if (!htmlContent) {
      return '';
    }

    // Utiliza una expresión regular para eliminar las etiquetas HTML
    const regex = /(<([^>]+)>)/ig;
    const result = htmlContent.replace(regex, "");

    return result;
  }



}


