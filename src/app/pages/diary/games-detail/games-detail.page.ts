import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.page.html',
  styleUrls: ['./games-detail.page.scss'],
})
export class GamesDetailPage implements OnInit {
  private data: any = history.state?.data;
  game:any ={}
  id:any
  score = 0
  isLoading = false
  constructor(
    private router: Router,
    private iab: InAppBrowser,
    private auth: AuthenticationService,
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id)
    this.getGameData()
  }

  async getGameData(){
    this.isLoading = true
    this.dooleService.getAPIgameId(this.id).subscribe(
      async (res: any) =>{
        console.log('[GamesDetailPage] getGameData()', await res);
        if (res.success) {
          this.game = res.game
          this.score = res.game.score
        }
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[GamesDetailPage] getGameData() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      };
  }


  async openGames(item){
    var browser : any;
    if(item.type=="html5"){
      const iosoption: InAppBrowserOptions = {
        zoom: 'no',
        location:'yes',
        toolbar:'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes'
      }

      await this.auth.getUserLocalstorage().then(value =>{
        this.auth.user = value
      })
      
      if(item.url.startsWith("http")){
        item.url=item.url+"?user="+this.auth.user.idUser+"&game="+item.id;
        browser = this.iab.create(item.url, '_blank', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");
      }
      else
        browser = this.iab.create(item.url, '_system', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");
    }

    if(item.type=="form") {
      const options: InAppBrowserOptions = {
        location: 'no',
        toolbar: 'yes'
      };

      var pageContent = '<html><head></head><body><form id="loginForm" action="https://covid.doole.io/formAnswer/fill/'+item.form_id+'" method="post" enctype="multipart/form-data">' +
        '<input type="hidden" name="idForm" value="'+item.form_id+'">' +
        '<input type="hidden" name="user_id" value="'+this.auth.user.idUser+'">' +
        '<input type="hidden" name="secret" value="'+this.auth.user.secret+'">' +
        '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
      var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
      var browserRef = this.iab.create(
        pageContentUrl,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    }

  }

  backButton(){
    if(this.data)
    this.router.navigate([`/home`]);
  }

}
