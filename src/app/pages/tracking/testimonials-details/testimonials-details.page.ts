import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ChangeEndpointsService } from 'src/app/services/change-endpoints.service';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-testimonials-details',
  templateUrl: './testimonials-details.page.html',
  styleUrls: ['./testimonials-details.page.scss'],
})
export class TestimonialsDetailsPage implements OnInit {

  @Input()id: any;
  data:any;
  isLoading = false
  testimony : any = {};
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
    public sanitizer: DomSanitizer,
    private languageService: LanguageService, public dateService: DateService,private endpoints: ChangeEndpointsService,
     private router: Router) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(history.state?.id)
      this.id = history.state.id;

    if(this.id)
      this.getDetailTestimony();
  }

  getImageSource(listcontets): string {
    if (listcontets?.cover) return listcontets.cover
    else if (listcontets?.image?.temporaryUrl) return listcontets.image.temporaryUrl;
    else return '/assets/images/shared-care-plan/image-not-found.png';
  }

  async getDetailTestimony(onlyStatus?){
    console.log('[DiaryPage] getDetailTestimony()');
    this.isLoading = true
    /**getAPIdetailTESTIMONIALS
     * CAMBIAR CUANDO ESTE HECHO EL DETALLE DE LOS TESTIMONIOS
     * DE MOMENTO ESTA CON EL DE NEWS
     */

    let  params={
      tags:1,
      interactions:1,
      readingTime:1
    }
    this.dooleService.getAPIdetailTestimonial(this.id,params).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailTestimony()', await json);

        //Refresh only status content
        if(onlyStatus){
          this.like = this.getStatusable(json.news?.statusable, 'like')
          this.favourite = this.getStatusable(json.news?.statusable, 'favourite')
          this.hide = this.getStatusable(json.news?.statusable, 'hide')
          return
        }
        this.testimony=json.testimony;
        if(this.testimony.description){
          this.testimony.description=this.testimony.description.replace('"//www.','"https://www.');
          this.testimony.description=this.sanitizer.bypassSecurityTrustHtml(this.testimony.description);
        }

        if((this.testimony.url!='') && (this.testimony.url!=null)){
          this.link=this.sanitizer.bypassSecurityTrustResourceUrl(this.testimony.url);
        }

        this.testimony?.files?.forEach(element => {
          if(element?.mime_type=="application/pdf"){
            element.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl(`${this.endpoints.DOOLE_ENDPOINT}/v2/PDFViewer/web/viewer.html?file=`+encodeURIComponent(element.temporaryUrl));
            this.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl(`${this.endpoints.DOOLE_ENDPOINT}/v2/PDFViewer/web/viewer.html?file=`+encodeURIComponent(element.temporaryUrl));
            this.linkpdf2=this.sanitizer.bypassSecurityTrustResourceUrl(element.temporaryUrl);
            this.thumbnail=(element.thumbnailTemporaryUrl);
            this.linkPdfDescription=(element.description);
            this.linkPdfTitle=(element.name);
          }
        });
        this.testimony?.files?.forEach(element => {
          if(element.mime_type=="video/mp4"){
            this.video=(element.temporaryUrl);
            this.videoThumbnail=(element.thumbnailTemporaryUrl);
            this.videoDescription=(element.description);
            this.videoTitle=(element.name);
          }
        });

        this.like = this.getStatusable(this.testimony?.statusable, 'like')
        this.favourite = this.getStatusable(this.testimony?.statusable, 'favourite')
        this.hide = this.getStatusable(this.testimony?.statusable, 'hide')

        this.isLoading = false
       },(err) => {
          console.log('[DiaryPage] getDetailnews() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
  }



  openFile(){
    console.log("files", this.testimony.files);
    console.log("miniatura", this.thumbnail);
    console.log("news", this.linkpdf2.changingThisBreaksApplicationSecurity);
    window.open(this.linkpdf2.changingThisBreaksApplicationSecurity, "");

  }

  openVideo(){
    console.log("files", this.testimony.files);
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
      id: this.testimony?.id,
      type: type,
      status: value
    }
    if(this.id)
    this.dooleService.postAPIContentStatus(params).subscribe(
      async (res: any) =>{
          if(res.success){
            this.getDetailTestimony('onlyStatus');
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
