import { Injectable } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { BioquimicComponent } from '../bioquimic/bioquimic.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FileComponent } from '../file/file.component';
import { HeaderComponent } from '../header/header.component';
import { HiddenComponent } from '../hidden/hidden.component';
import { InputComponent } from '../input/input.component';
import { ParagraphComponent } from '../paragraph/paragraph.component';
import { RadioComponent } from '../radio/radio.component';
import { SelectComponent } from '../select/select.component';
import { SliderComponent } from '../slider/slider.component';
import { TextareaComponent } from '../textarea/textarea.component';

import { FormItem } from './form-item';
import { Form } from './item-form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  itemsForm = []
  formFieldConditionals = []
  userLang
  constructor() {
   }

  getComponent(json){
    console.log('[FormService] getComponent()')
    this.itemsForm = []
    json.forEach((data, index) => {
      let formfieldType = data.layout.formFieldType;
      let obj = this.getFormFormat(data)
      switch (formfieldType) {
        case 'header':
          this.itemsForm.push(new FormItem(HeaderComponent, obj))
          break;
        case 'radio':
          this.itemsForm.push(new FormItem(RadioComponent, obj))
          break;
        case 'radio-group':
          this.itemsForm.push(new FormItem(RadioComponent, obj))
          break;
        case 'checkbox':
          this.itemsForm.push(new FormItem(CheckboxComponent, obj))
          break;
        case 'checkbox-group':
          this.itemsForm.push(new FormItem(CheckboxComponent, obj))
          break;
        case 'bioquimic': // Validacion
          this.itemsForm.push(new FormItem(BioquimicComponent, obj))
          break;
        case 'slider': // Validacion
          this.itemsForm.push(new FormItem(SliderComponent, obj))
          break;
        case 'paragraph':
          this.itemsForm.push(new FormItem(ParagraphComponent, obj))
          break;
        case 'file':
          this.itemsForm.push(new FormItem(FileComponent, obj))
          break;
        case 'autocomplete':
          this.itemsForm.push(new FormItem(AutocompleteComponent, obj))
          break;
        case 'select':
          this.itemsForm.push(new FormItem(SelectComponent, obj))
          break;
        case 'textarea': // Validacion
          this.itemsForm.push(new FormItem(TextareaComponent, obj))
          break; 
        case 'text': // Validacion
          this.itemsForm.push(new FormItem(InputComponent, obj))
          break; 
        case 'hidden':
          this.itemsForm.push(new FormItem(HiddenComponent, obj))
        default: // Validacion
          if (formfieldType == 'number' || formfieldType == 'date' || formfieldType ==
          'formula' || formfieldType == 'logic' || formfieldType == 'button') {
            this.itemsForm.push(new FormItem(InputComponent, obj))
          }
          break;
      }
    })
    return this.itemsForm
  }

  getFormFormat(obj): Form {
    return {
      id: obj.layout.id,
      options: obj.options,
      layout: obj.layout,
      data: obj.data,
      conditions: obj.condition,
      type: obj.layout.formFieldType,
      translate: obj.translate,
      index: obj.index,
      required: obj.validation.require,
      name:  obj.layout.name,
      label: obj.layout.label,
      validation: obj.validation,
      hidden: obj.condition?.when=='none' ? false:true,
      placeholder: this.getPlaceholder(obj, this.userLang),
      tooltip: this.getTooltip(obj, this.userLang),
      userLang: this.userLang,
      bioquimic: obj.bioquimic
    }
  }

  getPlaceholder(obj, userLang) {
    let placeholder = '';
    if (obj.layout.placeholder != '') {
        // Si existe traduccion, se muestra valor del campo traducido al idioma del usuario
        if (obj.translate.hasOwnProperty('placeholder_' + obj.layout.formFieldType)) {
            let texttranslate = obj.translate['placeholder_' + obj.layout.formFieldType][userLang]
            if (texttranslate != null) {
                //placeholder = texttranslate;
                placeholder = texttranslate.replace(/(<([^>]+)>)/gi, "");
            }
        }
        // Si no existe traduccion, se muestra valor del campo por defecto
        else {
            placeholder = obj.layout.placeholder;
        }
    }
    return placeholder;
  }

  getTooltip(obj, userLang) { 
    let tooltip = '';
    if (obj.layout.toolTip != '' && obj.layout.toolTip != null || 
        obj.layout.tooltip != '' && obj.layout.tooltip != null) {
        // Si existe traduccion, se muestra valor del campo traducido al idioma del usuario
        if (obj.translate.hasOwnProperty('tooltip_' + obj.layout.formFieldType)) {
            let texttranslate = obj.translate['tooltip_' + obj.layout.formFieldType][userLang]
            // console.log('getTooltip() ',obj.index, texttranslate)
            if (texttranslate != null) {
                tooltip = texttranslate.replace(/(<([^>]+)>)/gi, "");
            }
        }
        // Si no existe traduccion, se muestra valor del campo por defecto
        else {
            tooltip = obj.layout.toolTip
        }
    }
    return tooltip;
  }
  
  evalueConditions(params){
    //console.log('[FormService] evalueConditions()',this.formFieldConditionals ,params); 
    let hide = []
    let show = []
    let conditionals = []
    let name = params.formField[0]
    let value = (params.value.length > 0)? params.value[0] : null
    console.log('[FormService] evalueConditions() name: ', name, value); 

    const formFieldConditionalByName = this.formFieldConditionals.filter(item => item.name_depending == name)
    formFieldConditionalByName.forEach( conditional => {
      if(conditional.condition == "="){
            if(value == conditional.value1 && conditional.show=="1")
                show.push(conditional.name);
            else
                hide.push(conditional.name);
      }
      if(conditional.condition =="a<x<b"){
            if(((conditional.value1<value && value<conditional.value2)||value!=null) && conditional.show=="1")
                show.push(conditional.name)
            else
                hide.push(conditional.name)
      }
      if(conditional.condition == ">"){
          if(value > conditional.value1 && conditional.show=="1")
              show.push(conditional.name);
          else
              hide.push(conditional.name);
      }

      if(conditional.condition == "<"){
          if(value < conditional.value1 && conditional.show=="1")
              show.push(conditional.name);
          else
              hide.push(conditional.name);
      }

      conditionals.push(conditional)
    })

    return {
      show: show,
      hide: hide,
      conditionals: conditionals,
  }
    
  }

  getConditionalsForm(conditionals){
    this.formFieldConditionals = conditionals
    console.log('[FormService] getConditional()',this.itemsForm); 

  }
}
