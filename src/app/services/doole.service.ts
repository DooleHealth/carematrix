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


@Injectable({
  providedIn: 'root'
})
export class DooleService {
 
  constructor(private transfer: FileTransfer, private file : File, private http: HttpService,  
    private api: ApiEndpointsService, public events: Events, private platform: Platform, public alertController: AlertController) { }


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
      buttons: ['OK']
    });

  }

  getAPILegalInformation(): Observable<any>{
    let path = '/user/legal';
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPILegalInformation(${path}) res: `, res);
        return res;
      })
    )
  }
  postAPILegalConfirmation(params: Object): Observable<any>{
    let path = '/user/legal';
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIConfirmationLegal(${path}) res: `, res);
        return res;

      })
    );
  }

  getAPIhomeInitial(path:string): Observable<any>{
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhomeInitial(${path}) res: `, res);
        return res;
      })
    )
  }

  getAPIhome(path:string) : Observable<any>{
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIhome(${path}) res: `, res);
        return res;
      })
    );
  }

  postAPIhomeInitial(path:string, params: Object): Observable<any>{
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIhomeInitial(${path}) res: `, res);
        return res;

      })
    );
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

  getAPIFamilyUnit(){
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
