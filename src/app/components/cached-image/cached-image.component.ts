import { Component, Input, NgZone, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesystemDirectory, Plugins } from '@capacitor/core';
const { Filesystem } = Plugins;

@Component({
  selector: 'cached-image',
  templateUrl: './cached-image.component.html',
  styleUrls: ['./cached-image.component.scss'],
})
export class CachedImageComponent {

  _src='';
  @Input()spinner = false;
  constructor(private domSanitizer: DomSanitizer) { }

  @Input()filename = '';
  @Input()
  set src(imageUrl:string){ 
    const imageName = this.filename.split('/').pop();
    const fileType = imageName.split('.').pop();
   
    Filesystem.readFile({
      directory: FilesystemDirectory.Cache,
      path: `${imageName}`
    }).then(readFile=>{
      console.log('Cached image exists... ');
      console.log('_src ... ', this._src);
      this._src =  this.domSanitizer.sanitize(SecurityContext.URL, this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileType};base64,${readFile.data}`));
   
        
    }).catch(async e => {
      await this.storeImage(imageUrl, imageName);
      Filesystem.readFile({
        directory:FilesystemDirectory.Cache,
        path:`${imageName}`

      }).then( readFile => {
        this._src = this.domSanitizer.sanitize(SecurityContext.URL, this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileType};base64,${readFile.data}`));
        console.log('(Read Image OK): ');

      }).catch(async e => {
        console.log('STORE FILE ERROR');
       })

    })
  }

  async storeImage(url, path){

    console.log('Saving Image....');
    const response = await fetch(url)
    console.log('fetch image....');
    // convert to blob 
    const blob = await response.blob();
    console.log('blob....');

    // convert to base64 
    const base64data = await this.convertBlobToBase64(blob) as string;
    console.log('base64data....');
    const savedFile = await Filesystem.writeFile({
      path: `${path}`,
      data: base64data,
      directory: FilesystemDirectory.Cache
    });

    return savedFile;
  }

  private getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}

  convertBlobToBase64(blob: Blob){
  
    return new Promise((resolve, reject)=>{
      const reader = this.getFileReader();
      console.log('convertBlobToBase64....');
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.readAsDataURL(blob);
    })
  }
}
