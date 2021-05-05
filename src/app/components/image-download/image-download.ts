import { Component, Input } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DooleService } from 'src/app/services/doole.service';
import { HttpService } from 'src/app/services/http.service';
import {AuthenticationService} from "../../services/authentication.service";


/**
 * Generated class for the ImageDownloadComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'image-download',
  templateUrl: 'image-download.html'
})
export class ImageDownloadComponent {

  localfile : string ='';
  localfileNormalized : string ='';
  temporaryUrl : string ='';
  @Input('url') url;
  @Input('target') target;
  @Input('clickable') clickable;
  downloaded = false;
  status = '';
  percent = 0;
  percentage: any;

  constructor(private photoViewer: PhotoViewer, private http: HttpService, private doole: DooleService,
              private auth: AuthenticationService) { }

  ngOnInit() {
    //console.log("url:"+this.url);
    //console.log("target:"+this.target);
    this.loadData();
  }

  loadData(){

    const postData = {
      file: this.url,
    };

    //this.post('user/device/register', postData).subscribe(
      this.auth.post("message/temporaryUrl",postData).subscribe(data=>{
        this.temporaryUrl=data.temporaryUrl;
        this.doole.downloadFile(data.temporaryUrl,this.target).subscribe(datad => {
          //console.log(datad);
          //console.log("downloadFile subscribe"+datad.fileNormalized);
          //console.log(data.percent);
          this.percent=datad.percent;
          this.status=datad.status;
          //downloadFile subscribefile:///var/mobile/Containers/Data/Application/4D8A5FB4-B486-498D-97E8-76F404A6315F/Documents/1535373755996
          //downloadFile subscribehttp://localhost:8080/var/mobile/Containers/Data/Application/946A8956-0513-469B-803D-4C6F34087DDC/Library/Caches/1535374599756
          this.localfile = datad.file;
          this.localfileNormalized = datad.fileNormalized;
          this.downloaded = datad.downloaded;
        });
      });

    
  }

  openImage(){
    if(this.clickable)
      this.photoViewer.show(this.localfile);
  }
  

}
