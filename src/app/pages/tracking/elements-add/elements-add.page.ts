import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-elements-add',
  templateUrl: './elements-add.page.html',
  styleUrls: ['./elements-add.page.scss'],
})
export class ElementsAddPage implements OnInit {
  form: FormGroup;
  groupElements: any = []
  group: any = []
  element: any
  isSubmittedData = false
  isSubmittedCategory = false
  date: any;
  isNewValueElement = false
  id:any
  nameElement: any
  units:any
  min
  max
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private translate : TranslateService,
    private navController: NavController,
    private alertController: AlertController,
  ) { 
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.date =  localISOTime;
  }

  ngOnInit() {
    this.form = this.fb.group({
      category: ['', [Validators.required]],
      data: ['', [Validators.required]],
      measure: ['', [Validators.required]],
      units: [''],
      date: [''],

    });

  }
  ionViewDidEnter(){
    console.log('[ElementsAddPage] ionViewDidEnter()');
    this.getIdElement()
  }

  submit(){
    console.log("[ElementsAddPage] submit()");
    this.isSubmittedData = true
    this.isSubmittedCategory = true
    if(this.form.invalid)
    return
    if(this.isValueCorrect(this.form.get('measure').value))
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
    this.id = history.state.id;
    this.nameElement = history.state.name;
    this.units = history.state.units
    console.log('[ElementsAddPage] getIdElement()', this.id);
    if(this.id){
      this.isNewValueElement = true
      this.getElementAvailable()
    }else{
      this.getElementsList()
    }
  }

  async addElement() {

    const loading = await this.loadingController.create();
    await loading.present();

    const postData = {
      date_value: this.date,
      value: this.form.get('measure').value,
      value2: undefined //this.value2
    };

    this.dooleService.postAPIaddElement( this.element.id ,postData).subscribe(
        async (data) => {
          console.log("[ElementsAddPage] addElement()",data);
          if(data.message === "Success")
          this.showAlert()
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
          loading.dismiss();
        });
  }

  async showAlert(){
    console.log(`[ElementsAddPage] showAlert()`);
    const alert = await this.alertController.create({
      header: this.translate.instant('alert.header_info'),
      message: this.translate.instant('element.alert_message_add_element'),
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            this.navController.pop()
          }
        }
      ]
    });
    await alert.present();
  }

  async getElementsList(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.dooleService.getAPIelementsList().subscribe(
      async (data: any) =>{
        console.log('[DiaryPage] getElementsList()', await data); 
        if(data.eg){
          this.groupElements = []
          // Iterate elements in the tree searching for element groups
          this.treeIterate(data.eg, '');
          this.filterCategoryWithElement()
        }
        loading.dismiss();
       },(err) => { 
          console.log('[DiaryPage] getElementsList() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          loading.dismiss();
          throw err; 
      });
  }

  treeIterate(obj, stack) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {

          this.treeIterate(obj[property], stack + '.' + property);
        } else {
          if(property=="group"){
            obj['is_child'] = stack.includes('childs');
            this.groupElements.push(obj);

          }

        }
      }
    }
  }

  filterCategoryWithElement(){
    this.groupElements = this.groupElements.filter( group => group.elements.length > 0)
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
          //this.element = {id: this.id, name: this.nameElement, units: this.units}
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
    this.group = this.groupElements.find(group =>(group.group === category))
    //this.element = undefined
    this.form.get('data').setValue('')
  }

  selectedElement(){
    let name = this.form.get('data').value
    this.element = this.group.elements.find(element =>(element.name === name))
    if(this.element){
      this.form.get('units').setValue( this.element.units)
      this.id = this.element.id
      this.getElementAvailable()
    }
  }

  isValueCorrect(value){
    if(value >= this.min && value <= this.max){
      return true
    }
    else{
      return false
    }
  }

}
