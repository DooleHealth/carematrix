import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DooleService } from 'src/app/services/doole.service';
import { FormItem } from '../shared/form-item';
import { FormDirective } from '../shared/form.directive';
import { FormService } from '../shared/form.service';
import { ItemForm } from '../shared/item-form';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnInit {
  @Input() item: FormItem[] = [];
  @Input() id;
  @Input() wizard;
  @Input() buttonPreview: boolean;
  @Input() title;
  @Input() goalsByAlarms: any;
  index: number = 0;
  indexArray: number = 0;
  @ViewChild(FormDirective, {static: true}) appFormD!: FormDirective;
  @Output() sendForm: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(IonContent, {read: IonContent, static: false}) content: IonContent;
  listComponentRef = []
  disabled_next = false
  isFirstElement = false
  num_progressBar = 0;
  note_message: string
  constructor(
    private resolver: ComponentFactoryResolver,
    private formService: FormService,      
    //private dooleService: DooleService,
    public translate: TranslateService,
    ) { }

  ngOnInit() { 
    console.log('FormPage ngOnInit() goalsByAlarms', this.goalsByAlarms)
    this.note_message = this.translate.instant('form.goal.message')
    this.loadComponent()
  }

  progressBar(){
    if(this.disabled_next)
      return 1
    else
      return this.indexArray/this.listComponentRef.length
  }

  showComponentWizard(){
    this.listComponentRef.forEach(component => {
      if(component.instance.data.index === this.index)
      component.instance.desactive = false
      else component.instance.desactive = true
    });
  }

  next(){
    let component = this.listComponentRef?.find(item => item?.instance?.data?.index === this.index)
    if(component){
      console.log('FormComponent next()', component)
      if(component.instance.data.required)
      component.instance?.checkValue()
      if(component.instance?.error){
        this.scrollTo(component.instance.data.id)
        return
      }
       this.num_progressBar = this.indexArray/this.listComponentRef.length
    }
    console.log('FormComponent next()', component)
    this.indexArray = this.indexArray+1
    this.searchIndexNext()
    this.showComponentWizard()

  }
  back(){
    this.disabled_next = false
    this.indexArray = this.indexArray-1
    this.searchIndexBack()
    this.showComponentWizard()
  }

  searchIndexNext(){
    let n = this.indexArray
    while(true){
      if(n >= this.item.length){
        this.indexArray = this.indexArray - 1
        this.disabled_next = true
        this.index = this.item[this.indexArray].data.index
        break;
      }
      if(this.item[n].data.hidden)
        n = n+1;
      else{
        this.indexArray = n
        this.index = this.item[n].data.index
        break;
      }
    }
  }

  searchIndexBack(){
    let n = this.indexArray
    while(true){
      if(n < 0){
        this.indexArray = this.indexArray + 1
        this.index = this.item[this.indexArray].data.index
        break;
      }
      if(this.item[n].data.hidden)
        n = n-1;
      else{
        this.indexArray = n
        this.index = this.item[n].data.index
        break;
      }
    }
  }

  loadComponent(){
    console.log('FormComponent loadComponent()')
    const viewContainerRef = this.appFormD.viewContainerRef;
    viewContainerRef.clear();
    // if(this.wizard)
    // this.orderIndexItem();
    this.item.forEach( (i, index)=>{
      //console.log('FormComponent loadComponent()', i , i.data.index)
      const formComponent = this.resolver.resolveComponentFactory(i.component);
      const componentRef = viewContainerRef.createComponent<ItemForm>(formComponent);
      componentRef.instance.data = i.data;
      if(this.wizard){
        if(this.isFirstElement == false){   
          if(!this.isHiddenComponent(i.data.type) && i.data.hidden === false){
            this.index =  i.data.index //index
            componentRef.instance.desactive = false;
            this.isFirstElement = true
          }
          else{
            componentRef.instance.desactive = true;
            //console.log(`FormComponent loadComponent() ${index} si`, index , i.data, i.data.hidden,   componentRef.instance.desactive )
          }
        }
        else
        componentRef.instance.desactive = true;

      }
      this.subsCriptionEvent(componentRef)
      this.listComponentRef.push(componentRef);
    })
  }

  orderIndexItem(){
    this.item.sort( function (a, b) {
      if (a?.data?.index > b?.data?.index) 
        return 1;
      if (a?.data?.index < b?.data?.index)
        return -1;
      return 0;
    })
  }

  subsCriptionEvent(component){
    const sub:Subscription = component.instance?.change?.subscribe(event => {
      console.log('FormsComponent ', event)
      this.getConditional(event)
    });
    //component.onDestroy(()=> { sub.unsubscribe(); console.log("Unsubscribing")});
  }

  // getForm(){
  //   this.dooleService.getAPIFormJSON(this.id).subscribe(
  //     async (res: any) =>{
  //       console.log('[AgendaPage] getForm()', await res);
  //       if(res.success){    
  //           let json =res.fields
  //           if(json.length > 0){
  //             this.item = []
  //             // this.getComponent(json)
  //             this.item = this.formService.getComponent(json)
  //             console.log('[AgendaPage] getForm()', await this.item);
  //             this.loadComponent()
  //           }
  //       }
  //      },(err) => { 
  //         console.log('[AgendaPage] getForm() ERROR(' + err.code + '): ' + err.message); 
  //         throw err; 
  //     });
  // }

  getConditional(p){
    let param= {
      formField: Object.keys(p),
      value: Object.values(p)
    }
    //console.log('[AgendaPage] getConditional()',param); 
    const res = this.formService.evalueConditions(param)
    //console.log('[AgendaPage] getConditional() res', res.show, res.hide)
    this.activeConditionals(res.show, res.hide)

    // this.dooleService.postAPIFormJSON(this.id, param).subscribe( response =>{
    //   //console.log(response)
    //   let show = response.show;
    //   let hide = response.hide;
    //   console.log('[AgendaPage] getConditional() res', show, hide)
    //   this.activeConditionals(show, hide)
    // },(err) => {
    //   console.log('[AgendaPage] getConditional() ERROR(' + err.code + '): ' + err.message); 
    //   throw err;
    // });
  }

  activeConditionals(show, hide){
      //console.log('activeConditionals()', show, hide)
      show.forEach(value => {
        let aux = this.listComponentRef.find(component => component.instance.data.name === value)
        if(aux){
          if(!this.isHiddenComponent(aux.instance.data.type))
          aux.instance.data.hidden = false;
            //Solo para modo wizard
            if(this.disabled_next && this.wizard){
              const indexNew = this.listComponentRef.findIndex(item => item === aux)
              this.disabled_next = indexNew >= this.indexArray? false: this.disabled_next
            }
        }
        //console.log('activeConditionals()', aux)
      })

      hide.forEach(value => {
        let aux = this.listComponentRef.find(component => component.instance.data.name === value)
        if(aux) aux.instance.data.hidden = true;
        //console.log('activeConditionals()', aux)
      })
  }

  activeConditionalsWizard(show, hide){
    //console.log('activeConditionals()', show, hide)
    show.forEach(value => {
      let aux = this.item.find(component => component.data.name === value)
      if(aux) aux.data.hidden = false;
      //console.log('activeConditionals()', aux)
    })

    hide.forEach(value => {
      let aux = this.item.find(component => component.data.name === value)
      if(aux) aux.data.hidden = true;
      //console.log('activeConditionals()', aux)
    })
}

  clear() {
    this.appFormD.viewContainerRef.clear();
  }

  ngOnDestroy() {
    this.clear()
  }

  scrollTo(elementId: string) {
    let y = (this.wizard)? 0 : document.getElementById(elementId).offsetTop;
    console.log('FormComponent scrollTo()', y)
    setTimeout(() => {
          this.content.scrollToPoint(0, y, 500)
    }, 500);
  }

  send(){
    let error_question = []
    let success_question = []
    this.listComponentRef.forEach( (component, index) =>{
      if(!component.instance.data.hidden){
        component.instance?.checkValue()
        //console.log('FormComponent loadComponent()', index, component.instance.error)
        if(component.instance?.error)
          error_question.push(component)
      }
     
    }) 
    console.log('send() error_question', error_question)
    if(error_question.length > 0){
      this.scrollTo(error_question[0].instance.data.id) 
      return
    }

    let formData = {};
    this.listComponentRef.forEach( (component, index) =>{
      let value = component.instance.value
      let key = component.instance.data.name
      if(!component.instance.data.hidden && (value !== undefined && value?.length !== 0)){
        formData[key] = value
        //console.log('activeConditionals()', value)
      }
      else if(component.instance.data.type === 'formula' || component.instance.data.type === 'logic' 
          || component.instance.data.type === 'hidden'){
            if(value !== '')
            formData[key] = value
      }   
    }) 
    console.log('[FormsComponent] send()', formData)
    this.sendForm.emit(formData);
  }

  isHiddenComponent(type){
    console.log('[FormsComponent] isHiddenComponent()', type)
    if(type === 'formula' || type === 'logic'  || type === 'hidden' || type === 'button')
    return true
    else return false
  }
  
}

