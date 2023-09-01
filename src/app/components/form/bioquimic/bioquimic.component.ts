import { Options } from 'ngx-slider-v2';
import { ApplicationRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlertController, IonInput } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ItemForm } from '../shared/item-form';

@Component({
  selector: 'app-bioquimic',
  templateUrl: './bioquimic.component.html',
  styleUrls: ['./bioquimic.component.scss'],
})
export class BioquimicComponent implements  OnInit, ItemForm {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('ionInputEl', { static: false }) ionInputEl!: IonInput;
  label = ''
  sliderForm: FormControl;
  slider: true;
  error = false
  value = ''
  min = ''
  max = ''
  step = '1'
  error_msg = ''
  valueDefault = ''
  numDecimal
  isVertical: boolean = false;
  sliderHeader = '';
  sliderFooter = '';
  valueDescription = '';
  //intervals
  value1: number = 0;
  options:Options = {
    floor: 0,
    ceil: 100,
    vertical: true,
    // showTicks: true,
    showSelectionBar: true,
  }
  constructor(
    private translate: TranslateService, private appRef: ApplicationRef) { }

  ngOnInit() {
    console.log('BioquimicComponent data: ', this.data)
    this.isVertical = this.data?.data?.slider_vertical? true:false
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    this.slider = this.data?.bioquimic?.slider
    this.max = this.data?.bioquimic?.max
    this.min = this.data?.bioquimic?.min
    let step = this.data?.bioquimic?.step? this.data?.bioquimic?.step: this.step
    if(Number(step) <= 0){
      this.step =  '1'
    }else this.step = step
    let vDefault = this.data?.data?.valueDefault
    if(vDefault >= Number(this.min) && vDefault <= Number(this.max))
    this.valueDefault = vDefault

    this.value = this.data.required? this.value: this.valueDefault
    const decimals = Number(this.step)%1  //String(Number(this.step) - Math.floor(Number(this.step))).length - 2
    this.numDecimal = this.getDecimalNumber(this.step, decimals) //decimals < 0? 0:decimals

    if(this.isVertical){
      //this.intervals = this.getInterval();
      let header = this.data?.translate?.start_message_bioquimic ? this.data?.translate?.start_message_bioquimic[this.data?.userLang]:''
      let footer = this.data?.translate?.end_message_bioquimic ? this.data?.translate?.end_message_bioquimic[this.data?.userLang]:''
      this.sliderHeader= header? header:''
      this.sliderFooter= footer? footer:''

      this.setVerticalSlider()
    }
    // else
    //   this.setHorizontalSlider()

  }
  setHorizontalSlider(){
    const decimals = Number(this.step)%1  //String(Number(this.step) - Math.floor(Number(this.step))).length - 2
    this.numDecimal = this.getDecimalNumber(this.step, decimals) //decimals < 0? 0:decimals
  }

  // getInterval(): number {

  //   if(this.data.data?.step_range){
  //     console.log("Interval Number: ", this.data.data?.step_range);
  //     let numero = Number(this.data.data?.step_range);
  //     if(numero == 5)
  //       return numero
  //     else
  //       return 10
  //   }else{
  //     let numero: number =  Number(this.max) - Number(this.min)

  //     if (numero >= 0 && numero <= 10) {
  //       return 5;
  //     } else {
  //       return 10;
  //     }
  //   }

  // }

  setVerticalSlider(){
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = Number(this.min)
    newOptions.ceil = Number(this.max)
    newOptions.step = Number(this.step)
    this.options = newOptions;
    this.value1 = this.data.required? this.value1:Number(this.valueDefault)
  }

  setValue(event){
    try {
      event.target.value = event.target?.value?.replace(",",".")
    } catch (error) {}
    let aux = event.target?.value
    let point = (aux+'')?.substring(aux?.length - 1)
    if( point == '.' ||  point == ',' || isNaN(aux))
    return
    let valueD = Math.abs(aux%1) 
    let num = this.getDecimalNumber(aux, valueD)
    //console.log('BioquimicComponent setValue() valueD: ', valueD , 'decimal: ', this.numDecimal, 'num' , num, event.type)
    if(num > this.numDecimal && valueD > 0 //&& event.type == 'ionChange'
    ){
      const resp =  parseFloat(aux+'')?.toFixed(this.numDecimal)
      event.target.value = this.value =  resp
      console.log('BioquimicComponent setValue() r ', this.value , this.numDecimal)
    }else{
      this.value =  event.target.value
      console.log('BioquimicComponent setValue() ', this.value , this.numDecimal)
    }
    if(event.type !== 'ionChange')
    this.change.emit({[this.data.name]: Number(this.value)});


    if(this.isVertical){
      if(aux < Number(this.min))
      return
      setTimeout( () => this.value1 = (aux !== '')? aux:this.options.floor, 400)
      //this.value1 = (aux !== '')? aux:this.options.floor
      //console.log('BioquimicComponent setValue() vert ', this.value, this.value1)
    }
    this.appRef.tick();
  }

  setValue1(event){
    try {
      event.target.value = event.target?.value?.replace(",",".")
    } catch (error) {}
    let aux = event.target?.value
    let point = (aux+'')?.substring(aux?.length - 1)
    if( point == '.' ||  point == ',' || isNaN(aux))
    return
    let valueD = Math.abs(aux%1) 
    let num = this.getDecimalNumber(aux, valueD)
    //console.log('BioquimicComponent setValue() valueD: ', valueD , 'decimal: ', this.numDecimal, 'num' , num, event.type)
    if(num > this.numDecimal && valueD > 0 && event.type == 'ionChange'
    ){
      const resp =  parseFloat(aux+'')?.toFixed(this.numDecimal)
      this.value =  resp
      console.log('BioquimicComponent setValue() r ', this.value , this.numDecimal)
    }else{
      this.value =  event.target.value
      console.log('BioquimicComponent setValue() ', this.value , this.numDecimal)
    }
    if(event.type !== 'ionChange')
    this.change.emit({[this.data.name]: Number(this.value)});


    if(this.isVertical){
      if( point == '.' ||  point == ',' || aux < Number(this.min))
      return
      setTimeout( () => this.value1 = (aux !== '')? aux:this.options.floor, 400)
      //this.value1 = (aux !== '')? aux:this.options.floor
      //console.log('BioquimicComponent setValue() vert ', this.value, this.value1)
    }
    this.appRef.tick();
  }

  getDecimalNumber(value, decimal){
    if(decimal<=0) return 0
    let aux = String(value)?.split(/[.,]+/)[1]
    //console.log('BioquimicComponent getDecimalNumber() aux: ', aux)
    return aux? aux.length: 0
  }

  sendValue(event?){
    // console.log('BioquimicComponent sendValue() ', event)
    // console.log('BioquimicComponent sendValue() ', this.value)
    this.change.emit({[this.data.name]: Number(this.value)});
  }

  checkValue(){
    if((this.value === '' || Number.isNaN(this.value)) && this.data.required){
      this.error_msg = this.translate.instant('form.error_required')
      this.error = true
    }
    else if(this.value !== '' && (Number(this.value) > Number(this.max) ||  Number(this.value) < Number(this.min)) ){
      this.error_msg = this.translate.instant('form.error_no_valid') + ` [${this.min} - ${this.max}]`
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

  onValueChange(event){
    //console.log('SliderComponent onValueChange() ', event, this.value, this.value1)
    if( this.value === '' && this.value1 === this.options?.floor)
    return
    this.value = event
  }

  update(){
    this.appRef.tick();
  }
}

