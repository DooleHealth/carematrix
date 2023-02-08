import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserProfile } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';
import { CameraSource,CameraResultType, Plugins } from '@capacitor/core';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { DateService } from 'src/app/services/date.service';
const { Camera } = Plugins;
@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  userProfile: UserProfile;
  isLoading = false
  files
  constructor(
    private dooleService: DooleService,
    private router: Router,
    public translate: TranslateService,
    public dateService: DateService,
    private actionSheetCtrl: ActionSheetController,
    private datepipe: DatePipe,
    private alertController: AlertController,
    ) { }

  ngOnInit() {
    this.getPersonalInformation()
  }

  getPersonalInformation(){
    this.isLoading = true
    this.dooleService.getAPIuserProfile().subscribe(
      async (res: any) =>{
        console.log('[PersonalPage] getPersonalInformation()', res);
        this.userProfile = res.user;
        this.isLoading = false
       },(err) => {
          console.log('[PersonalPage] getPersonalInformation() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
  }

  getGender(opt){
    let res = ''
    switch (opt) {
      case 0:
        res = this.translate.instant('personal.male')
        break
      case 1:
        res = this.translate.instant('personal.feminine')
        break
      default:
        res = this.translate.instant('personal.non-binary')
        break
    }
    return res
  }


  async selectSource() {
    const buttons = [
      {
        text: this.translate.instant('documents_add.camera'),
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: this.translate.instant('documents_add.pictures'),
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      },
      {
        text: this.translate.instant('personal.delete_pictures'),
        icon: 'trash',
        handler: () => {
          this.alertDeletePhoto();
        }
      },
      // {
      //   text: this.translate.instant('documents_add.file'),
      //   icon: 'document',
      //   handler: () => {
      //     //this.addFile();
      //   }
      // }
    ];

    // Only allow file selection inside a browser

    // if (!this.platform.is('hybrid')) {
    //   buttons.push({
    //     text: 'Choose a File',
    //     icon: 'attach',
    //     handler: () => {
    //       this.fileInput.nativeElement.click();
    //     }
    //   });
    // }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons
    });
    await actionSheet.present();
  }
  deleteImage() {
    this.dooleService.deleteAPIImageuser().subscribe(
      async (res: any) =>{
        console.log('[PersonalPage] getPersonalInformation()', res);
        this.isLoading = false
       },(err) => {
          console.log('[PersonalPage] getPersonalInformation() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    }).catch((e) => {
      console.log('cancelled');
    });

    if (image) {
      var filename= 'img_'+this.transformDate(Date.now(), 'd-M-y_hmmss')+ '.' + image.format;
      console.log("[PersonalPage] addImage()", JSON.stringify(image));
      let img = `data:image/${image.format};base64,`+image.base64String

      this.files = { name: filename, file: img, type: image.format }
      console.log('[PersonalPage] addImage()', this.files);
      let params = {file: this.files.file}
      const temporary = this.userProfile?.temporaryUrl
      this.isLoading = true
      this.dooleService.updateAPIImageuser(params).subscribe(
        async (data) => {
          console.log("data:", data);
          if(data.success){
            if( data?.user?.temporaryUrl)
            this.userProfile.temporaryUrl = data?.user?.temporaryUrl
          }
          else{
            this.presentAlert(this.translate.instant("report_problem.alert_no_successful_response"));
          }
        },
        (error) => {
          // Called when error
          this.isLoading = false
          console.log("error: ", error);
          throw new HttpErrorResponse(error);
        },
        () => {
          // Called when operation is complete (both success and error)
          this.isLoading = false
        });
    }
  }

  transformDate(date, format) {
    return this.datepipe.transform(date, format);
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: message,
      buttons: [{
        text: this.translate.instant("alert.button_ok"),
        handler: () => {
          console.log('Confirm Okay');
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }

  async alertDeletePhoto() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: this.translate.instant('personal.delete_photo'),
      buttons: [
        {
          text: this.translate.instant("button.cancel"),
          handler: () => {
            console.log('Confirm Okay');
          }
        },
        {
        text: this.translate.instant("alert.button_ok"),
        handler: () => {
          console.log('Confirm Okay');
          this.deleteImage()
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }

}
