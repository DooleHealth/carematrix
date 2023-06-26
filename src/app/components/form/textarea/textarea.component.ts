import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  label = ''
  value = ''
  error = false
  error_msg = ''
  options = []
  placeholder = ''
  remainingText = '0'
  max
  min
  rows = '7'
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    //this.data.required = true
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    this.placeholder = this.data.placeholder //.replace(/(<([^>]+)>)/gi, "");
    this.max =  this.data.validation.maxLenght
    this.min = this.data.validation.minLenght
    //this.rows = this.data.validation?.rows? this.data.validation?.rows: this.rows
    this.remainingText = '0/'+this.max
  }

  setValue(event){
    this.value =  event.target.value
    console.log('AutocompleteComponent', this.value)
    this.change.emit({[this.data.name]: this.value});
  }

  checkValue(){
    console.log('AutocompleteComponent checkValue()', this.value)
    if(this.value === '' && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }
    else if(this.value.length < this.min ){
      this.error_msg = this.translate.instant('form.error_min_character') + ` ${this.min} `+ 
                        this.translate.instant('form.character')
      this.error = true
    }
    else{
      this.error_msg = ''
      this.error = false
    }
  }

  valueChange() {
    this.remainingText = this.value.length+ '/'+this.max;
   }

}

