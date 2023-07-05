import { Component, Input } from '@angular/core';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Platform } from '@ionic/angular';
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
              private auth: AuthenticationService, public platform: Platform) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){

    const postData = {
      file: this.url,
    };

    this.doole.post("message/temporaryUrl",postData).subscribe(data=>{
      this.temporaryUrl=data.temporaryUrl;
      this.doole.downloadFile(data.temporaryUrl,this.target).subscribe(datad => {

        this.percent=datad.percent;
        this.status=datad.status;

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
