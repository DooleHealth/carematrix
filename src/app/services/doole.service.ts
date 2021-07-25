import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ApiEndpointsService } from './api-endpoints.service';
import { Events } from './events.service';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Capacitor } from '@capacitor/core';
import { delay, filter, map } from 'rxjs/operators';
import { HealthCard } from '../models/user';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { QueryStringParameters } from '../shared/classes/query-string-parameters';
import { ShellChatModel, ShellMessageModel, ShellRecipientModel } from '../pages/contact/chat/chat.page';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DooleService {

  constructor(
    private authService: AuthenticationService,
    private transfer: FileTransfer,
    private file: File,
    private http: HttpService,
    private api: ApiEndpointsService,
    public events: Events,
    private platform: Platform,
    public router: Router,
    public alertController: AlertController) { }
  public selectedDate: Date;

  uploadFile(image: string, id?: string) {

    console.log("uploading ", image);
    const token = localStorage.getItem('token');
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',

      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
      },
      params: {
        id: id
      }
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    // Add files for new or saved diagnostics. 
    // uses diagnostic/media when diagnostic is new 
    //const endpoint = id ? this.api.getEndpoint('diagnostic/media'):this.api.getDooleEndpoint('media/upload/temp') ;
    const endpoint = this.api.getEndpoint('media/upload/temp');
    console.log("* uploadFile endpoint", endpoint);

    return new Promise(function (resolve, reject) {
      fileTransfer.upload(image, endpoint, options).then(data => {
        console.log(data);
        resolve(JSON.parse(data.response));
      }, (err) => {
        console.log(err);
        reject(err);
      })
    })

  }

  uploadMessageImage(idMessageHeader, idUserTo, message, fileUrl, id_usuari_amiq) {

    const token = localStorage.getItem('token');

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.pdf', //TODO: 'name.jpg'
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
      },
      params: {
        idUser: id_usuari_amiq,
        secret: token,
        value: "",
        id: idMessageHeader
      }
    }
    console.log("options: ", options);

    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.onProgress((progressEvent) => {
      if (progressEvent.lengthComputable) {
        var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
        this.events.publish("uploadMessageImage", { fileUrl, perc });
      } else {
        console.log("progressEvent - ", progressEvent);
      }
    });

    const endpoint = this.api.getDooleEndpoint('message');

    return new Promise(function (resolve, reject) {
      fileTransfer.upload(fileUrl, endpoint, options)
        .then(data => {
          console.log("success fileTransfer.upload", JSON.parse(data.response));
          resolve(JSON.parse(data.response));
        }, (err) => {
          console.log("** error ** fileTransfer.upload: ", err);
          reject(fileTransfer.upload);
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

  downloadFile(url, destination): Observable<any> {
    var result: any = [];
    const fileTransfer: FileTransferObject = this.transfer.create();
    var path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }

    console.log("downloadFile", url, destination, 'path,destination', path, destination);
    return new Observable((observer) => {
      console.log("before CheckFile", this.file);
      this.file.checkFile(path, destination).then(res => {
        console.log("*res*", res);
        if (res) {
          console.log("exists", res);
          result["success"] = true;
          result["downloaded"] = true;
          result["file"] = path + destination;//normalizeURL(this.file.cacheDirectory + destination);
          result["fileNormalized"] = Capacitor.convertFileSrc(path + destination);
          return observer.next(result);
        }
      }, error => {
        console.log("not exists");
        fileTransfer.onProgress(event => {                                //descarreguem
          if (event.lengthComputable) {
            //console.log(event.loaded / event.total);
            result["status"] = "downloading";
            result["downloaded"] = false;
            result["percent"] = Math.round((event.loaded / event.total) * 100);
            return observer.next(result);
          }
        });

        return fileTransfer.download(url, path + destination).then((entry) => {
          console.log('*download:* ' + url + " " + entry.toURL());
          result["success"] = true;
          result["downloaded"] = true;
          result["file"] = entry.toURL();//normalizeURL(this.file.cacheDirectory + destination);
          result["fileNormalized"] = Capacitor.convertFileSrc(path + destination);
          return observer.next(result);
        }, (error) => {
          console.log(error);
          result["success"] = false;
          result["downloaded"] = false;
          console.log("error download " + url);
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
    let dismiss = (isDismiss !== undefined) ? isDismiss : false
    const alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss: dismiss,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            console.log('Confirm OK: blah');
            if (route !== undefined && route !== null)
              this.router.navigateByUrl(route);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert(message, button?: string) {
    let buttonName = (button !== undefined) ? button : 'Ok'
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: message,
      buttons: [buttonName]
    });
    await alert.present();
  }

  getFamilyUnitID(): HttpParams {
    let httpParams = new HttpParams();
    let user = this.authService.user
    return httpParams = (user.familyUnit) ? httpParams.append('user', user.familyUnit) : httpParams
  }

  getAPILegalInformation(): Observable<any> {
    let path = 'user/legalTerm/lastAccepted';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPILegalInformation(${path}) res: `, res);
        return res;
      })
    )
  }
  postAPILegalConfirmation(params: Object): Observable<any> {
    let path = 'user/legalTerm/lastAccepted';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIConfirmationLegal(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIpasswordRecovery(params: Object): Observable<any> {
    let path = 'patient/forgot'
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIpasswordRecovery(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIStaffSlots(params: { id: number, date: string }) {

    let path = `staff/${params.id}/availability`;
    let endpoint: string;
    if (params.date !== "") {
      endpoint = this.api.getEndpointWithParameters(path, (qs: QueryStringParameters) => qs.push('date', params.date));
    } else {
      endpoint = this.api.getEndpoint(path);
    }

    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIStaffSlots(${path}) res: `, res);
        return res;
      })
    )
  }

  getAPIgoals(): Observable<any> {
    let path = 'user/element/goals'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  getAPIvideocall(id:string): Observable<any>{
    let path = 'user/agenda/'+id+'/videocallSession'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIvideocall(${path}) res: `, res);
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

  getAPIuserProfile(): Observable<any> {
    let path = 'user/profile'
    //let httpParams = this.getFamilyUnitID()
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  postAPIChangePassword(params: Object): Observable<any> {
    let path = 'user/changePassword';
    let httpParams = this.getFamilyUnitID()
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIChangePassword(${path}) res: `, res);
        return res;

      })
    );
  }

  getAPInotificationConfigurations(): Observable<any> {
    let path = 'user/configuration'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPInotificationConfigurations(${path}) res: `, res);
        return res;
      })
    )
  }

  postAPIConfiguration(params: Object): Observable<any> {
    let path = 'user/configuration';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIConfiguration(${path}) res: `, res);
        return res;

      })
    );
  }

  getAPIFaqs(): Observable<any> {
    let path = 'center/faq'
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  getAPIFamilyUnit(): Observable<any> {
    let path = 'user/familyUnit';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIFamilyUnit(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIReportProblem(params: Object): Observable<any> {
    let path = 'user/reportProblem'; // 'media/upload/temp' 
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIReportProblem(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIemailVerification(params: Object): Observable<any> {
    let path = 'user/email_verification';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIemailVerification(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIcodeVerification(params: Object): Observable<any> {
    let path = 'user/code_verification';
    //let path = 'user/codeVerification'; 
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIcodeVerification(${path}) res: `, res);
        return res;

      })
    );
  }


  getAPIhealthCardTypes(): Observable<any> {
    let path = 'center/healthCardTypes';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhealthCardTypes(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIhealthCards(): Observable<any> {
    let path = 'user/healthcards';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPhealthCards(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIhealthCardId(id): Observable<any> {
    let path = `user/healthcard/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhealthCard(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIhealthCards(params: Object): Observable<any> {
    let path = 'user/healthcard';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIReportProblem(${path}) res: `, res);
        return res;

      })
    );
  }

  putAPIhealthCard(params: HealthCard): Observable<any> {
    let path = `user/healthcard/${params.id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.put(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] putAPIhealthCard(${path}) res: `, res);
        return res;

      })
    );
  }

  deleteAPIhealthCard(params: HealthCard): Observable<any> {
    let path = `user/healthcard/${params.id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.delete(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPIhealthCard(${path}) res: ${res}`, JSON.stringify(res));
        return res;

      })
    );
  }

  getAPISocialRelationType(): Observable<any> {
    let path = 'center/socialRelationType';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPISocialRelationType(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIemergencyContact(): Observable<any> {
    let path = 'user/EmergencyContacts';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIemergencyContact(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIemergencyContactID(id: any): Observable<any> {
    let path = `user/EmergencyContact/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIemergencyContact(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIemergencyContact(params: Object): Observable<any> {
    let path = 'user/EmergencyContact';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIemergencyContact(${path}) res: `, res);
        return res;

      })
    );
  }

  putAPIemergencyContact(id: any, params: Object): Observable<any> {
    let path = `user/EmergencyContact/${id}`;
    console.log('[DooleService] putAPIemergencyContact()', params);
    const endpoint = this.api.getEndpoint(path);
    return this.http.put(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] putAPIemergencyContact(${path}) res: `, res);
        return res;

      })
    );
  }

  deleteAPIemergencyContact(id: any): Observable<any> {
    let path = `user/EmergencyContact/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.delete(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPIemergencyContact(${path}) res: ${res}`, JSON.stringify(res));
        return res;

      })
    );
  }


  getAPIaboutUs(): Observable<any> {
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
    let path = 'user/agenda';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIappointmentAgenda(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIappointmentAgenda(params: Object): Observable<any> {
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
  getAPIdiagnosticTests(): Observable<any> {
    let path = 'user/diagnosticTests';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdiagnosticTests(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIdiagnosticTestTypesAvailable(): Observable<any> {
    let path = 'diagnosticTestTypes/available';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdiagnosticTestTypesAvailable(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIdiagnosticTestID(id: Object): Observable<any> {
    let path = 'user/diagnosticTest/' + id;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdiagnosticTestID(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIdiagnosticTest(params: Object): Observable<any> {
    let path = 'user/diagnosticTests/';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIdiagnosticTest(${path}) res: `, res);
        return res;

      })
    );
  }

  getAPIfilteredDiagnosticTest(params: any): Observable<any> {
    let path = 'user/diagnosticTests';
    const endpoint = this.api.getEndpoint(path);
    let httpParams = new HttpParams();
    // Begin assigning parameters
    if (params !== undefined) {
      httpParams = (params.start_date) ? httpParams.append('from_date', params.start_date) : httpParams
      httpParams = (params.end_date) ? httpParams.append('to_date', params.end_date) : httpParams
      if (params.diagnosticTestTypes) {
        params.diagnosticTestTypes.forEach(element => {
          httpParams = httpParams.append('diagnostic_test_type_id[]', element)
        });
      }
    }
    return this.http.get(endpoint, httpParams).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIfilteredDiagnosticTest(${path}) res: `, res);
        return res;

      })
    );
  }
  //forms-Tracking
  getAPIformLists(): Observable<any> {
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

  getAPIelementsList(): Observable<any> {
    let path = 'user/elementsList/v2'  /* 'user/elementsList'  */
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIelementsList(${path}) res: `, res);
        return res;
      })
    );
  }
  /** get elements with query by parameter date  */
  getAPIelementsListByDate(params: Object): Observable<any> {
    let path = 'user/elementsList/v2'  /* 'user/elementsList'  */
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIelementsListByDate(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIaddElement(id, params: Object): Observable<any> {
    let path = 'user/element/' + id + '/value/add'
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIaddElement(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIgraphicsElement(id: Object, query): Observable<any> {
    let path = 'user/element/' + id;
    let httpParams = new HttpParams();
    httpParams = (query) ? httpParams.append('interval', query) : httpParams
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint,httpParams).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIgraphicsElement(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIelementID(id: Object): Observable<any> {
    let path = `user/element/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIgraphicsElement(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIcategory(): Observable<any> {
    let path = 'user/element_category';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIcategory(${path}) res: `, res);
        return res;
      })
    );
  }
  /** get diets with query by parameter date  */
  getAPIlistDietsByDate(params: Object): Observable<any> {
    let path = 'user/diets';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIlistDietsByDate(${path}) res: `, res);
        return res;
      })
    );
  }
  /** get advices  **/
  getAPIlistAdvices(): Observable<any> {
    let path = 'user/advices';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIlistAdvices(${path}) res: `, res);
        return res;
      })
    );
  }


  getAPIdetailDiets(id: any): Observable<any> {
    let path = `diet/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdetailDiets(${path}) res: `, res);
        return res;
      })
    );
  }
  getAPIdetailAdvices(id: any): Observable<any> {
    let path = `advice/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdetailAdvices(${path}) res: `, res);
        return res;
      })
    );
  }
  
  getAPIdrugsList(query: any): Observable<any> {
    let path = `drugIntake/list`;
    let httpParams = new HttpParams();
    httpParams = (query) ? httpParams.append('search', query) : httpParams
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint, httpParams).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdrugsList(${path}) res: `, res);
        return res;
      })
    );
  }


  getAPIdrugIntakeByDate(params: Object): Observable<any> {
    let path = 'user/drugIntake/date';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIdrugIntakeByDate(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIdrugIntake(params: Object): Observable<any> {
    let path = 'user/drugIntake';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIdrugIntake(${path}) res: `, res);
        return res;

      })
    );
  }

  postAPIchangeStatedrugIntake(id: Object, state: Object): Observable<any> {
    let path = `user/drugIntake/${id}/set/${state}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIdrugIntake(${path}) res: `, res);
        return res;

      })
    );
  }

  putAPIdrugIntake(id: any, params: Object): Observable<any> {
    let path = `user/drugIntake/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.put(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] putAPIdrugIntake(${path}) res: `, res);
        return res;

      })
    );
  }

  deleteAPImedicationPlan(id: Object): Observable<any> {
    let path = `user/medicationPlan/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.delete(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPImedicationPlan(${path}) res: ${res}`, JSON.stringify(res));
        return res;
      })
    );
  }

  getAPImedicationPlan(id): Observable<any> {
    let path = `user/medicationPlan/${id}`
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPImedicationPlan(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIgames(): Observable<any> {
    let path = 'user/games';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIgames(${path}) res: `, res);
        return res;
      })
    );
  }
  /** get games with query by parameter date  */
  getAPIgamesByDate(from_date: any, to_date: any): Observable<any> {
    let path = 'user/gamePlays/scheduled';
    let httpParams = new HttpParams();
    httpParams = (from_date) ? httpParams.append('from_date', from_date) : httpParams
    httpParams = (to_date) ? httpParams.append('to_date', to_date) : httpParams
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint, httpParams).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIgames(${path}) res: `, res);
        return res;
      })
    );
  }
  getAPIgameId(id): Observable<any> {
    let path = `user/game/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIgameId(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIagenda(): Observable<any> {
    let path = 'user/agenda';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIagenda(${path}) res: `, res);
        return res;
      })
    );
  }
  getAPIagendaID(id): Observable<any> {
    let path = `user/agenda/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIaddAgenda(params: Object): Observable<any> {
    let path = 'user/agenda/'
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIaddAgenda(${path}) res: `, res);
        return res;
      })
    );
  }

  deleteAPIaddAgenda(id: Object): Observable<any> {
    let params = { agenda: id }
    let path = 'user/agenda/delete'
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPIaddAgenda(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIallowedContacts(): Observable<any> {
    let path = `user/allowedContacts`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIallowedContacts(${path}) res: `, res);
        return res.allowed;
      })
    );
  }

  getAPIstaffId(id): Observable<any> {
    let path = `user/staff/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIstaffId(${path}) res: `, res);
        return res;
      })
    );
  }

  /** get games with query by parameter date  */
  getAPIUserMessages(): Observable<ShellChatModel[]> {

    let path = 'message/user';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {

        console.log(`[DooleService] getAPIUserMessages(${path}) res: `, res);
        return res.messages as ShellChatModel[];
      })
    );
  }
  // get the company details, a subset of the user data
  getUserSubsetData(): Observable<ShellChatModel> {
    let path = 'message/user';
    const endpoint = this.api.getEndpoint(path);

    const dataObservable = this.http.get(endpoint);

    return dataObservable.pipe(
      map((jsonResponse) => {
        const filteredData: ShellChatModel = {
          ...jsonResponse.messages
        };
        return filteredData;
      })
    );
  }
/** Reminders */
  getAPIreminders(): Observable<any> {
    let path = 'user/reminder';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIreminders(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIreminderID(id): Observable<any> {
    let path = `user/reminder/id`; //${id}
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIreminderID(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIaddReminder(params: Object): Observable<any> {
    let path = 'user/reminder/'
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIaddReminder(${path}) res: `, res);
        return res;
      })
    );
  }

  deleteAPIReminder(params: HealthCard): Observable<any> {
    let path = `user/healthcard/${params.id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.delete(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPIhealthCard(${path}) res: ${res}`, JSON.stringify(res));
        return res;

      })
    );
  }

  get(endpt): Observable<any> {
    const endpoint = this.api.getDooleEndpoint(endpt);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  post(endpt, items): Observable<any> {
    const endpoint = this.api.getDooleEndpoint(endpt);
    return this.http.post(endpoint, items).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
