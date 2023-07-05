import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  label = ''
  value = ''
  error = false
  error_msg = ''
  options = []
  valueDefault = ''
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    let vDefault = this.data?.data?.valueDefault
    if(vDefault && vDefault !== '' && !this.data.required){
      this.valueDefault = vDefault? vDefault: this.valueDefault
      this.value = this.valueDefault
    }
    this.getOptions(this.data.options, this.data?.translate)
  }

  getOptions(obj, translate){
    for(var opt in obj){
      let option = obj[opt]
      let label = translate[opt]
      if(label){
        option.label = label[this.data?.userLang] //?.replace('<p', '<div')?.replace('</p', '</div')
      }
      this.options.push(option)
    }
    //console.log('RadioComponent options', this.options)
  }

  setValue(event){
    this.value =  event.target.value
    //console.log('CheckboxComponent', this.value)
    this.change.emit({[this.data.name]: this.value});
  }

  checkValue(){
    if(this.value.length === 0 && this.data?.required && this.value === ''){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }
    else{
      this.error_msg = ''
      this.error = false
    }
  }

}

