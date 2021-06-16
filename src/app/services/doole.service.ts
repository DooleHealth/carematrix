import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ApiEndpointsService } from './api-endpoints.service';
import { Events } from './events.service';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Capacitor } from '@capacitor/core';
import { map } from 'rxjs/operators';
import { HealthCard } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DooleService {
 
  constructor(
    private transfer: FileTransfer, 
    private file : File, 
    private http: HttpService,  
    private api: ApiEndpointsService, 
    public events: Events, 
    private platform: Platform,
    public router: Router,
    public alertController: AlertController) { }


  uploadFile(image: string, id?:string){

    console.log("uploading ", image);
    const token = localStorage.getItem('token');
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
  
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept' : 'application/json',
      },
      params: {
        id:id
      }
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    // Add files for new or saved diagnostics. 
    // uses diagnostic/media when diagnostic is new 
    //const endpoint = id ? this.api.getEndpoint('diagnostic/media'):this.api.getDooleEndpoint('media/upload/temp') ;
    const endpoint = this.api.getEndpoint('media/upload/temp') ;
    console.log("* uploadFile endpoint", endpoint);
    
    return new Promise(function(resolve,reject) {
      fileTransfer.upload(image,endpoint,options).then(data =>
      {
          console.log(data);
          resolve(JSON.parse(data.response));
      },(err) => {
          console.log(err);
          reject(err);
      })
    })
    
  }
  

  uploadMessageImage(idMessageHeader, idUserTo, message, fileUrl, id_usuari_amiq){

    const token = localStorage.getItem('token');
  
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.pdf', //TODO: 'name.jpg'
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept' : 'application/json',
      },
      params:{
        idUser : id_usuari_amiq,
        secret: token,
        value : "",
        id : idMessageHeader
      }
    }
    console.log("options: ", options);

    
    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.onProgress((progressEvent) => {
      if (progressEvent.lengthComputable) {
        var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
        this.events.publish("uploadMessageImage",{fileUrl,perc});
      } else {
        console.log("progressEvent - ", progressEvent);
      }
    });

    const endpoint = this.api.getDooleEndpoint('message');
  
    return new Promise(function(resolve,reject) {
      fileTransfer.upload(fileUrl, endpoint, options)
      .then(data => {
        console.log("success fileTransfer.upload", JSON.parse(data.response));
        resolve(JSON.parse(data.response));
      }, (err) => {
       console.log("** error ** fileTransfer.upload: ", err);
        reject( fileTransfer.upload);
      })
    })
    
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  downloadFile(url,destination) : Observable<any>{
    var result : any = [];
    const fileTransfer: FileTransferObject = this.transfer.create();
    var path = null;

    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    }else{
      path = this.file.dataDirectory;
    }
    
    console.log("downloadFile", url,destination,'path,destination', path,destination);
    return new Observable((observer) => {
      this.file.checkFile(path,destination).then(res =>{
        console.log("*res*", res);
        if(res){
          console.log("exists", res);
          result["success"]=true;
          result["downloaded"]=true;
          result["file"]=path + destination;//normalizeURL(this.file.cacheDirectory + destination);
          result["fileNormalized"]=Capacitor.convertFileSrc(path + destination);
          return observer.next(result);
        }
        },error =>{
            //console.log("not exists");
            fileTransfer.onProgress(event => {                                //descarreguem
              if (event.lengthComputable) {
                //console.log(event.loaded / event.total);
                result["status"]="downloading";
                result["downloaded"]=false;
                result["percent"]=Math.round((event.loaded / event.total)*100);
                return observer.next(result);
              }
            });

            return fileTransfer.download(url, path + destination).then((entry) => {
              console.log('*download:* '+url+" "+ entry.toURL());
              result["success"]=true;
              result["downloaded"]=true;
              result["file"]=entry.toURL();//normalizeURL(this.file.cacheDirectory + destination);
              result["fileNormalized"]=Capacitor.convertFileSrc(path + destination);
              return observer.next(result);
            }, (error) => {
              console.log(error);
              result["success"]=false;
              result["downloaded"]=false;
              console.log("error download "+url);
              console.log(result);
              return observer.next(result);
            })
        });
    });
  }

  showAlert(message: string) {

    return this.alertController.create({
      header: 'Info',
      message: message,
      backdropDismiss: false,
      buttons: ['OK']
    });

  }

  async showAlertAndReturn(header: string, message: string, isDismiss?: boolean, route?: string) {
    console.log(`[DooleService] showAlertAndReturn()`);
    let dismiss = (isDismiss !== undefined)? isDismiss: false
    const alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss: dismiss,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            console.log('Confirm OK: blah');
            if(route !== undefined && route !== null )
            this.router.navigateByUrl(route);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert(message, button?:string) {
    let buttonName = (button !== undefined)? button: 'Ok' 
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: message,
      buttons: [buttonName]
    });
    await alert.present();
  }

  getAPILegalInformation(): Observable<any>{
    let path = 'user/legal';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPILegalInformation(${path}) res: `, res);
        return res;
      })
    )
  }
  postAPILegalConfirmation(params: Object): Observable<any>{
    let path = 'user/legal';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIConfirmationLegal(${path}) res: `, res);
        return res;

      })
    );
  }


  postAPIpasswordRecovery(params: Object) : Observable<any>{
    let path = 'user/password_recovery'
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIpasswordRecovery(${path}) res: `, res);
        return res;
      })
    );
  } 

  getAPIgoals(): Observable<any>{
    let path = 'user/element/goals'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  getAPIinformationUser(): Observable<any>{
    let path = 'user/informationUser'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  getAPIuserProfile(): Observable<any>{
    let path = 'user/profiles'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  postAPIChangePassword(params: Object): Observable<any>{
    let path = 'user/changePassword';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIChangePassword(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIConfiguration(params: Object): Observable<any>{
    let path = 'user/configuration';
    let paramsNotification = this.getConfigurationParams(params)
    const endpoint = this.api.getEndpoint(paramsNotification);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIConfiguration(${path}) res: `, res);
        return res;

      })
    );
  }

  getConfigurationParams(params: any){
    switch(params.name){
      case 'authentication':
        return {authenticationNotificaton: params.value}
      case 'faceId':
        return {faceIdNotificaton: params.value}
      case 'communications':
          return {communicationsNotificaton: params.value}
      case 'appointment':
        return {appointmentNotificaton: params.value}
      case 'medication':
        return {drugIntakeNotificationMail: params.value} as Object
      case 'advices':
        return {advicesNotificaton: params.value}
      case 'offers':
        return {offersNotificaton: params.value}
      case 'goals':
        return {goalsNotificaton: params.value}
      case 'form':
        return {formNotificaton: params.value}
      case 'messages':
        return {messagesNotificaton: params.value}
    }
  }

  getAPIFaqs(): Observable<any>{
    let path = 'user/faqs'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  getAPIFamilyUnit(): Observable<any>{
    let path = 'user/familyUnit';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIFamilyUnit(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIReportProblem(params: Object): Observable<any>{
    let path = 'user/reportProblem'; // 'media/upload/temp' 
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIReportProblem(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIsmsVerification(params: Object): Observable<any>{
    let path = 'user/smsVerification'; 
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIReportProblem(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIsmsConfirmation(params: Object): Observable<any>{
    let path = 'user/smsConfirmation'; 
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIReportProblem(${path}) res: `, res);
        return res;

      })
    );
  }

  getAPIhealthCards(): Observable<any>{
    let path = 'user/health_cards';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPhealthCards(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIhealthCards(params: Object): Observable<any>{
    let path = 'user/health_cards';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIReportProblem(${path}) res: `, res);
        return res;

      })
    );
  }

  putAPIhealthCard(params: HealthCard): Observable<any>{
    let path = `user/health_cards/${params.id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.put(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] putAPIhealthCard(${path}) res: `, res);
        return res;

      })
    );
  }

  deleteAPIhealthCard(params: HealthCard): Observable<any>{
    let path = `user/health_cards/${params.id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.delete(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPIhealthCard(${path}) res: ${res}`, JSON.stringify(res) );
        return res;

      })
    );
  }

  getAPIfamilyRelationship(): Observable<any>{
    let path = 'user/relationship';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIemergencyContact(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIemergencyContact(): Observable<any>{
    let path = 'user/emergency_contact';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIemergencyContact(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIemergencyContact(params: Object): Observable<any>{
    let path = 'user/emergency_contact';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIemergencyContact(${path}) res: `, res);
        return res;

      })
    );
  }

  putAPIemergencyContact(params: Object): Observable<any>{
    let id = (params as any).id
   // let path = `user/emergency_contact/${id}`;
    let path = `user/emergency_contact`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] putAPIemergencyContact(${path}) res: `, res);
        return res;

      })
    );
  }

  deleteAPIemergencyContact(params: Object): Observable<any>{
    let path = `user/emergency_contact/${params}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.delete(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPIemergencyContact(${path}) res: ${res}`, JSON.stringify(res) );
        return res;

      })
    );
  }


  getAPIaboutUs(): Observable<any>{
    let path = 'user/about_us';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIaboutUs(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIappointmentAgenda(): Observable<any>{
    let path = 'user/appointment';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIappointmentAgenda(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIappointmentAgenda(params: Object): Observable<any>{
    let path = 'user/appointment';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIemergencyContact(${path}) res: `, res);
        return res;

      })
    );
  }
  //documents-Tracking
  getAPIdiagnosticTests(): Observable<any>{
    let path = 'user/diagnosticTests';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdiagnosticTests(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIdiagnosticTestTypesAvailable(): Observable<any>{
    let path = 'diagnosticTestTypes/available';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdiagnosticTestTypesAvailable(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIdiagnosticTestID(id: Object): Observable<any>{
    let path = 'user/diagnosticTest/'+id;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdiagnosticTestID(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIdiagnosticTest(params: Object): Observable<any>{
    let path = 'user/diagnosticTests/';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIdiagnosticTest(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIfilteredDiagnosticTest(params: Object): Observable<any>{
    let path = 'user/diagnosticTests/';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIdiagnosticTest(${path}) res: `, res);
        return res;

      })
    );
  }
  //forms-Tracking
  getAPIformLists(): Observable<any>{
    let path = 'forms/user';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIformLists(${path}) res: `, res);
        return res;
      })
    );
  }
//graphics-Tracking
  getAPIlistGoals(): Observable<any>{
    let path = 'user/element/goals';   
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIlistGoals(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIelementsList(): Observable<any>{  
    let path =  'user/elementsList/v2'  /* 'user/elementsList'  */
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIelementsList(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIaddElement(id, params: Object): Observable<any>{
    let path = 'user/element/' + id + '/value/add'  
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIaddElement(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIgraphicsElement(id: Object, query): Observable<any>{
    let path = 'user/element/'+id +'?'+query;  
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIgraphicsElement(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIcategory(): Observable<any>{
    let path = 'user/element/category';  
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIcategory(${path}) res: `, res);
        return res;
      })
    );
  }

  get(endpt): Observable<any>{
    const endpoint = this.api.getDooleEndpoint(endpt);
    return this.http.get(endpoint).pipe(
        map((res: any) => {
          return res;
        })
    );
  }

  post(endpt, items): Observable<any>{
    const endpoint = this.api.getDooleEndpoint(endpt);
    return this.http.post(endpoint, items).pipe(
        map((res: any) => {
          return res;
        })
    );
  }

}
