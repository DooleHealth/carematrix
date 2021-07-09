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
  date: any;
  isNewValueElement = false
  id:any
  nameElement: any
  units:any
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private translate : TranslateService,
    private navController: NavController,
    private alertController: AlertController
  ) { 
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.date = localISOTime;
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
    if(this.form.invalid)
    return
    this.addElement()
  }

  getIdElement(){
    this.id = history.state.id;
    this.nameElement = history.state.name;
    this.units = history.state.units
    console.log('[ElementsAddPage] getIdElement()', this.id);
    if(this.id){
      this.getElement()
    }else{
      this.getCategoryElementList()
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
            this.showAlert()
        },
        (error) => {
          // Called when error
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

  async getCategoryElementList(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIcategory().subscribe(
      async (res: any) =>{
         this.groupElements = []
        console.log('[ElementsAddPage] getCategoryElementList()', await res);
        this.groupElements = res
        loading.dismiss();
       },async (err) => { 
          console.log('[ElementsAddPage] getCategoryElementList() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          throw err; 
      });
  }

  async getElement(){
/*     const loading = await this.loadingController.create();
    await loading.present(); */
    this.dooleService.getAPIelementID(this.id).subscribe(
      async (res: any) =>{
        console.log('[ElementsAddPage] getElement()', await res);
        this.isNewValueElement = true
        this.nameElement = res.name;
        this.units = res.units
        this.element = {id: this.id, name: this.nameElement, units: this.units}
        this.form.get('data').setValue(this.nameElement)
        this.form.get('category').setValue(this.nameElement)
        //loading.dismiss();
       },async (err) => { 
          console.log('[ElementsAddPage] getElement() ERROR(' + err.code + '): ' + err.message); 
          //loading.dismiss();
          throw err; 
      });
  }

  selectedCategory(){
    let category = this.form.get('category').value
    this.group = this.groupElements.find(group =>(group.group === category))
  }

  selectedElement(){
    let name = this.form.get('data').value
    this.element = this.group.elements.find(element =>(element.name === name))
    this.form.get('units').setValue( this.element.units)
  }

}
