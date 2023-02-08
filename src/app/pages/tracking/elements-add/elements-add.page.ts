import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-elements-add',
  templateUrl: './elements-add.page.html',
  styleUrls: ['./elements-add.page.scss'],
})
export class ElementsAddPage implements OnInit {
  @Input()id: any;
  @Input()nameElement: any;
  @Input()units: any;
  form: FormGroup;
  groupElements: any = []
  group: any = []
  element: any
  isSubmittedData = false
  isSubmittedCategory = false
  date: any;
  isNewValueElement = false
  isLoading = false
  placeholderRange
  //id:any
  // nameElement: any
  // units:any
  min: any
  max: any
  maxDate
  constructor(
    private fb: FormBuilder,
    private dooleService: DooleService,
    private translate : TranslateService,
    private modalCtrl: ModalController,
    public dateService: DateService
  ) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.date =  this.dateService.selectedDateFormat(localISOTime);
    let auxdate = new Date(Date.now()).setHours(23,59,59)
    let auxdate1 = new Date(auxdate)
    this.maxDate = (new Date(auxdate1.getTime() - tzoffset)).toISOString().slice(0, -1);
    console.log('[ElementsAddPage] formatDate() constructor()', this.date, this.maxDate);
  }

  ngOnInit() {
    this.form = this.fb.group({
      category: ['', [Validators.required]],
      data: ['', [Validators.required]],
      measure: ['', [Validators.required]],
      units: [''],
      date: [this.date],

    });

  }
  ionViewDidEnter(){
    //console.log('[ElementsAddPage] ionViewDidEnter()');
    this.getIdElement()
  }

  formatDate(){
    let date = new Date(this.form.get('date').value)
    const tzoffset = (date).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(date.getTime() - tzoffset)).toISOString()
    this.date =  localISOTime;
     console.log('[ElementsAddPage] formatDate()', this.date );
  }

  submit(){
    console.log("[ElementsAddPage] submit()");
    this.isSubmittedData = true
    this.isSubmittedCategory = true
    if(this.form.invalid)
    return
    if(this.isValueCorrect( Number(this.form.get('measure').value)))
      this.addElement()
    else
      this.messageInvalidValue()
  }

  messageInvalidValue(){
    let message = this.translate.instant('element.value_invalid')
    this.dooleService.presentAlert(`${message} ${this.min} - ${this.max} ${this.units}`)
    this.form.get('measure').setValue('')
  }

  getIdElement(){
    console.log('[ElementsAddPage] getIdElement()', this.id);
    if(this.id){
      this.isNewValueElement = true
      this.getElementAvailable()
    }else{
      this.getElementsGroup()
    }
  }

  async addElement() {
    this.isLoading = true
    this.formatDate()
    const postData = {
      date_value: this.date,
      value: this.form.get('measure').value,
      value2: undefined //this.value2
    };

    this.dooleService.postAPIaddElement( this.element.id ,postData).subscribe(
        async (data) => {
          console.log("[ElementsAddPage] addElement()",data);
          if(data.message === "Success"){
            this.modalCtrl.dismiss({error:null, action: 'add'});
          }
          else {
            let message = this.translate.instant('element.error_alert_message_add_element')
            alert(message)
          }
        },
        (error) => {
          // Called when error
          let message = this.translate.instant('element.error_alert_message_add_element')
            + ` .Error: ${error.code}, message: ${error.message}`
          alert(message)
          console.log("error: ", error);
          throw new HttpErrorResponse(error);
        },
        () => {
          // Called when operation is complete (both success and error)
          this.isLoading = false
        });
  }

  async getElementsGroup(){
    this.isLoading = true
    let params = {}
    this.dooleService.searchAPIelementGroup(params).subscribe(
      async (data: any) =>{
        console.log('[DiaryPage] getElementsGroup()', await data);
        if(data.results){
          this.groupElements = data.results
        }
        this.isLoading = false
       },(err) => {
          console.log('[DiaryPage] getElementsGroup() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

  async getElements(id){
    this.isLoading = true
    this.dooleService.getAPIelementGroupID(id).subscribe(
      async (data: any) =>{
        console.log('[DiaryPage] getElements()', await data);
        if(data.success){
          this.group = data
        }
        this.isLoading = false
       },(err) => {
          console.log('[DiaryPage] getElements() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }

  placeholderRangeElement(){
    if(this.min !== undefined && this.max != undefined)
    this.placeholderRange= this.min + ' - ' + this.max
  }

  async getElementAvailable(){
    this.dooleService.getAPIelementAvailableID(this.id).subscribe(
      async (res: any) =>{
        console.log('[ElementsAddPage] getElementAvailable()', await res);
        this.element = res.elements[0]
        if(this.element){
          this.nameElement = this.element.name;
          this.units = this.element.units
          this.min = this.element.min
          this.max = this.element.max
          this.placeholderRangeElement()
          if(this.isNewValueElement){
            this.form.get('data').setValue(this.nameElement)
            this.form.get('category').setValue(this.nameElement)
          }
        }
       },async (err) => {
          alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[ElementsAddPage] getElementAvailable() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }

  selectedCategory(){
    let category = this.form.get('category').value
    console.log('[ElementsAddPage] selectedCategory()', category);
    this.getElements(category)
    this.form.get('data').setValue('')
  }

  selectedElement(){
    let name = this.form.get('data').value
    this.element = this.group.elements.find(element =>(element.name === name))
    if(this.element){
      this.id = this.element.id
      this.units = this.element?.element_unit?.abbreviation
      this.form.get('units').setValue( this.units)
      this.min = this.element.min
      this.max = this.element.max
      this.placeholderRangeElement()
      //this.getElementAvailable()
    }
  }

  isValueCorrect(value){
    if(value >= Number(this.min) && value <= Number(this.max)){
      return true
    }
    else if(this.min == null && this.max == null){
      return true
    }
    else{
      return false
    }
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
