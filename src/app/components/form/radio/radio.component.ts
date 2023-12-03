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
  valueLabel = ''
  constructor(public translate: TranslateService) { }

  ngOnInit() {
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    let vDefault = this.data?.data?.valueDefault
    if(vDefault && vDefault !== '' && !this.data.required){
      this.valueDefault = vDefault? vDefault: this.valueDefault
      this.value = this.valueDefault
    }

    console.log("* this.valueDefault:", this.valueDefault);
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
    console.log('RadioComponent options', this.options)
  }

  setValue(event){

    // In order to fix multiple selection on the radiougroup due to same value
    // I've switch the value of the radio html control equals to the object's id
    let id = event.target.value
    let selected = this.options.find(opt => opt.id === id);

    if(selected)
      this.value = selected?.value;
    else
      this.value = event.target?.id

    let opt = this.options.find(opt => opt.value == this.value)
    this.valueLabel = opt? opt.label:''
    //console.log('RadioComponent', this.value, this.valueLabel)

    this.change.emit({[this.data.name]: this.value});

  }

  checkValue(){
    console.log('checkValue', this.value)
    if(this.value.length === 0 && this.data?.required && this.value === ''){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }else{
      this.error_msg = ''
      this.error = false
    }
  }

}

