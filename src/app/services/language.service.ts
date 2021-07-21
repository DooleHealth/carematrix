import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel } from './language.model';

@Injectable()
export class LanguageService {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

  constructor(public translate: TranslateService) {
    this.languages.push(
      { name: 'Català', code: 'ca' },
      { name: 'Español', code: 'es' },
      { name: 'English', code: 'en' }
    );
  }

  getLanguages() {
    return this.languages;
  }

  public changeLanguage(langCode: string) {
    this.translate.use(langCode);
  }

  public getCurrent() : string {
    let lang = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return lang;
  }

  public getLanguageAPI() : string {
    let lang = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return lang == 'es'?'cs':lang;
  }

  public setLenguageLocalstorage(language){
    this.changeLanguage(language);
    localStorage.setItem('language', language);
  }

}
