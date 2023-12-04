import { Options } from '@angular-slider/ngx-slider/options';
import { ApplicationRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ItemForm } from '../shared/item-form';

interface SliderModel {
  value: number;
  options: Options;
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, ItemForm {
  @Input() data: any;
  @Input() desactive: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  label = ''
  sliderForm: FormControl;
  error = false
  slider: true;
  value = ''
  min = ''
  max = ''
  step = '1'
  stepRange = ''
  error_msg = ''
  valueDefault = ''
  numDecimal
  isVertical: boolean = false;
  sliderHeader = '';
  sliderFooter = '';
  valueDescription = '';
  intervals;
  ticksArray: number[] = [];
  value1: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0,
    vertical: true,
    showSelectionBar: true
  };

  constructor(public translate: TranslateService, private appRef: ApplicationRef) {}

  ngOnInit() {
    console.log("this data slider:", this.data);

    this.isVertical = this.data?.data?.slider_vertical? true:false
    let translate = this.data?.translate[`label_${this.data.type}`]
    this.label = translate[this.data?.userLang]?.replace('<p', '<div')?.replace('</p', '</div')
    this.slider = this.data?.bioquimic?.slider
    this.min = this.data.data.min
    this.max = this.data.data.max

    let step = this.data?.data?.step? this.data?.data?.step: this.step
    if(Number(step) <= 0){
      this.step =  '1'
    }else this.step = step
    let vDefault = this.data?.data?.valueDefault
    if(Number(vDefault) >= Number(this.min) && Number(vDefault) <= Number(this.max))
      this.valueDefault = vDefault
    this.value = this.data.required? this.value: this.valueDefault

    this.value = this.data.required? this.value: this.valueDefault
    const decimals = Number(this.step)%1  //String(Number(this.step) - Math.floor(Number(this.step))).length - 2
    this.numDecimal = this.getDecimalNumber(this.step, decimals) //decimals < 0? 0:decimals


    if(this.isVertical){

      this.intervals = this.getInterval();
      let header = this.data?.translate?.start_message_slider ? this.data?.translate?.start_message_slider[this.data?.userLang]:''
      let footer = this.data?.translate?.end_message_slider ? this.data?.translate?.end_message_slider[this.data?.userLang]:''
      this.sliderHeader= header? header:''
      this.sliderFooter= footer? footer:''

      this.setVerticalSlider()
    }else
      this.setHorizontalSlider()
  }

  getInterval(): number[] {

    if(this.data.data?.step_range){
      return this.calculateRangeAndDivideBySteps(Number(this.min), Number(this.max),Number("5"))
    }else{
      return this.calculateRangeAndDivide(Number(this.min), Number(this.max));
    }

  }

  divideRangeInTenParts(num1: number, num2: number): number {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
       console.error("divideRangeInTenParts: Both inputs must be numbers.");
    }

    const totalParts = 10;

    // Find the smaller and larger number between num1 and num2
    const minNum = Math.min(num1, num2);
    const maxNum = Math.max(num1, num2);

    // Calculate the range between the two numbers
    const range = maxNum - minNum;

    // Calculate the size of each part
    const partSize = range / totalParts;

    // Calculate the 10 equal parts
    const equalParts: number[] = [];
    for (let i = 0; i <= totalParts; i++) {
        equalParts.push(minNum + i * partSize);
    }

    return Math.round(partSize);
}

calculateRangeAndDivideBySteps(a, b, c) {
  if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(c)) {
    throw new Error('All parameters should be integers.');
  }

  const range = Math.abs(b - a);
  const partSize = range / c;
  const dividedParts = [];

  let current = Math.min(a, b);
  for (let i = 0; i < c; i++) {
    this.ticksArray.push(Math.round(current));
    current += partSize;
  }

  this.ticksArray.push(b);

  return dividedParts;
}

  setHorizontalSlider(){
    const decimals = Number(this.step)%1  //String(Number(this.step) - Math.floor(Number(this.step))).length - 2
    this.numDecimal = this.getDecimalNumber(this.step, decimals) //decimals < 0? 0:decimals
  }

  setVerticalSlider(){
    const decimals = Number(this.step)%1  //String(Number(this.step) - Math.floor(Number(this.step))).length - 2
    this.numDecimal = this.getDecimalNumber(this.step, decimals) //decimals < 0? 0:decimals

    if(this.data.data?.step_range){
      this.options  = {
        floor: Number(this.min),
        ceil: Number(this.max),
        vertical: true,
        showSelectionBar: true,
        step:Number(this.step),
        showTicksValues: true,
        showTicks: true,
        ticksArray:this.ticksArray
      };
    }else{
      this.options  = {
        floor: Number(this.min),
        ceil: Number(this.max),
        vertical: true,
        showSelectionBar: true,
        step:Number(this.step)
      };

    }

    console.log('SliderComponent setVerticalSlider() ', this.options)
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
    //console.log('SliderComponent setValue() valueD: ', valueD , 'decimal: ', this.numDecimal, 'num' , num)
    if(num > this.numDecimal &&valueD > 0 && event.type == 'ionChange'
    ){
      const resp =  parseFloat(aux+'')?.toFixed(this.numDecimal)
      event.target.value = this.value =  resp
      console.log('SliderComponent setValue() r ', this.value , this.numDecimal)
    }else{
      this.value =  event.target.value
      console.log('SliderComponent setValue() ', this.value , this.numDecimal)
    }
    if(event.type !== 'ionChange')
    this.change.emit({[this.data.name]: Number(this.value)});


    if(this.isVertical){
      if( aux < Number(this.min))
      return
      //this.value1 = (aux !== '')? aux:this.options.floor
      setTimeout( () => this.value1 = (aux !== '')? aux:this.options.floor, 400)
      //console.log('SliderComponent setValue() vert ', this.value, this.value1)
    }
    this.appRef.tick();
  }

  getDecimalNumber(value, decimal){
    if(decimal<=0) return 0
    let aux = String(value)?.split(/[.,]+/)[1]
    console.log('SliderComponent getDecimalNumber() aux: ', aux)
    return aux? aux.length: 0
  }

  sendValue(event?){
    // console.log('SliderComponent sendValue() ', event)
    console.log('SliderComponent sendValue() ', this.value)
    this.change.emit({[this.data.name]: Number(this.value)});
  }


  checkValue(){
    if( (this.value === '' || Number.isNaN(this.value)) && this.data.required){
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
      //if(this.value != '')
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

   calculateRangeAndDivide(a: number, b: number): number[] | null {
    if (typeof a !== 'number' || typeof b !== 'number' || !Number.isInteger(a) || !Number.isInteger(b)) {
      throw new Error('Both parameters should be integers.');
    }

    const range = Math.abs(b - a);
    let equalParts: number[] = [];

    if (range < 10) {
      equalParts = this.divideIntoEqualParts(a,b, b);
    } else{
      equalParts = this.divideIntoEqualParts(a, b, 10);
    }

    return equalParts;
  }

  divideIntoEqualParts(a:number, b: number, numParts: number): number[] {
    const partSize = b / numParts;
    const equalParts: number[] = [];
    let current = a;

    this.ticksArray.push(a);
    for (let i = 0; i < numParts; i++) {
      current = current + partSize

      this.ticksArray.push(Number(current.toFixed(1)));

      if((current + partSize) >= b )
        break;

    }

    this.ticksArray.push(b);


    return equalParts;
  }



}
