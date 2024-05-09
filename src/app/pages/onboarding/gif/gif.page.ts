import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.page.html',
  styleUrls: ['./gif.page.scss'],
})
export class GifPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/intro']); 
    }, 3000);
  }

 
  }
