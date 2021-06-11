import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';
import { TestTypePage } from './test-type/test-type.page';

@Component({
  selector: 'app-documents-add',
  templateUrl: './documents-add.page.html',
  styleUrls: ['./documents-add.page.scss'],
})
export class DocumentsAddPage implements OnInit {
  form: FormGroup;
  typeTest
  private images: any = [];
  private mimes: any = [];
  mediaTemp: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    public modalController: ModalController
   // public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required]],
      images: [this.images]
    });
  }

  // Save new diagnostic test
  async submit() {

    console.log("submit");
    const loading = await this.loadingController.create();
    await loading.present();

/*     let date = this.form.get('date').value;
    var current = new Date(date.split('T')[0]);
    let data_prestacio = this.datepipe.transform(current, 'dd/MM/YYYY');
    this.form.get('date').setValue(data_prestacio); */

    this.mediaTemp.forEach(item => {
      this.images.push(item.file);
      this.mimes.push(item.mime);
    });

    this.dooleService.postAPIdiagnosticTest(this.form.value).subscribe(
      async (data) => {
        console.log("data:", data);
        this.router.navigate(['/app/home/wellbeing/diagnostictests/add/success']);
        
      
      },
      (error) => {
        // Called when error
        loading.dismiss();
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: TestTypePage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.typeTest = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

}
