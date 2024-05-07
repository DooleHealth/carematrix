import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { DooleService } from 'src/app/services/doole.service';
import { ChangeEndpointsService } from 'src/app/services/change-endpoints.service';

@Component({
  selector: 'app-diets-detail',
  templateUrl: './diets-detail.page.html',
  styleUrls: ['./diets-detail.page.scss'],
})
export class DietsDetailPage implements OnInit {
  private data: any = history.state?.data;
  @Input()id: any;
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
    private router: Router,
    private location: Location,
    public alertCtrl: AlertController,     
    public navCtrl: NavController, 
    private dooleService: DooleService,
    private constants: Constants,
    private modalCtrl: ModalController,
    public sanitizer: DomSanitizer,
    private endpoints: ChangeEndpointsService) {
  }

  ngOnInit() {

    if(history.state?.id)
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
          console.log("link", this.link)
        }
  
        this.diet.media.forEach(element => {
          if(element.mime_type=="application/pdf"){
            element.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl(`${this.endpoints.DOOLE_ENDPOINT}/v2/PDFViewer/web/viewer.html?file=`+encodeURIComponent(element.temporaryUrl));
            this.linkpdf=this.sanitizer.bypassSecurityTrustResourceUrl(`${this.endpoints.DOOLE_ENDPOINT}/v2/PDFViewer/web/viewer.html?file=`+encodeURIComponent(element.temporaryUrl));
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
  openFile(){
    console.log("media", this.diet.media);
    // console.log("video", this.video);
    console.log("miniatura", this.thumbnail);
    console.log("advices", this.linkpdf2.changingThisBreaksApplicationSecurity);
    window.open(this.linkpdf2.changingThisBreaksApplicationSecurity, "");
  
  }

  

  openVideo(){
    console.log("media", this.diet.media);
    console.log("video", this.video);
 
    window.open(this.video, "");
  }

  async backButton(){

    const modal = await this.modalCtrl.getTop();
    if (modal)
      await modal.dismiss({error:null});
      
   /*  else if(this.data)
      this.router.navigate([`/diets`]);
    else
    this.router.navigate([`/home`]); */
  }

}