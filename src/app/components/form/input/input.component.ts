import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  NUM_YEAR = 1
  label = ''
  labelButton = 'Click'
  value = ''
  error = false
  error_msg = ''
  options = []
  placeholder = ''
  remainingText = '0'
  valueDefault = ''
  max
  min
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    //this.data.required = true
    if( this.data.type == 'formula'|| this.data.type == 'logic'){
        this.data.hidden = true
    }
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    this.placeholder = this.data.placeholder //.replace(/(<([^>]+)>)/gi, "");
    this.max =  this.data.validation.maxLenght
    this.min = this.data.validation.minLenght
    this.remainingText = '0/'+this.max

    let vDefault = this.data?.data?.valueDefault
    this.valueDefault = vDefault? vDefault: this.valueDefault

    if(this.data.type === 'date'){
      let maxYear = new Date().getFullYear() + this.NUM_YEAR
      this.max =  this.data.validation.max? this.data.validation.max: maxYear
    }else if(this.data.type === 'number' || this.data.type === 'text'){
      if(this.valueDefault !== '' && !this.data.required){
        this.value = this.valueDefault
      }
    }else if(this.data.type === 'formula' || this.data.type === 'logic'){
      let value = this.data?.data?.value
      if(value !== '' && value){
        this.value = value.replace(',','').replace(' ','')
      }
    }

    if( this.data.type == 'formula'|| this.data.type == 'logic'){
      this.data.hidden = true
  }
  }

  setValue(event){
    this.value =  event.target.value
    console.log('InputComponent', this.value)
    this.change.emit({[this.data.name]: this.value});
  }

  checkValue(){
    console.log('InputComponent checkValue()', this.value)
    if(this.value === '' && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
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


