import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', 
      Validators.compose([
        Validators.required
      ])),
      password: new FormControl('',
        Validators.compose([
        Validators.required])
      )
    });
   }

  ngOnInit() {
  }

  doDooleAppLogin(){
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.loginForm.value)
    }
  }
 

 
}
