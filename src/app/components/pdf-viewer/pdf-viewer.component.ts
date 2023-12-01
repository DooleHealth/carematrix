
import { Component, Input, OnInit } from '@angular/core';
// import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { HTTP } from '@ionic-native/http/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
import { ModalController, Platform } from '@ionic/angular';
// export const FILE_KEY = 'files';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input() pdfSrc: any;
  //pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  //temporaryUrl = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // target;
  // title='';
  // private downloadedFile;

  constructor(
    private modalCtrl: ModalController,
    // private http: HTTP,
    // private pdf: File,
    // private fileOpener: FileOpener,
    // private document: DocumentViewer,
    private platform: Platform
  ) { }

  ngOnInit() {
    console.log('PdfViewerComponent ngOnInit: ', this.pdfSrc);
    if(this.platform.is('ios')){
    }else{
    }
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }


  // downloadFile(url) {
  //   this.http.sendRequest(url, { method: "get", responseType: "arraybuffer" }).then(
  //     httpResponse => {
  //       console.log("File dowloaded successfully")
  //       this.downloadedFile = new Blob([httpResponse.data], { type: 'application/pdf' });

  //       this.writeFile()
  //     }
  //   ).catch(err => {
  //     console.error(err);
  //   })
  // }

  // async writeFile() {
  //   if (this.downloadedFile == null) return;
  //   var filename = 'myDownloadedPdfFile3.pdf';
  //   await this.createFile(filename);
  //   await this.writeToFile(filename);
  // }

  // async createFile(filename) {
  //   return this.pdf.createFile(this.pdf.externalRootDirectory, filename, false).catch(err => {
  //     console.error(err);
  //   })
  // }

  // writeToFile(filename) {
  //   return this.pdf.writeFile(this.pdf.externalRootDirectory, filename, this.downloadedFile, { replace: true, append: false }).then(createdFile => {
  //     console.log('File written successfully.');
  //     console.log(createdFile)
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }

  // deleteToFile(filename) {
  //   return this.pdf.removeDir(this.pdf.externalRootDirectory, filename).then( deletedFile =>{
  //     console.log('File deleted successfully.');
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }
}


