import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { DateService } from 'src/app/services/date.service';
import { DatePipe } from '@angular/common';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TranslateService } from '@ngx-translate/core';
import { NavController, Platform } from '@ionic/angular';

import { App, AppState } from '@capacitor/app';

@Component({
  selector: 'app-view-more-information',
  templateUrl: './view-more-information.component.html',
  styleUrls: ['./view-more-information.component.scss'],
})
export class ViewMoreInformationComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() segment: string;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  activeSpeakerId: any;
  like = false;
  hide = false;
  favourite = false;
  toLink;
  showSpeak = false;



  constructor(private dooleService: DooleService, public authService: AuthenticationService,private navCtrl: NavController,  public platform: Platform,
    private languageService: LanguageService, public dateService: DateService,  public translate: TranslateService,) { }

  ngOnInit() {
    console.log("[ViewMoreInformationComponent] ngOnInit(): ", this.content)
    this.platform.ready().then(() => {
      this.listenToAppState();
    })

    //this.toRouterLink()

  }
  ngOnDestroy(){
    this.stopSpeak();
  }
 
  
  listenToAppState() {
    App.addListener('appStateChange', (state: AppState) => {
      if (!state.isActive) {
        this.stopSpeak();
        console.log("La aplicación está en segundo plano");
      }
    });
  }
  toRouterLink() {
   
    switch (this.segment) {
      case "News":
        return 'new-detail'
          ;
      case "Advice":
        return 'advices-detail'
          ;
      case "Exercise":
        return 'exercices-detail'
          ;
      case "Testimony":
        return 'testimonials-detail'
          ;
    }

    if (this.content[0].modal_type)
      if (this.content[0].modal_type === "App\\Receipt") {
        return 'diets-detail/recipe';
      }
  }
  setContentStatus(statusable, id, type) {

    let value = 0
    this.like = !this.like

    value = this.like ? 1 : 0

    if (statusable?.length > 0) {
      let existeLike = statusable.some(objeto => objeto.type === "like");
      if (existeLike) {
        value = 0
      } else {
        value = 1
      }

    }
    else {
      value = 1
    }

    console.log()
    let params = {
      model: this.segment,
      id: id,
      type: type,
      status: value
    }

    this.dooleService.postAPIContentStatus(params).subscribe(
      async (res: any) => {
        if (res.success) {
          this.refreshPage()
        }
      }
    )

  }

  truncateDescription(description: string, maxLength: number): string {
    if(description){
      const regex = /(<([^>]+)>)/ig;
      const result = description.replace(regex, "");
  
  
      if (result.length > maxLength) {
        return result.substring(0, maxLength) + '...';
      } else {
        return result;
      }
    }
    else{
      return ""
    }
    // Utiliza una expresión regular para eliminar las etiquetas HTML
  
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

  getImageSource(listcontets): string {
    let a = '';

    if (listcontets?.image) {
      if (listcontets?.image?.temporaryUrl) a = listcontets.image.temporaryUrl
      else if(typeof listcontets?.image === 'string')
            a = listcontets?.image;
      else a = '/assets/images/shared-care-plan/image-not-found.png';
    }
    else if (listcontets?.cover) {
      if (listcontets.cover?.temporaryUrl) a = listcontets.cover.temporaryUrl;
      else a = listcontets.cover
    }
    else if (listcontets?.image?.temporaryUrl) a = listcontets.image.temporaryUrl;
    else a = '/assets/images/shared-care-plan/image-not-found.png';

    return a;
  }

  getStateObject(listcontets) {

    if (this.segment === "Exercise") {
      return { id: listcontets?.exercise_id, programable_id: listcontets.programable_id };
    } else {
      return { id: listcontets?.id };
    }
  }


  getColorLike(statusable) {
    //console.log(statusable)
    if (statusable?.length > 0) {
      let existeLike = statusable.some(objeto => objeto.type === "like");
      if (existeLike) {
        return 'heart'
      } else {
        return 'heart-outline'
      }

    }
    else {
      return 'heart-outline'
    }
  }

  refreshPage() {
    // This function could be called on some event like a button click
    this.notifyParent.emit();
  }

  formatSelectedDate(date) {
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, this.dateService.getFormatSelectedDate2());
  }

 setSpeak(id, speak: any){
  
   
    const regex = /(<(?!img)[^>]+>)|(<img[^>]+alt="([^"]+)">)|(<([^>]+)>)/ig;

    let result;
    if(speak !== null || speak !== ""){
       result = speak.replace(regex, "");
    
    }else{
      result =this.translate.instant('alert.recording')
    }

    const textLength = result.length;
    const averageReadingSpeed = 10; // Por ejemplo, 3 caracteres por segundo
        // Calcular el tiempo de lectura estimado en segundos
    const estimatedTime = textLength / averageReadingSpeed;
    this.showSpeak = true;
    let language = this.languageService.getCurrent()
    this.activeSpeakerId = id;
    TextToSpeech.speak({
      text:result,
      lang: language,     
          })
    setTimeout(() => {
      this.showSpeak = false; // Establecer showSpeak en false después del tiempo estimado
    }, estimatedTime * 750);
  }


  stopSpeak(){
    this.activeSpeakerId = null;
    this.showSpeak = false;
    TextToSpeech.stop();
  }
}

