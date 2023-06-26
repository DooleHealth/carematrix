import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  label = ''
  value = []
  error = false
  error_msg = ''
  valueDefault = ''
  options = []
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    let vDefault = this.data?.data?.valueDefault
    this.valueDefault = (vDefault && !this.data.required)? vDefault: this.valueDefault
    this.getOptions(this.data.options, this.data?.translate)
  }

  getOptions(obj, translate){
    for(var opt in obj){
      let option = obj[opt]
      let label = translate[opt]
      if(label){
        option.label = label[this.data?.userLang] //?.replace('<p', '<div')?.replace('</p', '</div')
      }
      if(this.valueDefault === option.value){
        option['isChecked'] = true
        this.value.push(this.valueDefault)
      }
      else
        option['isChecked'] = false
      this.options.push(option)
    }
    //console.log('CheckboxComponent options', this.options)
  }

  setValue(event){
    if(event.detail.checked)
      this.value.push(event.target.value)
    else
      this.value =  this.value.filter( v => v !== event.target.value)
    //console.log('CheckboxComponent', this.value)
    this.change.emit({[this.data.name]: this.value});
  }

  checkValue(){
    if(this.value.length === 0 && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }
    else{
      this.error_msg = ''
      this.error = false
    }
  }

}
