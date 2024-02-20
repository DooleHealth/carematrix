import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {

  private id: any = history.state?.id;
  title: any = history.state?.title;
  forms = {}
  answers = []
  loadingForms = false
  language = 'es'
  widthScreen = 300

  constructor(
    private dooleService: DooleService,
    private languageService: LanguageService,
    private platform: Platform) {
      this.platform.ready().then(() => {
        this.widthScreen = Math.trunc(this.platform.width() -  this.platform.width()*0.10);
        console.log('Width: ' + this.platform.width());
        console.log('Height: ' + this.platform.height());
        console.log('Graph Width: ' + this.widthScreen);
      });
    }

  ngOnInit() {

  }
  ionViewDidEnter() {
    if(this.id)
    this.getAnswerFormList()
    this.language = this.languageService.getCurrent()
  }

  async getAnswerFormList(){
    this.loadingForms = true
    this.dooleService.getAPIAnswers(this.id).subscribe(
      async (res: any) =>{
        console.log('[AnswersPage] getAnswerFormList()', await res);
        if(res.success){
          this.answers = []
          this.title = res?.formAnswerDetails?.form_title
          this.forms = res.formAnswerDetails?.answerDetails
          this.treeIterateAnswer(this.forms)
          //console.log('[AnswersPage] getAnswerFormList() forms: ', await this.forms);
        }
        this.loadingForms = false
       },async (err) => {
          console.log('[AnswersPage] getAnswerFormList() ERROR(' + err.code + '): ' + err.message);
          this.loadingForms = false
          throw err;
      });
  }

  treeIterateAnswer(obj) {
    for (var property in obj) {
      //console.log('[DiaryPage] treeIterateAnswer()', property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          //console.log('[DiaryPage] treeIterateAnswer()', obj[property]);
          this.answers.push({question: JSON.parse(property), items: obj[property], expanded: false})
          //this.treeIterate(obj[property], stack + '.' + property);
        }
      }
    }
    console.log('[DiaryPage] treeIterateAnswer()', this.answers);
  }

  removeImages(html = ""){
    const imgRegex = /<img[^>]*>/gi;
    return html.replace(imgRegex, '');
  }

  formatDate(d){
    var auxdate = d.split(' ')
    //let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toISOString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    const datePipe: DatePipe = new DatePipe(this.language);
    return datePipe.transform(date , 'dd MMM yyyy');
  }

  openMedia(fileUrl){
    window.open(fileUrl, "");
  }

}
