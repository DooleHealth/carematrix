import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DooleService } from 'src/app/services/doole.service';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { DateService } from 'src/app/services/date.service';


@Component({
  selector: 'chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChatBubbleComponent), multi: true }
  ],
  encapsulation: ViewEncapsulation.None
})
export class ChatBubbleComponent implements OnInit {

  @Input('chatMessage') message;

  localfile : string ='';
  localfileNormalized : string ='';
  temporaryUrl : string ='';
  downloaded = false;
  status = '';
  percent = 0;
  target:number;
  public lat: string;
  public lon: string;
  static translate: any;

  constructor(private dooleService : DooleService, private dateService: DateService, private  translate : TranslateService,) {
    ChatBubbleComponent.translate = this.translate
  }

  ngOnInit() {
    this.format(this.message);
    //console.log("Init");
  }

  nl2br(text: string) { return text.replace(/(\\n)/, "<br/>");}

  format(message){
    //console.log(message);
    if(message.mediaType=="TEXT"){
      if(message.message){
        message.message=this.nl2br(message.message);
        message.message=message.message.replace(String.fromCharCode(92),''); //treiem \'
        message.message=message.message.replace("\\/", "/");
        this.message.message=message.message;
        //console.log(this.message.message);
      }

    }else if(message.mediaType=="FILE"){
      this.dooleService.downloadFile(this.message.fileUrl,message.timestamp+".pdf").subscribe(data => {
        //downloadFile subscribefile:///var/mobile/Containers/Data/Application/4D8A5FB4-B486-498D-97E8-76F404A6315F/Documents/1535373755996
        //downloadFile subscribehttp://localhost:8080/var/mobile/Containers/Data/Application/946A8956-0513-469B-803D-4C6F34087DDC/Library/Caches/1535374599756
        console.log('res in chat bubble: ', data)
        this.localfile = data.file;
        this.localfileNormalized = data.fileNormalized;

      });

    }else if(message.mediaType=="GEOLOCATION"){


      var t = message.message;
      var array_message = t.split (",");
      this.lat = array_message[0].substring(5);
      this.lon = array_message[1].substring(4,array_message[1].length - 1);


      console.log(this.lat, this.lon);
    }


  }

  formatDate(date){
    let dateFormated = this.dateService.formatDate(date);

    return dateFormated;
  }


  openFile(message){
    this.target = message.timestamp;
    var dict = [];
    console.log("clicked message: ", message.fileUrl);
    dict.push({file:message.fileUrl});
    this.dooleService.post("message/temporaryUrl", {file:message.fileUrl}).subscribe(data=>{
      console.log('post("message/temporaryUrl"', data);
      this.temporaryUrl=data.temporaryUrl;
      this.dooleService.downloadFile(data.temporaryUrl,this.target).subscribe(datad => {
        console.log("***", datad);
        //console.log("downloadFile subscribe"+datad.fileNormalized);
        //console.log(data.percent);
        this.percent=datad.percent;
        this.status=datad.status;
        //downloadFile subscribefile:///var/mobile/Containers/Data/Application/4D8A5FB4-B486-498D-97E8-76F404A6315F/Documents/1535373755996
        //downloadFile subscribehttp://localhost:8080/var/mobile/Containers/Data/Application/946A8956-0513-469B-803D-4C6F34087DDC/Library/Caches/1535374599756
        this.localfile = datad.file;
        this.localfileNormalized = datad.fileNormalized;
        this.downloaded = datad.downloaded;
        window.open(this.temporaryUrl, "");
        //window.open("data:application/pdf," + encodeURI(this.localfile));
        //this.document.viewDocument(this.localfile, 'application/pdf',null);
      });
    });

  }

  openMedia(message){
    window.open(message.fileUrl, "");
  }

  mediaTypeImg(type){
    let image = type.toUpperCase()
    if(image === 'PHOTO'){
        return true
    }
    let image2 = image.split('/')[0]
    if(image2 === 'IMAGE')
        return true
  }

  mediaTypeApp(type){
    let opt =  type.split('/')[0]
    if(opt === 'APPLICATION'){
      return true
    }
    if(opt === 'FILE')
      return true
  }

  mediaType(type){
    let opt = type.toUpperCase().split('/')[0]
    if(opt === 'VIDEO')
      return true
    else
      return false
  }

}
