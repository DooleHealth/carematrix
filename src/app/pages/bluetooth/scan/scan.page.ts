import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  items = history.state?.data;
  device = history.state?.device;
  constructor() { }

  ngOnInit() {
  }

}
