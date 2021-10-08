import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  @Input()address: any;
  isEdit = false;
  form: FormGroup;

  isSubmittedName
  isSubmittedAddress
  isSubmittedTelephone
  isSubmittedCity
  isSubmittedState
  isSubmittedPostalCode
  isLoading: boolean;
  constructor(
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.setAddress()
  }


  isSubmittedFields(isSubmitted){
    this.isSubmittedName = isSubmitted
    this.isSubmittedAddress = isSubmitted;
    this.isSubmittedTelephone= isSubmitted;
    this.isSubmittedCity= isSubmitted;
    this.isSubmittedState= isSubmitted;
    this.isSubmittedPostalCode= isSubmitted;
  }

  setAddress(){
    if(this.address){
      this.isEdit = true
      if(this.address?.address) this.form.get('address').setValue(this.address.address)
      if(this.address?.name) this.form.get('name').setValue(this.address.name)
      if(this.address?.city) this.form.get('city').setValue(this.address.city)
      if(this.address?.state) this.form.get('state').setValue(this.address.state)
      if(this.address?.phone) this.form.get('phone').setValue(this.address.phone)
      if(this.address?.postal_code) this.form.get('postal_code').setValue(this.address.postal_code)
    }
  }

  submit(){
    console.log('submit',this.form.value);
    this.isSubmittedFields(true)
    //this.isSubmitted = true;
    if(this.form.invalid)
    return 
    if(this.isEdit)
    this.updateAddress()
    else
    this.saveDirection()
  }

  updateAddress() {
    throw new Error('Method not implemented.');
  }

  async saveDirection(){
    this.isLoading = true
      this.dooleService.postAPIsendDirection(this.form.value).subscribe(
        async (res: any)=>{
      console.log('[MedicationPage] saveDirection()', await res);        
          if(res.result){
            this.modalCtrl.dismiss({error:null, action: 'add'});
          }
     },(err) => { 
        console.log('[MedicationPage] saveDirection() ERROR(' + err.code + '): ' + err.message); 
        throw err; 
    }) ,() => {
      this.isLoading = false
    };     
    }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
