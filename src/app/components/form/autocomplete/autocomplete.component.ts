import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  label = ''
  value = ''
  error = false
  error_msg = ''
  valueDefault = ''
  valueLabel = ''
  options = []
  constructor(public translate: TranslateService) { }

  ngOnInit() {
    //this.data.required = true
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang].replace('<p', '<div').replace('</p', '</div')
    let vDefault = this.data?.data?.valueDefault
    this.valueDefault = vDefault? vDefault: this.valueDefault
    if(this.valueDefault !== '' && !this.data.required){
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
    //console.log('AutocompleteComponent options', this.options)
  }

  setValue(event){
    this.value =  event.target.value
    let opt = this.options.find(opt => opt.value == this.value)
    this.valueLabel = opt? opt.label:''
    console.log('AutocompleteComponent', this.value, this.valueLabel)
    this.change.emit({[this.data.name]: this.value});
  }

  checkValue(){
    console.log('[AutocompleteComponent] checkValue()', this.value)
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
