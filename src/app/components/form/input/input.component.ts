import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from 'src/app/services/date.service';

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
  valueLabel = ''
  max
  min
  step = '1'
  numDecimal 
  locale:string;
  constructor(public translate: TranslateService, public dateService: DateService) { }

  ngOnInit() {
    //this.data.required = true
    console.log('InputComponent ngOnInit() data: ', this.data)
    if( this.data.type == 'formula'|| this.data.type == 'logic'){
        this.data.hidden = true
    }
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    this.placeholder = this.data.placeholder //.replace(/(<([^>]+)>)/gi, "");
    this.max =  this.data?.validation?.maxLenght
    this.min = this.data?.validation?.minLenght
    this.remainingText = '0/'+this.max

    let vDefault = this.data?.data?.valueDefault
    this.valueDefault = vDefault? vDefault: this.valueDefault

    if(this.data.type === 'date'){
      this.locale = this.dateService.getLocale();
      let maxYear = new Date().getFullYear() + this.NUM_YEAR
      this.max =  this.data.validation.max? this.data.validation.max: maxYear
    }else if(this.data.type === 'text'){
      if(this.valueDefault !== '' && !this.data.required){
        this.value = this.valueDefault
      }
    }else if(this.data.type === 'formula' || this.data.type === 'logic'){
      let value = this.data?.data?.value
      if(value !== '' && value){
        this.value = value.replace(',','').replace(' ','')
      }
    }else if(this.data.type === 'number'){
      console.log('InputComponent ngOnInit() validation: ', this.data?.validation)
      this.max = this.data?.validation?.max
      this.min = this.data?.validation?.min
      let step = this.data?.validation?.step? this.data?.validation?.step: this.step

      if(Number(step) <= 0){
        this.step =  '1'
      }else this.step = step
      let vDefault = this.data?.data?.valueDefault
      if(vDefault >= Number(this.min) && vDefault <= Number(this.max))
      this.valueDefault = vDefault

      this.value = this.data.required? this.value: this.valueDefault
      const decimals = Number(this.step)%1  //String(Number(this.step) - Math.floor(Number(this.step))).length - 2
      this.numDecimal = this.getDecimalNumber(this.step, decimals) //decimals < 0? 0:decimals
    }

    if( this.data.type == 'formula'|| this.data.type == 'logic'){
      this.data.hidden = true
  }
  }

  getDecimalNumber(value, decimal){
    if(decimal<=0) return 0
    let aux = String(value)?.split(/[.,]+/)[1]
    //console.log('InputComponent getDecimalNumber() aux: ', aux)
    return aux? aux.length: 0
  }

  setValue(event){
    this.value =  event.target.value
    console.log('InputComponent', this.value)
    if(this.data.type === 'date'){
      this.valueLabel = this.formatSelectedDate(this.value)
    }
    this.change.emit({[this.data.name]: this.value});
  }

  setValueNum(event){

      try {
        event.target.value = event.target?.value?.replace(",",".")
      } catch (error) {
        //console.log('InputComponent setValue() error: ', error)
      }
      let aux = event.target?.value
      let point = (aux+'')?.substring(aux?.length - 1)
      if( point == '.' ||  point == ',' || isNaN(aux))
      return
      let valueD = Math.abs(aux%1) 
      let num = this.getDecimalNumber(aux, valueD)

      if(num > this.numDecimal &&valueD > 0 && event.type == 'ionChange'
      ){
        console.log('InputComponent setValue() r ', this.value , this.numDecimal)
        this.value =  event.target?.value?.toFixed(this.numDecimal)
      }
      else{
        this.value =  event.target.value
        console.log('InputComponent setValue() ', this.value , this.numDecimal)
      }
      // if(event.type !== 'ionChange')
      // this.change.emit({[this.data.name]: Number(this.value)});
      // return

    //this.value =  event.target.value
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

  checkLastValue(){
    if(this.value === '' && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }

    else{
      this.sendValue()
    }
  }

  sendValue(event?){
    // console.log('BioquimicComponent sendValue() ', event)
    // console.log('BioquimicComponent sendValue() ', this.value)
    this.change.emit({[this.data.name]: Number(this.value)});
  }

  checkValueNum(){
    
    console.log('BioquimicComponent checkValueNum() ', Number(this.max), Number(this.min))
    if((this.value === '' || Number.isNaN(this.value)) && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }
    // else if(this.getDecimalNumber1(this.value)  > this.numDecimal ){
    //   this.error_msg = 'Error al ingresar muchos decimales'; // this.translate.instant('form.error_no_valid')
    //   this.error = true
    // }
    else if(this.max && this.min !== 'null'){
      if(this.value !== '' && (Number(this.value) > Number(this.max) ||  Number(this.value) < Number(this.min)) ){
        this.error_msg = this.translate.instant('form.error_no_valid') + ` [${this.min} - ${this.max}]`
        this.error = true
      }else{
        this.error_msg = ''
        this.error = false
      }
    }     
    
  }

  valueChange() {
    this.remainingText = this.value.length+ '/'+this.max;
   }

   formatSelectedDate(date){
    let language = 'es-es'
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'dd/MM/YYYY');
  }

}


