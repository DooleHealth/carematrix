import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.scss'],
})
export class HiddenComponent implements OnInit {
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
  valueDefault = ''
  // max
  // min
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.data.hidden = true
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    this.placeholder = this.data.placeholder
    // this.max =  this.data.validation.maxLenght
    // this.min = this.data.validation.minLenght
    // let vDefault = this.data?.data?.valueDefault
    // this.valueDefault = vDefault? vDefault: this.valueDefault
    // if(this.valueDefault !== '' && !this.data.required){
    //   this.value = this.valueDefault
    // }
    let value = this.data?.layout?.valuedefault
    if(value !== '' && value){
      this.value = value
    }
  }

  setValue(event){
    this.value =  event.target.value
    console.log('HiddenComponent', this.value)
    this.change.emit({[this.data.name]: this.value});
  }

  checkValue(){
    console.log('HiddenComponent checkValue()', this.value)
    if(this.value === '' && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }
    else{
      this.error_msg = ''
      this.error = false
    }
  }

}
