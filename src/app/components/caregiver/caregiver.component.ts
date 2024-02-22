import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.scss'],
})
export class CaregiverComponent  implements OnInit {

  caregiver;
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    console.log(this.authService.user.selectedPatientResponsible)
    this.caregiver = this.authService.getFamilyUnitLocalstorage(this.authService.user.familyUnit)
  }



}
