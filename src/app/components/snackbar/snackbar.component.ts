import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']

})
export class SnackbarComponent implements OnInit{
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    public authtentication : AuthenticationService,
    public languageService : LanguageService,
    public router: Router,
    public active: ActivatedRoute,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
   
  }

  async logout(){
     this.authtentication.logout();
     this.snackBarRef.dismiss();
     this.redirectTo('/login');   
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  close(){
    this.snackBarRef.dismiss();
  }

  onActivate($event){
    console.log("onActivate: ", $event);
  }

  onDeactivate($event){
    console.log("onDeactivate: ", $event);
  }
}
