import { Component, OnInit } from '@angular/core';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { PermissionService } from 'src/app/services/permission.service';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  private form_id = history.state?.form_id;
  public items = [];
  pushNotification: any = history.state.data;
  public lifeStyle: LifeStyle
  isLoading = false
  canPlayGames: boolean = false

  constructor(
    private dooleService: DooleService,
    public role: RolesService,
    public permissionService: PermissionService,
    private auth: AuthenticationService,
    private iab: InAppBrowser,
    private router: Router,
  ) {
    this.lifeStyle = new LifeStyle(NotificationsType.GAMES, "games-detail")
  }

  ngOnInit(): void {

  }


  ionViewWillEnter() {
    if (this.permissionService.canViewGames) this.getGamesList()
    this.canPlayGames = (this.auth?.user?.familyUnit == undefined || this.auth?.user?.familyUnit == null) && this.permissionService.canViewGames;
  }

  getImageSource(content: any) {
    if (content?.image) {
      if (content?.image?.temporaryUrl) {
        return content.image.temporaryUrl;
      }
      else {
        return '/assets/images/shared-care-plan/image-not-found.png';
      }
    }
    else {
      return '/assets/images/shared-care-plan/image-not-found.png';
    }
  }



  async getGamesList() {
    console.log('[AdvicePage] getGamesList()');
    this.items = []
    let game = [];
    this.isLoading = true,
      this.dooleService.getAPIgames().subscribe(
        async (res: any) => {
          if (res.games) {

            res.games.forEach(element => {
              this.getGameData(element)
            });

            console.log(this.items)
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
          }
        }
        , (err) => {
          alert('ERROR(' + err.code + '): ' + err.message)
          //this.isLoading = false
          throw err;
        });
  }

  async getGameData(element) {

    this.dooleService.getAPIgameId(element.id).subscribe(
      async (res: any) => {
        if (res.success) {
          //games.push(res.game)
          console.log(res.game);
          this.adapterForView(element, res.game)
        }
        console.log('[GamesDetailPage] getGameData()', this.items);
      }, (err) => {
        //this.isLoading = false
        console.log('[GamesDetailPage] getGameData() ERROR(' + err.code + '): ' + err.message);
        throw err;
      }), () => {
        // Called when operation is complete (both success and error)
      };
    ;

  }


  adapterForView(element, list) {
   

      let image = "";
      let isAnswers = false;
      const temporaryUrl = list.media;

      if (temporaryUrl?.hasOwnProperty("temporaryUrl")) {
        image = temporaryUrl.temporaryUrl
      }
      let data = {
        img: list?.cover ? list?.cover : '/assets/images/shared-care-plan/image-not-found.png',
        title: list.title,
        type: list.type,
        url: list?.url,
        id: list.id,
        form_id: list?.form_id ? list?.form_id: list.id,
        routerlink: "games-detail",
        score: list.score,
        model: "",
        model_id: list.id
      }

      element.data = data
      this.items.push(element)
  }


  async openGames(item) {
    console.log("entering")
    var browser: any;
    console.log(item)
    if (item.type == "html5") {
      const iosoption: InAppBrowserOptions = {
        zoom: 'no',
        location: 'yes',
        toolbar: 'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes'
      }

      await this.auth.getUserLocalstorage().then(value => {
        this.auth.user = value
      })

      if (item.url?.startsWith("http")) {
        item.url = item.url + "?user=" + this.auth.user.idUser + "&game=" + item.id;
        browser = this.iab.create(item.url, '_blank', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes,footer=yes,zoom=no");
      }
      else
        browser = this.iab.create(item.url, '_system', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes,footer=yes,zoom=no");
    }

    if (item.type == "form") {
      item['form_id'] = item?.form_id;
      this.router.navigate(['/tracking/form', { id: item.form_id }]);
    }
  }
}
